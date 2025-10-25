import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { User } from "./User";

@Entity()
export class Common extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @AutoMap()
  @Column()
  public readonly name!: string;

  @AutoMap()
  @Column({ nullable: true })
  public readonly state?: string;

  @AutoMap()
  @Column({ nullable: true })
  public readonly city?: string;

  @AutoMap()
  @OneToMany(() => User, (user) => user.common, {
    nullable: false,
  })
  public readonly user!: User[];

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
