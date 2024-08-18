import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiDataResponse, Auth, UUIDParam } from '@/decorators';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '@/modules/role/dto';
import { RoleService } from '@/modules/role/role.service';

@Controller('roles')
@ApiTags('Roles')
@Auth()
export class RoleController {
    constructor(private _RoleService: RoleService) {}

    @Get(':id')
    @ApiOperation({ description: 'Get a role' })
    @ApiDataResponse({
        type: RoleDto,
    })
    getById(@UUIDParam() id: UUID) {
        return this._RoleService.getById(id);
    }

    @Post()
    @ApiOperation({ description: 'Create a role' })
    @ApiDataResponse({
        type: RoleDto,
    })
    createPermission(@Body() payload: CreateRoleDto) {
        return this._RoleService.create(payload);
    }

    @Patch(':id')
    @ApiOperation({ description: 'Update a role' })
    @ApiDataResponse({})
    updatePermission(@UUIDParam() id: UUID, @Body() payload: UpdateRoleDto) {
        return this._RoleService.update(id, payload);
    }

    @Delete(':id')
    @ApiOperation({ description: 'Delete a role' })
    @ApiDataResponse({})
    deletePermission(@UUIDParam() id: UUID) {
        return this._RoleService.delete(id);
    }
}
