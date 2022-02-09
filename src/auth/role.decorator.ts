import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
  return request.user
    // if(request.user.role == 'user'){
    //     return new ForbiddenException('you are not admin')
    // }
    // if(request.user.role == 'admin'){
    //    try{
    //         return request.user
    //     }catch(error){
    //         throw error
    //     }
    // }
  },
);