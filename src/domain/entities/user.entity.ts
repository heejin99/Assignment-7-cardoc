import { Column, Entity, PrimaryColumn } from "typeorm";
import { Base } from "./base/base.entity";

@Entity("users")
export class Users extends Base {
	@PrimaryColumn("varchar", { length: 20 })
	id!: string;

	@Column("varchar", { length: 200, nullable: false })
	password!: string;
}
