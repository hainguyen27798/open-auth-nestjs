import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { Order } from '@/constants';

export class PageOptionsDto {
    @ApiProperty({ enum: Order })
    @IsEnum(Order)
    @IsOptional()
    readonly order: Order = Order.ASC;

    @ApiProperty()
    @IsInt()
    @Min(1)
    readonly page: number = 1;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(50)
    readonly take: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
