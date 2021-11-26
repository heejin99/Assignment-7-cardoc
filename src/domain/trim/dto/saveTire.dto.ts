import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class SaveTireDto {
	@IsString()
	@IsNotEmpty()
	id!: string;

	@IsInt()
	@IsNotEmpty()
	trim_id!: number;
}
