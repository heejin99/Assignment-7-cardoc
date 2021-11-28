import { Controller, Get, UseGuards, Request, Param } from "@nestjs/common";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { TireService } from "./tire.service";

@Controller("tire")
export class TireController {
	constructor(private tireService: TireService) {}
	@UseGuards(JwtGuard)
	@Get(":trim_id")
	async getTire(@Request() req, @Param("trim_id") trim_id: number) {
		return await this.tireService.getTire(req.user, trim_id);
	}
}
