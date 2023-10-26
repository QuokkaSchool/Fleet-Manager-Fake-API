import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Vehicle } from '../routes/vehicles/index.js';

export class Server {
  public static port: number = 8080;
  public static app: Express;

  public static start(): void {
    this.app = express();
    this.appConfigure();
    this.appListen();

    // Routes
    Vehicle.routes();
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
