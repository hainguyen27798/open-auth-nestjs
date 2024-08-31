import { Body, Controller, Delete, Get, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common';
import { ApiDataResponse, Auth, UUIDParam } from '@/decorators';
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from '@/modules/role/dto';
import { PermissionService } from '@/modules/role/permission.service';

@Controller('role-permissions')
@ApiTags('Role Permission')
@Auth()
export class PermissionController {
    constructor(private readonly _PermissionService: PermissionService) {}

    @Get()
    @ApiOperation({ description: 'Get permissions' })
    @ApiDataResponse({
        type: PermissionDto,
        isArray: true,
    })
    getAll(@Query(new ValidationPipe({ transform: true })) pageOption: PageOptionsDto) {
        return this._PermissionService.getAll(pageOption);
    }

    @Get(':id')
    @ApiOperation({ description: 'Get permissions' })
    @ApiDataResponse({
        type: PermissionDto,
    })
    getById(@UUIDParam() id: UUID) {
        return this._PermissionService.getById(id);
    }

    @Post()
    @ApiOperation({ description: 'Create a permission' })
    @ApiDataResponse({
        type: PermissionDto,
    })
    createPermission(@Body() payload: CreatePermissionDto) {
        return this._PermissionService.create(payload);
    }

    @Patch(':id')
    @ApiOperation({ description: 'update a permission' })
    @ApiDataResponse({})
    updatePermission(@UUIDParam() id: UUID, @Body() payload: UpdatePermissionDto) {
        return this._PermissionService.update(id, payload);
    }

    @Delete(':id')
    @ApiOperation({ description: 'delete a permission' })
    @ApiDataResponse({})
    deletePermission(@UUIDParam() id: UUID) {
        return this._PermissionService.delete(id);
    }
}
