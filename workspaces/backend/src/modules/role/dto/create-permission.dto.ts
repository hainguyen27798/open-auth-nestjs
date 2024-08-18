import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreatePermissionDto {
    @Expose()
    @ApiProperty()
    @IsString()
    serviceName: string;

    @Expose()
    @ApiProperty()
    @IsString()
    resource: string;

    @Expose()
    @ApiProperty()
    @IsString()
    action: string;

    @Expose()
    @ApiProperty()
    @IsString()
    attributes: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
}
