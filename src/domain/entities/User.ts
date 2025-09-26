import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { UserRole } from "../enums";

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @AutoMap()
  @Column()
  public name!: string;

  @AutoMap()
  @Column({ unique: true })
  public email!: string;

  @AutoMap()
  @Column({ nullable: true })
  public phone?: string;

  @AutoMap()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Assistant,
  })
  public role!: UserRole;

  @AutoMap()
  @CreateDateColumn({ type: "timestamp" })
  public readonly createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamp" })
  public readonly updatedAt?: Date;

  @AutoMap()
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  public readonly deletedAt?: Date;
}
