import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Base } from "./base/base.entity";
import { Owners } from "./owner.entity";
import { Users } from "./user.entity";

@Entity("trims")
export class Trims extends Base {
	@PrimaryColumn()
	trim_id!: number; // 차종 id

	@Column("int", { default: 205 })
	width!: number;

	@Column("int", { default: 75 })
	aspect_ratio!: number;

	@Column("int", { default: 18 })
	wheel_size!: number;

	@ManyToOne(() => Users, (user) => user.id)
	@JoinColumn([{ name: "id", referencedColumnName: "id" }])
	user?: Users;

	// @OneToMany(() => Owners, (owner) => owner.owner_id)
	// owners!: Owners[];
}
