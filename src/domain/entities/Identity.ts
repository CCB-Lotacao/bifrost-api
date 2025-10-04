import { AutoMap } from "@automapper/classes";
import { IdentityProvider } from "../enums";

export class Identity {
  @AutoMap()
  public readonly id!: string;

  @AutoMap()
  public readonly provider!: IdentityProvider;

  @AutoMap()
  public skipValidation!: boolean;

  constructor(id: string, provider: IdentityProvider, skipValidation = false) {
    this.id = id;
    this.provider = provider;
    this.skipValidation = skipValidation;
  }
}
