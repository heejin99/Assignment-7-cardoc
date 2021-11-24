import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entities/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
	async findUser(id: string) {
		return await this.findOne({ id });
	}

	async createUser(createUserDto: CreateUserDto) {
		const newUser = new Users();
		newUser.id = createUserDto.id;
		newUser.password = await bcrypt.hash(createUserDto.password, 10);

		return await this.save(newUser);
	}
}
