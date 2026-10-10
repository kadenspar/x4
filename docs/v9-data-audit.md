# X4 9.0 data audit

The Android app's data is generated from `slepher/x4-station-calculator` at commit
`cb43e7fbbd2b64f173c8f127483f5f767ac11e07`, directory
`9.0-Empire`. Run `python scripts/update-v9-data.py PATH_TO_REFERENCE_REPO`
from this repository to regenerate it. The script checks that exact source commit.

## Coverage

| Kind | Processed 9.0 records | Effective app records | Shared-record differences in mapped stats |
| --- | ---: | ---: | ---: |
| Wares | 63 | 63 | 0 |
| Station modules | 325 | 325 | 0 |
| Ships | 234 | 250 | 0 |
| Equipment | 542 | 617 | 0 |

The 16 extra ships are older NPC ships that remain in the 9.0 macro files but
are absent from the processed ship list. They remain addressable for saved
plans and are hidden from the player ship picker. Their hull, inertia, price,
and build recipes use the raw 9.0 files when available.

The 75 extra equipment records comprise 49 older app entries and 26 current
missile, drone, and consumable entries in separate 9.0 data tables. Their 9.0
prices and available production recipes are imported. Equipment excluded from player
blueprints is hidden from selection, but remains addressable by ID.

Compared fields include names, hulls, drag, mass, crew, storage, slot counts,
prices, production costs and times, thrust, travel, shield recharge, module
workforce and cargo, ware prices and volumes. Production module inputs and
outputs now use each module's 9.0 hourly rates, including multi-product
recyclers and Allographyne.

The reference processed module data does not include the component-level
shield, turret, or dock connection layout. Those legacy fields remain for
existing modules and should be checked against complete 9.0 component files
before treating them as verified. Weapon compatibility uses the processed
connection tags; in-game restrictions beyond those tags need device testing.

Verification: TypeScript compilation and the Android Angular build pass.
An effective-data comparison found zero differences for the mapped fields on
all shared records. A runtime pass found at least one equipment option for
each of 2,831 slot groups on the 234 player ships. The Android APK workflow
runs on pull requests targeting `android`.
