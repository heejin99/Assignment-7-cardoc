import { HttpStatus } from "@nestjs/common";

export class ErrorCode {
	static readonly UnauthorizedUser = new ErrorCode(
		HttpStatus.UNAUTHORIZED,
		"인증되지 않은 사용자입니다."
	);
	static readonly DuplicatedUser = new ErrorCode(
		HttpStatus.CONFLICT,
		"중복된 사용자입니다."
	);
	static readonly BadRequest = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"잘못된 접근입니다."
	);
	static readonly NotFound = new ErrorCode(
		HttpStatus.NOT_FOUND,
		"요청받은 리소스를 찾을 수 없습니다."
	);
	static readonly Forbidden = new ErrorCode(
		HttpStatus.FORBIDDEN,
		"접근 권한이 없습니다."
	);
	constructor(
		private readonly statusCode: number,
		public readonly message: string
	) {}

	get StatusCode(): number {
		return this.statusCode;
	}

	get Message(): string {
		return this.message;
	}
}
