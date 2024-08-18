import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class CreateRoleDto {
    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsUUID('4', { each: true })
    permissionIds: UUID[];

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
}
