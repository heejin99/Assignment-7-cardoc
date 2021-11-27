import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Base } from "./base/base.entity";
import { Trims } from "./trim.entity";

@Entity("users")
export class Users extends Base {
	@PrimaryColumn("varchar", { length: 20 })
	id!: string;

	@Column("varchar", { length: 200 })
	password!: string;

	@OneToMany(() => Trims, (trim) => trim.trim_id)
	trim?: Trims[];
}
