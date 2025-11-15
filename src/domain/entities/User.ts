import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { IdentityProvider, UserRole } from "../enums";
import { Church } from ".";

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
  public state?: string;

  @AutoMap()
  @Column({ nullable: true })
  public city?: string;

  @AutoMap()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Assistant,
  })
  public role!: UserRole;

  @AutoMap()
  @Column()
  public identityProvider!: IdentityProvider;

  @AutoMap()
  @Column()
  public identityId!: string;

  @AutoMap()
  @Column()
  public password!: string;

  @AutoMap()
  @ManyToOne(() => Church, (church) => church.user, { nullable: true })
  @JoinColumn({ name: "churchId" })
  public church?: Church;

  @Column({ nullable: true })
  public churchId?: string;

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
