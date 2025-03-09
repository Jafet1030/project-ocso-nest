import { applyDecorators } from "@nestjs/common"
 import { ApiResponse } from "@nestjs/swagger"
 export const AuthApi = () => {
   return applyDecorators(
     ApiResponse({
       status: 401,
       description: "No token",
     }),
     ApiResponse({
       status: 403,
       description: "Role doesn't allow this action",
     }),
     ApiResponse({
       status: 500,
       description: "DB Error",
     }),
   )
 }