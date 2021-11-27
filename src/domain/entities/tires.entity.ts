import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Base } from "./base/base.entity";
import { Trims } from "./trim.entity";

@Entity("tires")
export class Tires extends Base {
	@PrimaryGeneratedColumn("increment")
	tire_id!: number; // 바퀴 id

	@Column("int")
	width!: number;

	@Column("int")
	aspect_ratio!: number;

	@Column("int")
	wheel_size!: number;

	@Column("boolean")
	code!: boolean; // true: front, false: rear

	@ManyToOne(() => Trims, (trim) => trim.tire)
	@JoinColumn([{ name: "trim_id", referencedColumnName: "trim_id" }])
	trim!: Trims;
}
