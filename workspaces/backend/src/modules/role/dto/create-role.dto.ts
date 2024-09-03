import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateRoleDto {
    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
}
