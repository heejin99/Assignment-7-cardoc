import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { Users } from "../entities/user.entity";
import { DuplicatedUserException } from "./exception/DuplicatedUserException";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const token = "makeToken";
const mockAuthService = {
	makeToken: jest.fn((user) => {
		return token;
	})
};
const mockUserRepository = {
	findUser: jest.fn(),
	createUser: jest.fn()
};
const userInfo = {
	id: "testid",
	password: "testpw"
};
const newUser = new Users();
newUser.id = "testid";
newUser.password = "testpw";

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: mockUserRepository
				},
				{
					provide: AuthService,
					useValue: mockAuthService
				}
			]
		}).compile();

		service = module.get<UserService>(UserService);
	});

	describe("Create TEST", () => {
		it("create Success", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(null);
			// when
			const result = await service.create(userInfo);
			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(
				userInfo.id
			);
			expect(result).toEqual(token);
		});
		it("create Failed (Duplicated User)", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(newUser);
			try {
				//when
				await service.create(userInfo);
			} catch (err) {
				// then
				expect(err).toBeInstanceOf(DuplicatedUserException);
			}
		});
	});
});
