import { Request } from "express";
import { Identity } from "../../../domain/entities";

export interface IHttpRequestWithAuthorization extends Request {
  readonly identity: Identity;
}
