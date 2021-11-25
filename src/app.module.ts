import { Module } from "@nestjs/common";
import { UserController } from "./domain/user/user.controller";
import { UserService } from "./domain/user/user.service";
import { UserModule } from "./domain/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./domain/auth/auth.module";
import { Users } from "./domain/entities/user.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [Users],
			synchronize: true,
			keepConnectionAlive: true,
			logging: true
		}),
		UserModule,
		AuthModule
	]
})
export class AppModule {}
