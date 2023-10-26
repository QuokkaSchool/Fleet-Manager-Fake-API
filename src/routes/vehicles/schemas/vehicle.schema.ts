import { z } from 'zod';

export class VehicleSchema {
  public static vehicle = () =>
    z.object({
      id: z.string(),
      brand: z.string(),
      model: z.string(),
      year: z.number(),
      registrationNumber: z.string(),
      type: z.enum(["truck", "van"]),
      status: z.enum(["available", "inUse", "underMaintenance"]),
      driverId: z.string().nullable(),
    });

  public static updateVehicle = () =>
    z.object({
        brand: z.string(),
        model: z.string(),
        year: z.number(),
        registrationNumber: z.string(),
        type: z.enum(["truck", "van"]),
        status: z.enum(["available", "inUse", "underMaintenance"]),
        driverId: z.string().nullable(),
    });
}
