// X4 9.0 Boron ship economic updates.
// Source: public extraction of X4 game files exported 2026-05-08.
import { Ship } from '../model/model';

export const BoronShipUpdates: { [key: string]: Partial<Ship> } = {
  'ship_bor_l_destroyer_01_a': {
    price: { min: 7424456, avg: 8249396, max: 9074336 },
    production: [
      {
        time: 175,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 6444 },
          { ware: 'hullparts', amount: 8387 },
          { ware: 'water', amount: 3891 }
        ]
      }
    ]
  },
  'ship_bor_m_corvette_01_a': {
    price: { min: 1321790, avg: 1468656, max: 1615522 },
    production: [
      {
        time: 35,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 1147 },
          { ware: 'hullparts', amount: 1493 },
          { ware: 'water', amount: 692 }
        ]
      }
    ]
  },
  'ship_bor_m_corvette_02_a': {
    price: { min: 1461811, avg: 1624234, max: 1786657 },
    production: [
      {
        time: 35,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 1268 },
          { ware: 'hullparts', amount: 1651 },
          { ware: 'water', amount: 766 }
        ]
      }
    ]
  },
  'ship_bor_m_gunboat_01_a': {
    price: { min: 1127133, avg: 1252370, max: 1377607 },
    production: [
      {
        time: 35,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 978 },
          { ware: 'hullparts', amount: 1273 },
          { ware: 'water', amount: 590 }
        ]
      }
    ]
  },
  'ship_bor_s_heavyfighter_01_a': {
    price: { min: 320625, avg: 356250, max: 391875 },
    production: [
      {
        time: 15,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 278 },
          { ware: 'hullparts', amount: 362 },
          { ware: 'water', amount: 168 }
        ]
      }
    ]
  },
  'ship_bor_xl_carrier_01_a': {
    price: { min: 22017749, avg: 24464165, max: 26910582 },
    production: [
      {
        time: 780,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 19112 },
          { ware: 'hullparts', amount: 24873 },
          { ware: 'water', amount: 11539 }
        ]
      }
    ]
  },
  'ship_bor_m_miner_solid_01_a': {
    price: { min: 142835, avg: 172090, max: 201346 },
    production: [
      {
        time: 25,
        amount: 1,
        method: 'default',
        name: 'Boron',
        wares: [
          { ware: 'energycells', amount: 73 },
          { ware: 'hullparts', amount: 145 },
          { ware: 'water', amount: 55 }
        ]
      }
    ]
  }
};
