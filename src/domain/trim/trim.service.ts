import { Injectable } from "@nestjs/common";
import { TireRepository } from "../tire/tire.repository";
import { UnauthorizedUserException } from "../user/exception/UnauthorizedUserException";
import { UserRepository } from "../user/user.repository";
import { TrimRepository } from "./trim.repository";

@Injectable()
export class TrimService {
	constructor(
		private trimRepository: TrimRepository,
		private userRepository: UserRepository,
		private tireRepository: TireRepository
	) {}

	async saveTire(saveTireDto, res) {
		const findUser = await this.userRepository.findUser(saveTireDto.id);
		console.log(findUser);
		if (!findUser) {
			throw new UnauthorizedUserException();
		}
		const newTire = await this.trimRepository.saveTire(saveTireDto);
		await this.tireRepository.saveTrim(newTire, res);
		return { id: newTire.user, trimId: newTire.trim_id };
	}
}
