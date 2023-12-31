import { Server } from '../../base/base.js';
import { VehiclesRoutes } from './vehicles-routes.js';
import { Request, Response } from 'express';
import { VehicleInterface, VEHICLES_DATA } from './vehicles-data.js';
import { ErrorHandler } from '../../shared/services/error-handler.js';
import { VehicleSchema } from './schemas/vehicle.schema.js';
import { v4 as uuidv4 } from 'uuid';
import { SuccessHandler } from '../../shared/services/success-handler.js';
import { DelayHandler } from '../../shared/services/delay-handler.js';
import { ApiParamsBuilder } from '../../shared/services/api-params-builder.js';

export class Vehicles {
  public static list: VehicleInterface[] = VEHICLES_DATA;

  public static routes(): void {
    Server.app.get(
      VehiclesRoutes.getList(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getList(req, res)),
    );

    Server.app.get(
      VehiclesRoutes.getDetails(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getDetails(req, res)),
    );

    Server.app.post(
      VehiclesRoutes.add(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.add(req, res)),
    );

    Server.app.put(
      VehiclesRoutes.update(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.update(req, res)),
    );

    Server.app.delete(
      VehiclesRoutes.remove(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.remove(req, res)),
    );
  }

  private static getList(req: Request, res: Response): void {
    const builtResponse = ApiParamsBuilder.buildList(this.list, req);
    res.json(builtResponse);
  }

  private static getDetails(req: Request, res: Response): void {
    const foundItem: VehicleInterface = this.list.find(
      (vehicle) => vehicle.id === req.params.id
    );

    foundItem
      ? res.json(foundItem)
      : ErrorHandler.handleNotFound(res);
  }

  private static add(req: Request, res: Response): void {
    try {
      const newItem = VehicleSchema.vehicle().parse({
        id: uuidv4(),
        ...req.body,
      });
      this.list.push(<VehicleInterface><unknown>newItem);
      SuccessHandler.handleCreated(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static update(req: Request, res: Response): void {
    const id = req.params.id;
    const index = this.list.findIndex(
      (vehicle) => vehicle.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    try {
      const updatedItem = VehicleSchema.updateVehicle().parse(req.body);
      this.list[index] = <VehicleInterface><unknown>{ id, ...updatedItem };
      SuccessHandler.handleOk(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static remove(req: Request, res: Response): void {
    const id = req.params.id;
    const index = this.list.findIndex(
        (item) => item.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    this.list.splice(index, 1);
    SuccessHandler.handleOk(res);
  }
}
