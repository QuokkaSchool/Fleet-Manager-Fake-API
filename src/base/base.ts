import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Dictionaries } from '../routes/dictionaries/index.js';
import { Vehicles } from '../routes/vehicles/index.js';
import { Drivers } from '../routes/drivers/index.js';
import { Orders } from '../routes/orders/index.js';

export class Server {
  public static port: number = 8080;
  public static app: Express;

  public static start(): void {
    this.app = express();
    this.appConfigure();
    this.appListen();

    // Routes
    Dictionaries.routes();
    Vehicles.routes();
    Drivers.routes();
    Orders.routes();
  }

  private static appConfigure(): void {
    this.app.use(express.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private static appListen(): void {
    this.app.listen(this.port, () => {
      console.log(`Express server is running on port ${this.port}`);
    });
  }
}
