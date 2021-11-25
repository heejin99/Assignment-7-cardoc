import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards/localAuthGuard.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { ResponseTokenDto } from "./dto/responseToken.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	@Post("signup")
	async signUp(@Body() body: CreateUserDto): Promise<ResponseTokenDto> {
		return { token: await this.userService.create(body) };
	}

	@UseGuards(LocalAuthGuard)
	@Post("signin")
	async signIn(@Request() req): Promise<ResponseTokenDto> {
		return { token: await this.authService.makeToken(req.body) };
	}
}
