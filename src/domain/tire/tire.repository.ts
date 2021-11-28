import { EntityRepository, Repository } from "typeorm";
import { Tires } from "../entities/tires.entity";
import { Trims } from "../entities/trim.entity";

@EntityRepository(Tires)
export class TireRepository extends Repository<Tires> {
	async saveTrim(trim: Trims, res) {
		const [frontWidth, frontRatio, frontWheel] = res.frontTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((item) => parseInt(item));
		const [rearWidth, rearRatio, rearWheel] = res.rearTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((item) => parseInt(item));

		const frontTire = await this.create({
			width: frontWidth,
			aspect_ratio: frontRatio,
			wheel_size: frontWheel,
			code: true,
			trim: trim
		});

		const rearTire = await this.create({
			width: rearWidth,
			aspect_ratio: rearRatio,
			wheel_size: rearWheel,
			code: false,
			trim: trim
		});

		await this.save(frontTire);
		await this.save(rearTire);
	}

	async getTire(trim_id: number) {
		const query = this.createQueryBuilder("tires")
			.innerJoinAndSelect(Trims, "trims", "trims.trim_id = tires.trim_id")
			.where("trims.trim_id = :trim_id", { trim_id })
			.getMany();
		return query;
	}
}
