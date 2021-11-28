import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TrimRepository } from "../trim/trim.repository";
import { UnauthorizedUserException } from "../user/exception/UnauthorizedUserException";
import { UserRepository } from "../user/user.repository";
import { TireService } from "./tire.service";

const mockUserRepository = {
	findUser: jest.fn()
};

const mockTrimRepository = {
	findTire: jest.fn(),
	getTire: jest.fn()
};

const tire = {
	createdAt: "2021-11-26T17:50:50.140Z",
	updatedAt: "2021-11-28T09:09:04.000Z",
	trim_id: 5000
};

const user = {
	id: "candycandy"
};

const trim_id = 5000;

describe("TireService", () => {
	let service: TireService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TireService,
				{
					provide: TrimRepository,
					useValue: mockTrimRepository
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<TireService>(TireService);
	});

	describe("Tire Get", () => {
		it("Tire Get Success", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(user.id);
			mockTrimRepository.findTire.mockReturnValue(trim_id);
			mockTrimRepository.getTire.mockReturnValue(tire);
			// when
			const result = await service.getTire(user, trim_id);
			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(user.id);
			expect(mockTrimRepository.getTire).toHaveBeenCalled();
			expect(result).toEqual(tire);
		});
		it("Tire Get Failed(User 없음)", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(null);
			mockTrimRepository.findTire.mockReturnValue(trim_id);
			mockTrimRepository.getTire.mockReturnValue(tire);
			try {
				// when
				await service.getTire(user, trim_id);
			} catch (err) {
				// then
				expect(err).toBeInstanceOf(UnauthorizedUserException);
			}
		});

		it("Tire Get Failed(Trim_id 없음)", async () => {
			const fail_id = 1;
			// given
			mockUserRepository.findUser.mockReturnValue(user.id);
			mockTrimRepository.findTire.mockReturnValue(fail_id);
			mockTrimRepository.getTire.mockReturnValue(tire);
			try {
				// when
				await service.getTire(user, fail_id);
			} catch (err) {
				// then
				expect(err).toBeInstanceOf(BadRequestException);
			}
		});
	});
});
