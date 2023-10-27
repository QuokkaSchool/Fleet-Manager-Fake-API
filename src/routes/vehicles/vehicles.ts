import { Server } from '../../base/base.js';
import { VehiclesRoutes } from './vehicles-routes.js';
import { Request, Response } from 'express';
import { VehicleInterface, VEHICLES_DATA } from './vehicles-data.js';
import { ErrorHandler } from '../../shared/services/error-handler.js';
import { VehicleSchema } from './schemas/vehicle.schema.js';
import { v4 as uuidv4 } from 'uuid';
import { SuccessHandler } from '../../shared/services/success-handler.js';
import { DelayHandler } from '../../shared/services/delay-handler.js';

export class Vehicle {
  private static vehiclesList: VehicleInterface[] = VEHICLES_DATA;

  public static routes(): void {
    Server.app.get(
      VehiclesRoutes.getVehiclesList(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getVehiclesList(req, res)),
    );

    Server.app.get(
      VehiclesRoutes.getVehicleDetails(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getVehicleDetails(req, res)),
    );

    Server.app.post(
      VehiclesRoutes.addVehicle(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.addVehicle(req, res)),
    );

    Server.app.put(
      VehiclesRoutes.updateVehicle(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.updateVehicle(req, res)),
    );

    Server.app.delete(
        VehiclesRoutes.deleteVehicle(),
        (req: Request, res: Response) => DelayHandler.delay(() => this.deleteVehicle(req, res)),
    );
  }

  private static getVehiclesList(_req: Request, res: Response) {
    res.json(this.vehiclesList);
  }

  private static getVehicleDetails(req: Request, res: Response) {
    const foundItem: VehicleInterface = this.vehiclesList.find(
      (vehicle) => vehicle.id === req.params.id
    );

    foundItem
      ? res.json(foundItem)
      : ErrorHandler.handleNotFound(res);
  }

  private static addVehicle(req: Request, res: Response) {
    try {
      const newItem = VehicleSchema.vehicle().parse({
        id: uuidv4(),
        ...req.body,
      });
      this.vehiclesList.push(<VehicleInterface><unknown>newItem);
      SuccessHandler.handleCreated(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static updateVehicle(req: Request, res: Response) {
    const id = req.params.id;
    const index = this.vehiclesList.findIndex(
        (item) => item.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    try {
      const updatedItem = VehicleSchema.updateVehicle().parse(req.body);
      this.vehiclesList[index] = <VehicleInterface><unknown>{ id, ...updatedItem };
      SuccessHandler.handleOk(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static deleteVehicle(req: Request, res: Response) {
    const id = req.params.id;
    const index = this.vehiclesList.findIndex(
        (item) => item.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    this.vehiclesList.splice(index, 1);
    SuccessHandler.handleOk(res);
  }
}
