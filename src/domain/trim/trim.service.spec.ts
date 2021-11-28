import { Test, TestingModule } from "@nestjs/testing";
import { TireRepository } from "../tire/tire.repository";
import { UnauthorizedUserException } from "../user/exception/UnauthorizedUserException";
import { UserRepository } from "../user/user.repository";
import { TrimRepository } from "./trim.repository";
import { TrimService } from "./trim.service";

const mockUserRepository = {
	findUser: jest.fn()
};

const mockTrimRepository = {
	saveTire: jest.fn()
};

const mockTireRepository = {
	saveTrim: jest.fn()
};

const saveTireDto = {
	id: "candycandy",
	trim_id: 5000
};

const res = {
	frontTire: {
		name: "타이어 전",
		value: "225/60R16",
		unit: "",
		multiValues: ""
	},
	rearTire: {
		name: "타이어 후",
		value: "225/60R16",
		unit: "",
		multiValues: ""
	}
};

const newTire = {
	trim_id: 5000,
	user: "candycandy",
	updatedAt: "2021-11-28T07:43:15.000Z"
};

const results = {
	id: "candycandy",
	trimId: 5000
};

describe("TrimService", () => {
	let service: TrimService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TrimService,
				{
					provide: TrimRepository,
					useValue: mockTrimRepository
				},
				{
					provide: TireRepository,
					useValue: mockTireRepository
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<TrimService>(TrimService);
	});

	describe("Save Test", () => {
		it("save Success", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(saveTireDto.id);
			mockTrimRepository.saveTire.mockReturnValue(newTire);
			mockTireRepository.saveTrim.mockReturnValue(undefined);
			// when
			const result = await service.saveTire(saveTireDto, res);
			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(
				saveTireDto.id
			);
			expect(mockTrimRepository.saveTire).toHaveBeenCalledWith(
				saveTireDto
			);
			expect(mockTireRepository.saveTrim).toHaveBeenCalledWith(
				newTire,
				res
			);
			expect(result).toEqual(results);
		});
		it("save Failed(User 없음)", async () => {
			// given
			mockUserRepository.findUser.mockReturnValue(null);
			mockTrimRepository.saveTire.mockReturnValue(newTire);
			mockTireRepository.saveTrim.mockReturnValue(undefined);
			try {
				// when
				await service.saveTire(saveTireDto, res);
			} catch (err) {
				// then
				expect(err).toBeInstanceOf(UnauthorizedUserException);
			}
		});
	});
});
