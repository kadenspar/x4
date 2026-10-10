// X4 9.0 supplemental equipment data.
// Source: public extraction of X4 game files exported 2026-05-08.
// This layer fills equipment that is missing from the older generated dataset.
import { Equipment } from '../model/model';
import { EquipmentType } from './equipment-type-data';
import { EquipmentClass } from './equipment-class-data';
import { Size } from './size-data';
import { Races } from './race-data';
import { Factions } from './factions-data';

export const SupplementalEquipments: Equipment[] = [
  {
    id: 'engine_bor_l_travel_01_mk1',
    name: "BOR L All-round Engine Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.large,
    price: { min: 366089, avg: 411336, max: 456583 },
    thrust: { forward: 3000, reverse: 3300 },
    travel: { thrust: 41.8, attack: 95.5, charge: 0, release: 1.25 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 105 },
            { ware: 'energycells', amount: 90 },
            { ware: 'engineparts', amount: 185 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_m_allround_01_mk1',
    name: "BOR M All-round Engine Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.medium,
    price: { min: 11650, avg: 13090, max: 14530 },
    thrust: { forward: 750, reverse: 825 },
    travel: { thrust: 13.3, attack: 55, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 15,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 30 },
            { ware: 'engineparts', amount: 10 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_m_allround_01_mk2',
    name: "BOR M All-round Engine Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.medium,
    price: { min: 55219, avg: 62044, max: 68869 },
    thrust: { forward: 930, reverse: 1023 },
    travel: { thrust: 13.3, attack: 55, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 15,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 10 },
            { ware: 'energycells', amount: 62 },
            { ware: 'engineparts', amount: 35 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_m_allround_01_mk3',
    name: "BOR M All-round Engine Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.medium,
    price: { min: 265845, avg: 298703, max: 331560 },
    thrust: { forward: 1035, reverse: 1138.5 },
    travel: { thrust: 13.3, attack: 55, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 15,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 84 },
            { ware: 'energycells', amount: 80 },
            { ware: 'engineparts', amount: 118 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_s_allround_01_mk1',
    name: "BOR S All-round Engine Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.small,
    price: { min: 7912, avg: 8890, max: 9868 },
    thrust: { forward: 300, reverse: 330 },
    travel: { thrust: 19, attack: 44, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 18 },
            { ware: 'engineparts', amount: 7 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_s_allround_01_mk2',
    name: "BOR S All-round Engine Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.small,
    price: { min: 38480, avg: 43236, max: 47992 },
    thrust: { forward: 372, reverse: 409.2 },
    travel: { thrust: 19, attack: 44, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 4 },
            { ware: 'energycells', amount: 45 },
            { ware: 'engineparts', amount: 30 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_s_allround_01_mk3',
    name: "BOR S All-round Engine Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.small,
    price: { min: 164472, avg: 184800, max: 205129 },
    thrust: { forward: 415, reverse: 455.4 },
    travel: { thrust: 19, attack: 44, charge: 0, release: 1 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 32 },
            { ware: 'energycells', amount: 70 },
            { ware: 'engineparts', amount: 110 }
        ]
      }
    ]
  },
  {
    id: 'engine_bor_xl_travel_01_mk1',
    name: "BOR XL All-round Engine Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.engines,
    equipmentClass: EquipmentClass.engine,
    size: Size.extralarge,
    price: { min: 652752, avg: 725280, max: 797808 },
    thrust: { forward: 7912.5, reverse: 8703.75 },
    travel: { thrust: 37.62, attack: 95.5, charge: 0, release: 1.25 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 30,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'antimatterconverters', amount: 204 },
            { ware: 'energycells', amount: 566 },
            { ware: 'engineparts', amount: 547 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_l_standard_01_mk1',
    name: "BOR L Shield Generator Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.large,
    price: { min: 41484, avg: 46612, max: 51739 },
    recharge: { max: 50400, rate: 300, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 58 },
            { ware: 'fieldcoils', amount: 14 },
            { ware: 'shieldcomponents', amount: 12 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_l_standard_01_mk2',
    name: "BOR L Shield Generator Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.large,
    price: { min: 209116, avg: 232351, max: 255586 },
    recharge: { max: 61690, rate: 365, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 363 },
            { ware: 'fieldcoils', amount: 91 },
            { ware: 'shieldcomponents', amount: 77 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_l_standard_01_mk3',
    name: "BOR L Shield Generator Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.large,
    price: { min: 1294936, avg: 1438818, max: 1438818 },
    recharge: { max: 82656, rate: 594, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 2967 },
            { ware: 'fieldcoils', amount: 749 },
            { ware: 'shieldcomponents', amount: 631 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_01_mk1',
    name: "BOR M Shield Generator Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 18190, avg: 20212, max: 22233 },
    recharge: { max: 5250, rate: 95, delay: 8.8 },
    slotTags: ["advanced","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 25 },
            { ware: 'fieldcoils', amount: 5 },
            { ware: 'shieldcomponents', amount: 5 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_01_mk2',
    name: "BOR M Shield Generator Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 81076, avg: 90084, max: 99092 },
    recharge: { max: 6825, rate: 131, delay: 8.8 },
    slotTags: ["advanced","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 140 },
            { ware: 'fieldcoils', amount: 35 },
            { ware: 'shieldcomponents', amount: 29 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_01_mk3',
    name: "BOR M Shield Generator Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 357737, avg: 397486, max: 437234 },
    recharge: { max: 8400, rate: 178, delay: 8.8 },
    slotTags: ["advanced","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 819 },
            { ware: 'fieldcoils', amount: 206 },
            { ware: 'shieldcomponents', amount: 174 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_02_mk1',
    name: "BOR M Shield Generator Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 18190, avg: 20212, max: 22233 },
    recharge: { max: 5250, rate: 95, delay: 8.8 },
    slotTags: ["advanced","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 25 },
            { ware: 'fieldcoils', amount: 5 },
            { ware: 'shieldcomponents', amount: 5 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_02_mk2',
    name: "BOR M Shield Generator Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 81076, avg: 90084, max: 99092 },
    recharge: { max: 6825, rate: 131, delay: 8.8 },
    slotTags: ["advanced","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 140 },
            { ware: 'fieldcoils', amount: 35 },
            { ware: 'shieldcomponents', amount: 29 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_m_standard_02_mk3',
    name: "BOR M Shield Generator Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.medium,
    price: { min: 357737, avg: 397486, max: 437234 },
    recharge: { max: 8400, rate: 178, delay: 8.8 },
    slotTags: ["advanced","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 819 },
            { ware: 'fieldcoils', amount: 206 },
            { ware: 'shieldcomponents', amount: 174 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_s_standard_01_mk1',
    name: "BOR S Shield Generator Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.small,
    price: { min: 2261, avg: 2512, max: 2763 },
    recharge: { max: 1050, rate: 50, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 8 },
            { ware: 'shieldcomponents', amount: 2 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_s_standard_01_mk2',
    name: "BOR S Shield Generator Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.small,
    price: { min: 15883, avg: 17648, max: 19413 },
    recharge: { max: 1260, rate: 75, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 27 },
            { ware: 'fieldcoils', amount: 6 },
            { ware: 'shieldcomponents', amount: 5 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_s_standard_01_mk3',
    name: "BOR S Shield Generator Mk3",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.small,
    price: { min: 75245, avg: 83606, max: 91967 },
    recharge: { max: 1738, rate: 115, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 172 },
            { ware: 'fieldcoils', amount: 43 },
            { ware: 'shieldcomponents', amount: 36 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_xl_standard_01_mk1',
    name: "BOR XL Shield Generator Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.extralarge,
    price: { min: 355439, avg: 394932, max: 434425 },
    recharge: { max: 135955, rate: 572, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 493 },
            { ware: 'fieldcoils', amount: 124 },
            { ware: 'shieldcomponents', amount: 105 }
        ]
      }
    ]
  },
  {
    id: 'shield_bor_xl_standard_01_mk2',
    name: "BOR XL Shield Generator Mk2",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.shields,
    equipmentClass: EquipmentClass.shieldgenerator,
    size: Size.extralarge,
    price: { min: 2190623, avg: 2434026, max: 2677429 },
    recharge: { max: 160427, rate: 767, delay: 10.5 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 20,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'energycells', amount: 3803 },
            { ware: 'fieldcoils', amount: 960 },
            { ware: 'shieldcomponents', amount: 809 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_l_disruptor_01_mk1',
    name: "BOR L Kinetic Ion Railgun Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.large,
    price: { min: 130022, avg: 144469, max: 158916 },
    slotTags: ["advanced","combat"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 23 },
            { ware: 'energycells', amount: 297 },
            { ware: 'turretcomponents', amount: 69 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_l_flak_01_mk1',
    name: "BOR L Ion Flak Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.large,
    price: { min: 127253, avg: 141392, max: 155531 },
    slotTags: ["advanced","combat"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 23 },
            { ware: 'energycells', amount: 291 },
            { ware: 'turretcomponents', amount: 69 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_l_laser_01_mk1',
    name: "BOR L Phase Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.large,
    price: { min: 80571, avg: 89524, max: 98476 },
    slotTags: ["advanced","combat"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 14 },
            { ware: 'energycells', amount: 184 },
            { ware: 'turretcomponents', amount: 43 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_l_mining_01_mk1',
    name: "BOR L Mining Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.large,
    price: { min: 16484, avg: 18315, max: 20147 },
    slotTags: ["advanced","mining"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 2 },
            { ware: 'energycells', amount: 37 },
            { ware: 'turretcomponents', amount: 8 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_arc_01_mk1',
    name: "BOR M Arc Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 32044, avg: 35604, max: 39165 },
    slotTags: ["advanced","combat","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 5 },
            { ware: 'energycells', amount: 73 },
            { ware: 'turretcomponents', amount: 17 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_arc_02_mk1',
    name: "BOR M Arc Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 32044, avg: 35604, max: 39165 },
    slotTags: ["advanced","combat","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 5 },
            { ware: 'energycells', amount: 73 },
            { ware: 'turretcomponents', amount: 17 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_dumbfire_01_mk1',
    name: "BOR M Dumbfire Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.missileturret,
    size: Size.medium,
    price: { min: 24725, avg: 27473, max: 30220 },
    slotTags: ["advanced","hittable","missile"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 4 },
            { ware: 'energycells', amount: 56 },
            { ware: 'turretcomponents', amount: 13 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_guided_01_mk1',
    name: "BOR M Tracking Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.missileturret,
    size: Size.medium,
    price: { min: 34615, avg: 38462, max: 42308 },
    slotTags: ["advanced","hittable","missile"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 6 },
            { ware: 'energycells', amount: 79 },
            { ware: 'turretcomponents', amount: 18 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_laser_01_mk1',
    name: "BOR M Phase Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 23802, avg: 26447, max: 29092 },
    slotTags: ["advanced","combat","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 4 },
            { ware: 'energycells', amount: 54 },
            { ware: 'turretcomponents', amount: 12 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_laser_02_mk1',
    name: "BOR M Phase Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 23802, avg: 26447, max: 29092 },
    slotTags: ["advanced","combat","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 4 },
            { ware: 'energycells', amount: 54 },
            { ware: 'turretcomponents', amount: 12 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_mining_01_mk1',
    name: "BOR M Mining Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 8242, avg: 9158, max: 10073 },
    slotTags: ["advanced","mining","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 1 },
            { ware: 'energycells', amount: 18 },
            { ware: 'turretcomponents', amount: 4 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_mining_02_mk1',
    name: "BOR M Mining Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 8242, avg: 9158, max: 10073 },
    slotTags: ["advanced","hittable","mining"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 1 },
            { ware: 'energycells', amount: 18 },
            { ware: 'turretcomponents', amount: 4 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_railgun_01_mk1',
    name: "BOR M Ion Pulse Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 48527, avg: 53919, max: 59311 },
    slotTags: ["advanced","combat","unhittable"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 8 },
            { ware: 'energycells', amount: 111 },
            { ware: 'turretcomponents', amount: 26 }
        ]
      }
    ]
  },
  {
    id: 'turret_bor_m_railgun_02_mk1',
    name: "BOR M Ion Pulse Turret Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.turrets,
    equipmentClass: EquipmentClass.turret,
    size: Size.medium,
    price: { min: 48527, avg: 53919, max: 59311 },
    slotTags: ["advanced","combat","hittable"],
    integrated: false,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 8 },
            { ware: 'energycells', amount: 111 },
            { ware: 'turretcomponents', amount: 26 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_l_beam_01_mk1',
    name: "BOR Ray Ion Projector",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.large,
    price: { min: 844022, avg: 937802, max: 1031582 },
    slotTags: ["advanced"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 213 },
            { ware: 'energycells', amount: 1934 },
            { ware: 'weaponcomponents', amount: 217 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_m_flak_01_mk1',
    name: "BOR M Ion Atomiser Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.medium,
    price: { min: 152308, avg: 169231, max: 186154 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 38 },
            { ware: 'energycells', amount: 349 },
            { ware: 'weaponcomponents', amount: 39 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_m_laser_01_mk1',
    name: "BOR M Phase Cannon Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.medium,
    price: { min: 132527, avg: 147253, max: 161978 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 33 },
            { ware: 'energycells', amount: 303 },
            { ware: 'weaponcomponents', amount: 34 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_m_mining_01_mk1',
    name: "BOR M Mining Drill Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.medium,
    price: { min: 12824, avg: 14249, max: 15674 },
    slotTags: ["advanced","mining"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 3 },
            { ware: 'energycells', amount: 29 },
            { ware: 'weaponcomponents', amount: 3 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_m_railgun_01_mk1',
    name: "BOR M Ion Pulse Railgun Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.medium,
    price: { min: 188572, avg: 209524, max: 230476 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 47 },
            { ware: 'energycells', amount: 432 },
            { ware: 'weaponcomponents', amount: 48 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_s_arc_01_mk1',
    name: "BOR S Arc Gun Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.small,
    price: { min: 101538, avg: 112820, max: 124102 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 25 },
            { ware: 'energycells', amount: 232 },
            { ware: 'weaponcomponents', amount: 26 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_s_gatling_01_mk1',
    name: "BOR S Ion Gatling Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.small,
    price: { min: 114725, avg: 127472, max: 140220 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 29 },
            { ware: 'energycells', amount: 262 },
            { ware: 'weaponcomponents', amount: 29 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_s_laser_01_mk1',
    name: "BOR S Phase Gun Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.small,
    price: { min: 88352, avg: 98168, max: 107985 },
    slotTags: ["advanced","combat"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 22 },
            { ware: 'energycells', amount: 202 },
            { ware: 'weaponcomponents', amount: 22 }
        ]
      }
    ]
  },
  {
    id: 'weapon_bor_s_mining_01_mk1',
    name: "BOR S Mining Drill Mk1",
    description: 'No information available',
    race: Races.boron,
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.weapon,
    size: Size.small,
    price: { min: 8549, avg: 9499, max: 10449 },
    slotTags: ["advanced","mining"],
    integrated: true,
    owners: [ Factions.boron ],
    production: [
      {
        time: 10,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
            { ware: 'advancedelectronics', amount: 2 },
            { ware: 'energycells', amount: 19 },
            { ware: 'weaponcomponents', amount: 2 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_m_dumbfire_02_mk1',
    name: "M Dumbfire Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.medium,
    price: { min: 28097, avg: 31219, max: 34341 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedcomposites', amount: 7 },
            { ware: 'energycells', amount: 64 },
            { ware: 'weaponcomponents', amount: 7 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'computronicsubstrate', amount: 1 },
            { ware: 'energycells', amount: 48 },
            { ware: 'metallicmicrolattice', amount: 18 },
            { ware: 'siliconcarbide', amount: 4 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 1 },
            { ware: 'energycells', amount: 154 },
            { ware: 'hullparts', amount: 11 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_m_guided_02_mk1',
    name: "M Tracking Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.medium,
    price: { min: 42483, avg: 47203, max: 51923 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedcomposites', amount: 10 },
            { ware: 'energycells', amount: 97 },
            { ware: 'weaponcomponents', amount: 10 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'computronicsubstrate', amount: 2 },
            { ware: 'energycells', amount: 75 },
            { ware: 'metallicmicrolattice', amount: 15 },
            { ware: 'siliconcarbide', amount: 3 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 2 },
            { ware: 'energycells', amount: 149 },
            { ware: 'hullparts', amount: 16 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_m_torpedo_02_mk1',
    name: "M Torpedo Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.medium,
    price: { min: 60690, avg: 67433, max: 74176 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedelectronics', amount: 15 },
            { ware: 'energycells', amount: 139 },
            { ware: 'weaponcomponents', amount: 15 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'computronicsubstrate', amount: 3 },
            { ware: 'energycells', amount: 105 },
            { ware: 'metallicmicrolattice', amount: 33 },
            { ware: 'siliconcarbide', amount: 4 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 6 },
            { ware: 'energycells', amount: 122 },
            { ware: 'hullparts', amount: 36 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_s_dumbfire_02_mk1',
    name: "S Dumbfire Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.small,
    price: { min: 17982, avg: 19980, max: 21978 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedcomposites', amount: 4 },
            { ware: 'energycells', amount: 41 },
            { ware: 'weaponcomponents', amount: 4 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'energycells', amount: 32 },
            { ware: 'metallicmicrolattice', amount: 20 },
            { ware: 'siliconcarbide', amount: 6 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 1 },
            { ware: 'energycells', amount: 41 },
            { ware: 'hullparts', amount: 6 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_s_guided_02_mk1',
    name: "S Tracking Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.small,
    price: { min: 26853, avg: 29837, max: 32821 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedcomposites', amount: 6 },
            { ware: 'energycells', amount: 61 },
            { ware: 'weaponcomponents', amount: 6 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'computronicsubstrate', amount: 1 },
            { ware: 'energycells', amount: 30 },
            { ware: 'metallicmicrolattice', amount: 10 },
            { ware: 'siliconcarbide', amount: 4 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 1 },
            { ware: 'energycells', amount: 125 },
            { ware: 'hullparts', amount: 9 }
        ]
      }
    ]
  },
  {
    id: 'weapon_gen_s_torpedo_02_mk1',
    name: "S Torpedo Launcher",
    description: 'No information available',
    type: EquipmentType.weapons,
    equipmentClass: EquipmentClass.missilelauncher,
    size: Size.small,
    price: { min: 38362, avg: 42624, max: 46886 },
    slotTags: ["advanced","missile"],
    integrated: true,
    production: [
      {
        time: 5,
        amount: 1,
        method: 'default',
        name: 'Universal',
        wares: [
            { ware: 'advancedcomposites', amount: 9 },
            { ware: 'energycells', amount: 87 },
            { ware: 'weaponcomponents', amount: 9 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'terran',
        name: 'Terran',
        wares: [
            { ware: 'computronicsubstrate', amount: 2 },
            { ware: 'energycells', amount: 66 },
            { ware: 'metallicmicrolattice', amount: 21 },
            { ware: 'siliconcarbide', amount: 2 }
        ]
      },
      {
        time: 5,
        amount: 1,
        method: 'closedloop',
        name: 'Closed Loop',
        wares: [
            { ware: 'claytronics', amount: 2 },
            { ware: 'energycells', amount: 113 },
            { ware: 'hullparts', amount: 14 }
        ]
      }
    ]
  }
];
