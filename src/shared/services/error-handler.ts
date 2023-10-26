import { Response } from 'express';
import { HttpStatusCode } from '../enums/http-status-code.enum.js';

export class ErrorHandler {
  public static handleBadRequest(res: Response, message: string = 'Not Found'): void {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message });
  }

  public static handleUnauthorized(res: Response, message: string = 'Unauthorized'): void {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message });
  }

  public static handleForbidden(res: Response, message: string = 'Forbidden'): void {
    res.status(HttpStatusCode.FORBIDDEN).json({ message });
  }

  public static handleNotFound(res: Response, message: string = 'Not Found'): void {
    res.status(HttpStatusCode.NOT_FOUND).json({ message });
  }

  public static handleMethodNotAllowed(res: Response, message: string = 'Method Not Allowed'): void {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message });
  }

  public static handleInternalServerError(res: Response, message: string = 'Internal Server Error'): void {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message });
  }

  public static handleBadGateway(res: Response, message: string = 'Bad Gateway'): void {
    res.status(HttpStatusCode.BAD_GATEWAY).json({ message });
  }

  public static handleServiceUnavailable(res: Response, message: string = 'Service Unavailable'): void {
    res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({ message });
  }

  public static handleGatewayTimeout(res: Response, message: string = 'Gateway Timeout'): void {
    res.status(HttpStatusCode.GATEWAY_TIMEOUT).json({ message });
  }
}
