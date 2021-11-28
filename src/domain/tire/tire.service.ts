import { BadRequestException, Injectable } from "@nestjs/common";
import { TrimRepository } from "../trim/trim.repository";
import { UnauthorizedUserException } from "../user/exception/UnauthorizedUserException";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class TireService {
	constructor(
		private trimRepository: TrimRepository,
		private userRepository: UserRepository
	) {}

	async getTire(user, trim_id: number) {
		const findUser = await this.userRepository.findUser(user.id);
		if (!findUser) {
			throw new UnauthorizedUserException();
		}
		const findTire = await this.trimRepository.findTire(trim_id);
		if (!findTire) {
			throw new BadRequestException();
		}
		return await this.trimRepository.getTire(user, trim_id);
	}
}
