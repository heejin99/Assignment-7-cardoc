import { HttpService } from "@nestjs/axios";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { SaveTireDto } from "./dto/saveTire.dto";
import { TrimService } from "./trim.service";

@Controller("trim")
export class TrimController {
	constructor(
		private readonly trimService: TrimService,
		private httpService: HttpService
	) {}
	@UseGuards(JwtGuard)
	@Post()
	async saveTire(@Body() saveTireDto: Array<SaveTireDto>) {
		const result = await Promise.all(
			saveTireDto.map(async (item, index) => {
				const res = await lastValueFrom(
					this.httpService.get(process.env.url + item.trim_id)
				);
				return await this.trimService.saveTire(
					saveTireDto[index],
					res.data.spec.driving
				);
			})
		);
		return result;
	}
}
