import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Order } from '@/constants';

export class PageOptionsDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly search: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly by: string;

    @ApiProperty({ enum: Order })
    @IsEnum(Order)
    @IsOptional()
    readonly order: Order = Order.ASC;

    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    @Min(1)
    readonly page: number = 1;

    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    @Min(1)
    @Max(50)
    readonly take: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
