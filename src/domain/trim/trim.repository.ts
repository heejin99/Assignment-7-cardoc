import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Tires } from "../entities/tires.entity";
import { Trims } from "../entities/trim.entity";

@EntityRepository(Trims)
export class TrimRepository extends Repository<Trims> {
	async saveTire(trim): Promise<Trims> {
		const trims = new Trims();
		trims.trim_id = trim.trim_id;
		trims.user = trim.id;
		const result = await this.create(trims);
		return await this.save(result);
	}

	async findTire(trim_id: number) {
		const result = await this.findOne({ trim_id });
		if (!result) {
			throw new BadRequestException();
		}
		return result;
	}
}
