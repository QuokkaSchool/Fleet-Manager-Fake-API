import { OrderInterface, ORDERS_DATA } from './orders-data.js';
import { Server } from '../../base/base.js';
import { Request, Response } from 'express';
import { DelayHandler } from '../../shared/services/delay-handler.js';
import { OrdersRoutes } from './orders-routes.js';
import { ApiParamsBuilder } from '../../shared/services/api-params-builder.js';
import { ErrorHandler } from '../../shared/services/error-handler.js';
import { OrderSchema } from './schemas/order.schema.js';
import { v4 as uuidv4 } from 'uuid';
import { SuccessHandler } from '../../shared/services/success-handler.js';

export class Orders {
  public static list: OrderInterface[] = ORDERS_DATA;

  public static routes(): void {
    Server.app.get(
      OrdersRoutes.getList(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getList(req, res)),
    );

    Server.app.get(
      OrdersRoutes.getDetails(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.getDetails(req, res)),
    );

    Server.app.post(
      OrdersRoutes.add(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.add(req, res)),
    );

    Server.app.put(
      OrdersRoutes.update(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.update(req, res)),
    );

    Server.app.delete(
      OrdersRoutes.remove(),
      (req: Request, res: Response) => DelayHandler.delay(() => this.remove(req, res)),
    );
  }

  private static getList(req: Request, res: Response): void {
    const builtResponse = ApiParamsBuilder.buildList(this.list, req);
    res.json(builtResponse);
  }

  private static getDetails(req: Request, res: Response): void {
    const foundItem: OrderInterface = this.list.find(
      (order) => order.id === req.params.id
    );

    foundItem
      ? res.json(foundItem)
      : ErrorHandler.handleNotFound(res);
  }

  private static add(req: Request, res: Response): void {
    try {
      const newItem = OrderSchema.order().parse({
        id: uuidv4(),
        ...req.body,
      });
      this.list.push(<OrderInterface><unknown>newItem);
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
      const updatedItem = OrderSchema.updateOrder().parse(req.body);
      this.list[index] = <OrderInterface><unknown>{
        id,
        ...updatedItem,
      };
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
