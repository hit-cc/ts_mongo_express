import { Response } from "express";
import { response_status_codes } from "./commonModel";

export function successResponse(message: string, data: any, res: Response) {
  res.status(response_status_codes.success).json({
    status: "success",
    status_code: response_status_codes.success,
    message: message,
    data,
  });
}

export function failureResponse(message: string, data: any, res: Response) {
  res.status(response_status_codes.success).json({
    status: "failure",
    status_code: response_status_codes.success,
    message: message,
    data,
  });
}

export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    status: "failure",
    status_code: response_status_codes.bad_request,
    message: "Insufficient parameters",
    res,
  });
}

export function mongoError(err: any, res: Response) {
  res.status(response_status_codes.internal_server_error).json({
    status: "failure",
    status_code: response_status_codes.internal_server_error,
    message: "MongoDB error",
    data: res,
  });
}
