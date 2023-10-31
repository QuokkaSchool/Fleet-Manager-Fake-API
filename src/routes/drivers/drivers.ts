import { Server } from '../../base/base.js';
import { Request, Response } from 'express';
import { DelayHandler } from '../../shared/services/delay-handler.js';
import { ApiParamsBuilder } from '../../shared/services/api-params-builder.js';
import { ErrorHandler } from '../../shared/services/error-handler.js';
import { v4 as uuidv4 } from 'uuid';
import { SuccessHandler } from '../../shared/services/success-handler.js';
import { DriverInterface, DRIVERS_DATA } from './drivers-data.js';
import { DriversRoutes } from './drivers-routes.js';
import { DriverSchema } from './schemas/driver.schema.js';
import { Vehicle } from '../vehicles/index.js';

export class Drivers {
  public static list: DriverInterface[] = DRIVERS_DATA;

  public static routes(): void {
    Server.app.get(
      DriversRoutes.getList(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getList(req, res)),
    );

    Server.app.get(
      DriversRoutes.getDetails(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getDetails(req, res)),
    );

    Server.app.post(
      DriversRoutes.add(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.add(req, res)),
    );

    Server.app.put(
      DriversRoutes.update(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.update(req, res)),
    );

    Server.app.delete(
      DriversRoutes.remove(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.remove(req, res)),
    );
  }

  private static getList(req: Request, res: Response): void {
    const builtResponse = ApiParamsBuilder.buildList(this.list, req);
    res.json(builtResponse);
  }

  private static getDetails(req: Request, res: Response): void {
    const foundItem: DriverInterface = this.list.find(
      (vehicle) => vehicle.id === req.params.id
    );

    foundItem
      ? res.json(foundItem)
      : ErrorHandler.handleNotFound(res);
  }

  private static add(req: Request, res: Response): void {
    try {
      const newItem = DriverSchema.driver().parse({
        id: uuidv4(),
        ...req.body,
      });
      this.list.push(<DriverInterface><unknown>newItem);
      SuccessHandler.handleCreated(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static update(req: Request, res: Response): void {
    const id = req.params.id;
    const index = this.list.findIndex(
      (driver) => driver.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    try {
      const updatedItem = DriverSchema.updateDriver().parse(req.body);
      this.list[index] = <DriverInterface><unknown>{ id, ...updatedItem };
      const modifiedVehicleList = Vehicle.list.map(
        (vehicle) => vehicle.driver?.id === id
          ? { ...vehicle, driver: <DriverInterface><unknown>{ id, ...updatedItem } }
          : vehicle
      );
      Vehicle.list = modifiedVehicleList;
      SuccessHandler.handleOk(res);
    } catch (error) {
      ErrorHandler.handleBadRequest(res, error.message);
    }
  }

  private static remove(req: Request, res: Response): void {
    const id = req.params.id;
    const index = this.list.findIndex(
      (driver) => driver.id === id
    );

    if (index === -1) return ErrorHandler.handleNotFound(res);

    this.list.splice(index, 1);
    const modifiedVehicleList = Vehicle.list.map(
      (vehicle) => vehicle.driver?.id === id
        ? { ...vehicle, driver: null }
        : vehicle
    );
    Vehicle.list = modifiedVehicleList;
    SuccessHandler.handleOk(res);
  }
}
