import { Module } from "@nestjs/common";
import { UserModule } from "./domain/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./domain/auth/auth.module";
import { Users } from "./domain/entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { TrimModule } from "./domain/trim/trim.module";
import { Trims } from "./domain/entities/trim.entity";
import { Owners } from "./domain/entities/owner.entity";

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
			entities: [Users, Trims],
			// synchronize: true,
			keepConnectionAlive: true,
			logging: true
		}),
		UserModule,
		AuthModule,
		TrimModule
	]
})
export class AppModule {}
