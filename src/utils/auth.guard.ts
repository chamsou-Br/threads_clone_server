import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/users/users.service";


@Injectable()
export class AuthGruad implements CanActivate{

    constructor(private userService : UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.log("1")
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.userService.verifyToken(token)
          request['user'] = payload;
        } catch(err ) {
          throw new UnauthorizedException();
        }
        return true;
      }

      private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}