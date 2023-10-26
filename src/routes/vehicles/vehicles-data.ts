import { v4 as uuidv4 } from 'uuid';

export type VehicleType = "truck" | "van";
export type VehicleStatus = "available" | "inUse" | "underMaintenance";

export interface VehicleInterface {
  id: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  type: VehicleType;
  status: VehicleStatus;
  driverId: string | null;
}

export const VEHICLES_DATA: VehicleInterface[] = [
  {
    id: uuidv4(),
    brand: "Volvo",
    model: "FH16",
    year: 2022,
    registrationNumber: "ABC123",
    type: "truck",
    status: "available",
    driverId: null,
  },
  {
    id: uuidv4(),
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2021,
    registrationNumber: "DEF456",
    type: "van",
    status: "inUse",
    driverId: "1",
  },
  {
    id: uuidv4(),
    brand: "Ford",
    model: "Transit",
    year: 2020,
    registrationNumber: "GHI789",
    type: "van",
    status: "available",
    driverId: null,
  },
  {
    id: uuidv4(),
    brand: "Scania",
    model: "R500",
    year: 2023,
    registrationNumber: "JKL012",
    type: "truck",
    status: "underMaintenance",
    driverId: null,
  },
  {
    id: uuidv4(),
    brand: "Iveco",
    model: "Daily",
    year: 2019,
    registrationNumber: "MNO345",
    type: "van",
    status: "available",
    driverId: "2",
  },
  {
    id: uuidv4(),
    brand: "Dodge",
    model: "Ram",
    year: 2020,
    registrationNumber: "PQR678",
    type: "truck",
    status: "available",
    driverId: null,
  },
  {
    id: uuidv4(),
    brand: "Nissan",
    model: "NV200",
    year: 2021,
    registrationNumber: "STU901",
    type: "van",
    status: "available",
    driverId: "3",
  },
  {
    id: uuidv4(),
    brand: "Isuzu",
    model: "N-Series",
    year: 2018,
    registrationNumber: "VWX234",
    type: "truck",
    status: "inUse",
    driverId: "4",
  },
  {
    id: uuidv4(),
    brand: "Chevrolet",
    model: "Express",
    year: 2019,
    registrationNumber: "YZA567",
    type: "van",
    status: "available",
    driverId: null,
  },
  {
    id: uuidv4(),
    brand: "Toyota",
    model: "Hilux",
    year: 2022,
    registrationNumber: "BCD890",
    type: "truck",
    status: "available",
    driverId: null,
  },
];
