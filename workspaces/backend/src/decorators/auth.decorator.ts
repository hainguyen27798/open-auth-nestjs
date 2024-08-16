import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import _ from 'lodash';

import { TAuthUser } from '@/types';

@Injectable()
class JwtGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
        if (_.get(user, 'permissions.*.*')) {
            return user;
        }

        const httpContext = context.switchToHttp().getRequest<Request>();
        const path = _.get(httpContext, 'route.path');
        const method = _.get(httpContext, 'method');

        const hasPermission = _.get(user, ['permissions', method, path]);

        if (!hasPermission) {
            throw err || new ForbiddenException();
        }

        return user;
    }
}

export const Auth = () => applyDecorators(ApiBearerAuth(), UseGuards(JwtGuard));

export const AuthUser = createParamDecorator((_data: unknown, context: ExecutionContext): TAuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
});
