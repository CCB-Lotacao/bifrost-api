import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { IdentityProvider, UserRole } from "../enums";
import { Common } from ".";

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
  @Column({ nullable: true })
  public readonly state?: string;

  @AutoMap()
  @Column({ nullable: true })
  public readonly city?: string;

  @AutoMap()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Assistant,
  })
  public role!: UserRole;

  @AutoMap()
  @Column()
  public readonly identityProvider!: IdentityProvider;

  @AutoMap()
  @Column()
  public readonly identityId!: string;

  @AutoMap()
  @Column()
  public password!: string;

  @AutoMap()
  @ManyToOne(() => Common, (common) => common.user, { nullable: true })
  public common?: Common;

  @AutoMap()
  @CreateDateColumn({ type: "timestamptz" })
  public readonly createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamptz" })
  public readonly updatedAt?: Date;

  @AutoMap()
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  public readonly deletedAt?: Date;
}
