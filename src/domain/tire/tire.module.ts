import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tires } from "../entities/tires.entity";
import { TrimRepository } from "../trim/trim.repository";
import { UserRepository } from "../user/user.repository";
import { TireController } from "./tire.controller";
import { TireRepository } from "./tire.repository";
import { TireService } from "./tire.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Tires,
			TireRepository,
			TrimRepository,
			UserRepository
		])
	],
	controllers: [TireController],
	providers: [TireService]
})
export class TireModule {}
