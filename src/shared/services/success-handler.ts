import { Response } from 'express';
import { HttpStatusCode } from '../enums/http-status-code.enum.js';

export class SuccessHandler {
  public static handleOk(res: Response, message: string = 'Ok'): void {
    res.status(HttpStatusCode.OK).json({ message });
  }

  public static handleCreated(res: Response, message: string = 'Created'): void {
    res.status(HttpStatusCode.CREATED).json({ message });
  }

  public static handleAccepted(res: Response, message: string = 'Accepted'): void {
    res.status(HttpStatusCode.ACCEPTED).json({ message });
  }

  public static handleNoContent(res: Response, message: string = 'No Content'): void {
    res.status(HttpStatusCode.NO_CONTENT).json({ message });
  }
}
