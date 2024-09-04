import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { find, snakeCase } from 'lodash';

import { GRANT_OPERATION_METHOD } from '@/modules/role/constants/grant';
import { TAuthUser } from '@/types';

@Injectable()
class JwtGuard extends AuthGuard('jwt') {
    constructor(private _Reflector: Reflector) {
        super();
    }

    handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
        const resource = this._Reflector.get('path', context.getClass());
        const actionMethod = context.getHandler().name;
        const method = context.switchToHttp().getRequest<Request>().method;
        const routePermission = `${resource}:${GRANT_OPERATION_METHOD[method]}:${actionMethod}`;

        const hasPermission = find(user.permissions, (permission) => matchWithPermission(routePermission, permission));

        if (!hasPermission) {
            throw new ForbiddenException(snakeCase(_info?.message) || '');
        }

        return user;
    }
}

export const Auth = () => applyDecorators(ApiBearerAuth(), UseGuards(JwtGuard));

export const AuthUser = createParamDecorator((_data: unknown, context: ExecutionContext): TAuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
});

const matchWithPermission = (routePermission: string, userPermission: string) => {
    const regexString = userPermission
        .replace(/([.+?^=!:${}()|\[\]\/\\])/g, '\\$1')
        .replace(/\*/g, '.*')
        .replace(/any/g, '.*');

    return new RegExp(regexString).test(routePermission);
};
