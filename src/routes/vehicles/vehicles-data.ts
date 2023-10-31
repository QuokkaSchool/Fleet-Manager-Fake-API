import { v4 as uuidv4 } from 'uuid';
import { DriverInterface, DRIVERS_DATA } from '../drivers/drivers-data.js';

export enum VehicleType {
  truck = 'Ciężarówka',
  van = 'Furgonetka',
}

export enum VehicleStatus {
  available = 'Dostępny',
  inUse = 'W użyciu',
  underMaintenance = 'Podczas prac technicznych'
}

export interface VehicleInterface {
  id: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  type: VehicleType;
  status: VehicleStatus;
  driver: DriverInterface | null;
}

export const VEHICLES_DATA: VehicleInterface[] = [
  {
    id: uuidv4(),
    brand: 'Volvo',
    model: 'FH16',
    year: 2022,
    registrationNumber: 'ABC123',
    type: VehicleType.truck,
    status: VehicleStatus.available,
    driver: DRIVERS_DATA[1],
  },
  {
    id: uuidv4(),
    brand: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2021,
    registrationNumber: 'DEF456',
    type: VehicleType.van,
    status: VehicleStatus.inUse,
    driver: DRIVERS_DATA[3],
  },
  {
    id: uuidv4(),
    brand: 'Ford',
    model: 'Transit',
    year: 2020,
    registrationNumber: 'GHI789',
    type: VehicleType.van,
    status: VehicleStatus.available,
    driver: DRIVERS_DATA[0],
  },
  {
    id: uuidv4(),
    brand: 'Scania',
    model: 'R500',
    year: 2023,
    registrationNumber: 'JKL012',
    type: VehicleType.truck,
    status: VehicleStatus.underMaintenance,
    driver: DRIVERS_DATA[2],
  },
  {
    id: uuidv4(),
    brand: 'Iveco',
    model: 'Daily',
    year: 2019,
    registrationNumber: 'MNO345',
    type: VehicleType.van,
    status: VehicleStatus.available,
    driver: null,
  },
  {
    id: uuidv4(),
    brand: 'Dodge',
    model: 'Ram',
    year: 2020,
    registrationNumber: 'PQR678',
    type: VehicleType.truck,
    status: VehicleStatus.available,
    driver: null,
  },
  {
    id: uuidv4(),
    brand: 'Nissan',
    model: 'NV200',
    year: 2021,
    registrationNumber: 'STU901',
    type: VehicleType.van,
    status: VehicleStatus.available,
    driver: DRIVERS_DATA[4],
  },
  {
    id: uuidv4(),
    brand: 'Isuzu',
    model: 'N-Series',
    year: 2018,
    registrationNumber: 'VWX234',
    type: VehicleType.truck,
    status: VehicleStatus.inUse,
    driver: DRIVERS_DATA[6],
  },
  {
    id: uuidv4(),
    brand: 'Chevrolet',
    model: 'Express',
    year: 2019,
    registrationNumber: 'YZA567',
    type: VehicleType.van,
    status: VehicleStatus.available,
    driver: null,
  },
  {
    id: uuidv4(),
    brand: 'Toyota',
    model: 'Hilux',
    year: 2022,
    registrationNumber: 'BCD890',
    type: VehicleType.truck,
    status: VehicleStatus.available,
    driver: DRIVERS_DATA[5],
  },
];
