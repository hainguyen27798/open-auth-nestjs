import { Body, Controller, Delete, Get, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common';
import { ApiDataResponse, Auth, UUIDParam } from '@/decorators';
import { CreateRoleDto, RoleDto, UpdateRoleDto, UpdateRolePermissionDto } from '@/modules/role/dto';
import { RoleService } from '@/modules/role/role.service';

@Controller('roles')
@ApiTags('Roles')
@Auth()
export class RoleController {
    constructor(private _RoleService: RoleService) {}

    @Get()
    @ApiOperation({ description: 'Get roles' })
    @ApiDataResponse({
        type: RoleDto,
        isArray: true,
    })
    getAll(@Query(new ValidationPipe({ transform: true })) pageOption: PageOptionsDto) {
        return this._RoleService.getAll(pageOption);
    }

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
    createRole(@Body() payload: CreateRoleDto) {
        return this._RoleService.create(payload);
    }

    @Patch(':id')
    @ApiOperation({ description: 'Update a role' })
    @ApiDataResponse({})
    updateRole(@UUIDParam() id: UUID, @Body() payload: UpdateRoleDto) {
        return this._RoleService.update(id, payload);
    }

    @Post(':id/permission')
    @ApiOperation({ description: 'Add a permission for role' })
    @ApiDataResponse({})
    addPermissionForRole(@UUIDParam() id: UUID, @Body() payload: UpdateRolePermissionDto) {
        return this._RoleService.addPermissionForRole(id, payload);
    }

    @Delete(':id/permission/:permissionId')
    @ApiOperation({ description: 'Delete a role permission' })
    @ApiDataResponse({})
    deleteRolePermission(@UUIDParam() id: UUID, @UUIDParam('permissionId') permissionId: UUID) {
        return this._RoleService.deleteRolePermission(id, permissionId);
    }

    @Delete(':id')
    @ApiOperation({ description: 'Delete a role' })
    @ApiDataResponse({})
    deleteRole(@UUIDParam() id: UUID) {
        return this._RoleService.delete(id);
    }
}
