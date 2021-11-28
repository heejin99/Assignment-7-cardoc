import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
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

	async getTire(user, trim_id: number): Promise<Trims> {
		return await this.findOne(trim_id, { where: { user: user.id } });
	}

	async findTire(trim_id: number) {
		const result = await this.findOne(trim_id);
		console.log(result);
		if (!result) {
			throw new BadRequestException();
		}
		return result;
	}
}
