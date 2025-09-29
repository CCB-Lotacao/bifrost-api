import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { VehicleModel } from "./VehicleModel";

@Entity()
export class VehicleManufacturer extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @AutoMap()
  @Index({ unique: true })
  @Column()
  public readonly name!: string;

  @AutoMap(() => [VehicleModel])
  @OneToMany(() => VehicleModel, (model) => model.manufacturer)
  public readonly models!: VehicleModel[];

  @AutoMap()
  @CreateDateColumn({ type: "timestamp" })
  public readonly createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamp", nullable: true })
  public readonly updatedAt?: Date;

  @AutoMap()
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  public readonly deletedAt?: Date;
}
