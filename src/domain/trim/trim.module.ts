import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trims } from "../entities/trim.entity";
import { TireRepository } from "../tire/tire.repository";
import { UserRepository } from "../user/user.repository";
import { TrimController } from "./trim.controller";
import { TrimRepository } from "./trim.repository";
import { TrimService } from "./trim.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Trims,
			TrimRepository,
			UserRepository,
			TireRepository
		]),
		HttpModule
	],
	controllers: [TrimController],
	providers: [TrimService]
})
export class TrimModule {}
