import { Module } from "@nestjs/common";
 import { AuthService } from "./auth.service";
 import { AuthController } from "./auth.controller";
 import { TypeOrmModule } from "@nestjs/typeorm";
 import { User } from "./entities/user.entity";
 import { JwtModule } from "@nestjs/jwt";
 
 @Module({
   imports: [
     TypeOrmModule.forFeature([User]),
     JwtModule.register({
       global: true,
       secret: "SECRET KEY",
       signOptions: { expiresIn: "30s" },
     }),
   ],
   controllers: [AuthController],
   providers: [AuthService],
 })
 export class AuthModule {}