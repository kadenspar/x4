"""Import X4 9.0 data extracted by slepher/x4-station-calculator.

Usage: python scripts/update-v9-data.py PATH_TO_REFERENCE_REPO
The reference is pinned in SOURCE_COMMIT below; review changes before updating it.
"""

import json
import pathlib
import subprocess
import sys
import xml.etree.ElementTree as ET

SOURCE_COMMIT = "cb43e7fbbd2b64f173c8f127483f5f767ac11e07"
SOURCE_VERSION = "9.0-Empire"
KINDS = ("wares", "modules", "ships", "equipments", "missiles", "drones", "consumables")


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/update-v9-data.py PATH_TO_REFERENCE_REPO")

    root = pathlib.Path(sys.argv[1]).resolve()
    actual_commit = subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=root, text=True
    ).strip()
    if actual_commit != SOURCE_COMMIT:
        raise SystemExit(f"Expected reference commit {SOURCE_COMMIT}, got {actual_commit}")
    source = root / "src/assets/x4_game_data" / SOURCE_VERSION / "data"
    raw_wares = root / "x4raw_assets" / SOURCE_VERSION / "libraries/wares/final.xml"
    if not source.is_dir() or not raw_wares.is_file():
        raise SystemExit(f"Missing X4 9.0 source files under {root}")

    output = pathlib.Path(__file__).resolve().parents[1] / "src/app/shared/services/data/v9"
    output.mkdir(parents=True, exist_ok=True)
    for kind in KINDS:
        values = json.loads((source / f"{kind}.json").read_text(encoding="utf-8"))
        (output / f"{kind}.json").write_text(
            json.dumps(values, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
        )
        print(f"{kind}: {len(values)}")

    prices = {}
    recipes = {}
    for ware in ET.parse(raw_wares).getroot().iter("ware"):
        price = ware.find("price")
        ware_id = ware.get("id")
        if ware_id and price is not None:
            prices[ware_id] = {
                "min": int(price.get("min")),
                "avg": int(price.get("average")),
                "max": int(price.get("max")),
            }
        if ware_id:
            recipes[ware_id] = [
                {
                    "time": float(production.get("time", 0)),
                    "amount": float(production.get("amount", 0)),
                    "method": production.get("method", "default"),
                    "wares": [
                        {"ware": item.get("ware"), "amount": float(item.get("amount", 0))}
                        for item in production.findall("primary/ware")
                    ],
                    "effects": [
                        {"type": effect.get("type"), "product": float(effect.get("product", 0))}
                        for effect in production.findall("effects/effect")
                        if effect.get("product") is not None
                    ],
                }
                for production in ware.findall("production")
            ]
    (output / "prices.json").write_text(
        json.dumps(prices, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
    )
    (output / "ware-recipes.json").write_text(
        json.dumps(recipes, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
    )
    macro_stats = {}
    for filename in ("module_macros.xml", "equipment_macros.xml", "ship_macros.xml"):
        path = root / "x4raw_assets" / SOURCE_VERSION / "libraries" / filename
        for macro in ET.parse(path).getroot().iter("macro"):
            macro_id = macro.get("name")
            if not macro_id:
                continue
            hull = macro.find("properties/hull")
            explosion = macro.find("properties/explosiondamage")
            inertia = macro.find("properties/physics/inertia")
            macro_stats[macro_id] = {
                "hull": float(hull.get("max")) if hull is not None and hull.get("max") else None,
                "explosionDamage": float(explosion.get("value")) if explosion is not None and explosion.get("value") else None,
                "inertia": ({key: float(value) for key, value in inertia.attrib.items()}
                            if inertia is not None else None),
            }
    (output / "macro-stats.json").write_text(
        json.dumps(macro_stats, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
    )
    (output / "source.json").write_text(
        json.dumps({"repository": "slepher/x4-station-calculator", "commit": SOURCE_COMMIT,
                    "version": SOURCE_VERSION}, separators=(",", ":")), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
