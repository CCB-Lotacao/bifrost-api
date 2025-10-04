import { Identity } from "./Identity";
import { Permission } from "../enums";

export class Authorization {
  public readonly permissions = new Map<string, Permission[]>();

  constructor(public readonly identity: Identity) {}

  public addPermission(permission: Permission, resourceId: string) {
    const resourcePermissions = this.permissions.get(resourceId) || [];
    if (!resourcePermissions.includes(permission)) {
      resourcePermissions.push(permission);
      this.permissions.set(resourceId, resourcePermissions);
    }
  }

  public hasPermission(permission: Permission, resourceId: string): boolean {
    const permissions = this.permissions.get(resourceId) || [];
    return permissions.includes(permission);
  }

  public findResource(permission: Permission): string[] {
    const resources = [];

    for (const [resourceId, permissions] of this.permissions.entries() || []) {
      if (permissions.find((p) => p === permission)) {
        resources.push(resourceId);
      }
    }

    return resources;
  }
}
