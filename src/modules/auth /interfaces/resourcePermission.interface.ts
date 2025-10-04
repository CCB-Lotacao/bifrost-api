import { Permission } from "../../../domain/enums";

export interface IResourcePermission {
  readonly [resource: string]: Permission[];
}
