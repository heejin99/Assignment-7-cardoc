import {
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Base } from "./base/base.entity";
import { Tires } from "./tires.entity";
import { Users } from "./user.entity";

@Entity("trims")
export class Trims extends Base {
	@PrimaryColumn()
	trim_id!: number; // 차종 id

	@ManyToOne(() => Users, (user) => user.trim)
	@JoinColumn([{ name: "id", referencedColumnName: "id" }])
	user!: Users;

	@OneToMany(() => Tires, (tire) => tire.trim)
	tire!: Tires[];
}
