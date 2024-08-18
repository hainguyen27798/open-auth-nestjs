import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '@/common';

export class ResponseDto<DTO extends AbstractDto> {
    @ApiProperty()
    message: string;

    @ApiProperty({ enum: HttpStatus, default: HttpStatus.OK })
    statusCode: HttpStatus;

    @ApiProperty()
    data?: DTO;
}
