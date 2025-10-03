import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Vehicle } from "./Vehicle";
import { VehicleManufacturer } from "./VehicleManufacturer";

@Entity()
@Unique(["name", "manufacturer"])
export class VehicleModel extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @AutoMap()
  @Index()
  @Column()
  public readonly name!: string;

  @AutoMap(() => VehicleManufacturer)
  @ManyToOne(() => VehicleManufacturer, (manufacturer) => manufacturer.models, {
    nullable: false,
  })
  public readonly manufacturer!: VehicleManufacturer;

  @AutoMap(() => [Vehicle])
  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  public readonly vehicles!: Vehicle[];

  @AutoMap()
  @CreateDateColumn({ type: "timestamptz" })
  public readonly createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  public readonly updatedAt?: Date;

  @AutoMap()
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  public readonly deletedAt?: Date;
}
