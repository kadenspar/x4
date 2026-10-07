# X4: Foundations Utilities & Database

Unofficial companion tools and reference data for **X4: Foundations**, with an Android build for planning stations and fleets away from the game.

The current Android branch is updated for **X4 9.00** data and includes the station calculator, fleet builder, and browsable ship/equipment/module/ware database.

## Features

- **Station Calculator**
  - Plan station modules and production chains.
  - Calculate resource inputs/outputs, workforce effects, sunlight-adjusted energy production, storage and build requirements.
  - Save station layouts locally.
  - Import X4 construction-plan XML files.

- **Fleet Builder**
  - Add multiple ships and configure compatible engines, thrusters, shields, weapons and turrets.
  - Add missiles, drones, countermeasures and software.
  - Choose the production method where multiple recipes exist.
  - Estimate configured fleet purchase cost and total build resources.
  - Save fleet plans locally and override equipment slot groups individually.

- **Reference Database**
  - Browse ships, equipment, station modules, wares, factions and races.
  - Ship/equipment compatibility is based on extracted X4 connection tags.

- **Android**
  - The Angular app is packaged with Capacitor.
  - Saved layouts and fleet plans remain in local WebView storage.
  - Google Analytics is disabled in the Android build.
  - GitHub Actions can build a debug APK without requiring Android Studio.

See [ANDROID.md](ANDROID.md) for build/install instructions.

## X4 9.00 data

The Android app's current game data is generated from the **9.0-Empire** extraction in [slepher/x4-station-calculator](https://github.com/slepher/x4-station-calculator), pinned to commit:

`cb43e7fbbd2b64f173c8f127483f5f767ac11e07`

Pinned source:

- [Reference repository at the pinned commit](https://github.com/slepher/x4-station-calculator/tree/cb43e7fbbd2b64f173c8f127483f5f767ac11e07)
- [Processed 9.0-Empire game-data directory](https://github.com/slepher/x4-station-calculator/tree/cb43e7fbbd2b64f173c8f127483f5f767ac11e07/src/assets/x4_game_data/9.0-Empire/data)
- [Extracted 9.0-Empire raw X4 assets used by the importer](https://github.com/slepher/x4-station-calculator/tree/cb43e7fbbd2b64f173c8f127483f5f767ac11e07/x4raw_assets/9.0-Empire)

The import currently covers:

| Data | Processed 9.00 records | Effective app records |
| --- | ---: | ---: |
| Wares | 63 | 63 |
| Station modules | 325 | 325 |
| Ships | 234 | 250 |
| Hardware equipment | 542 | 617 |

The app also imports current missile, drone and consumable records. The effective totals are higher where older/special records are intentionally retained for compatibility with saved plans and legacy NPC data.

Generated data is stored under:

`src/app/shared/services/data/v9/`

The import can be regenerated with:

```bash
python scripts/update-v9-data.py PATH_TO_REFERENCE_REPO
```

The script verifies that the reference checkout is on the pinned commit before importing it.

For field coverage, known limits and verification details, see [docs/v9-data-audit.md](docs/v9-data-audit.md).

## Data verification and known limits

The 9.00 update was checked against the pinned source for mapped ware, module, ship and equipment fields. The Android Angular/Capacitor/Gradle build also passes in GitHub Actions.

A few limits are worth keeping visible:

- Some older NPC ship records are retained even though they are absent from the processed player-ship list.
- The processed module dataset does not include every component-level station shield, turret and dock connection, so some legacy station component layout fields remain unverified.
- Fleet equipment compatibility follows the extracted X4 connection tags. Game behavior should still be treated as the final authority if a special-case restriction is discovered.

## Sources, credits and references

- **X4: Foundations / EGOSOFT**  
  Official game information: https://www.egosoft.com/games/x4/info_en.php  
  Steam: https://store.steampowered.com/app/392160/X4_Foundations/

- **Original utilities/database project**  
  This repository is based on and has evolved from [crissian/x4](https://github.com/crissian/x4).

- **X4 9.00 extracted/reference dataset**  
  [slepher/x4-station-calculator](https://github.com/slepher/x4-station-calculator), pinned to [commit cb43e7f](https://github.com/slepher/x4-station-calculator/commit/cb43e7fbbd2b64f173c8f127483f5f767ac11e07).

- **Current project repository**  
  [kadenspar/x4](https://github.com/kadenspar/x4)

- **Main application stack**  
  [Angular](https://angular.dev/), [Capacitor](https://capacitorjs.com/), [Bootstrap](https://getbootstrap.com/) and [DevExtreme](https://js.devexpress.com/).

## Disclaimer

This is an **unofficial fan-made utility** and is not affiliated with or endorsed by EGOSOFT. X4: Foundations, its names, game data, artwork and related intellectual property belong to their respective owners. Game data in this project is provided for companion/reference functionality and may contain extraction or interpretation errors.
