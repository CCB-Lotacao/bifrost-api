import { Permission } from "../../../domain/enums";
import { IResourcePermission } from "./resourcePermission.interface";

export type IRequiredPermission =
  | Permission
  | Permission[]
  | IResourcePermission;
