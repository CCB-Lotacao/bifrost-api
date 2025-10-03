import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { VehicleModel } from "./VehicleModel";
import { VehicleType } from "../enums";

@Entity()
@Unique(["model"])
export class Vehicle extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @AutoMap()
  @Column()
  public readonly name!: string;

  @AutoMap(() => VehicleModel)
  @ManyToOne(() => VehicleModel, (model) => model.vehicles, {
    nullable: false,
  })
  public readonly model!: VehicleModel;

  @AutoMap()
  @Column({
    type: "enum",
    enum: VehicleType,
  })
  public type!: VehicleType;

  @AutoMap()
  @CreateDateColumn({ type: "timestamptz" })
  public readonly createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamptz" })
  public readonly updatedAt!: Date;

  @AutoMap()
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  public readonly deletedAt?: Date;
}
