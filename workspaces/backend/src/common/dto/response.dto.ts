import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '@/common';

export class BaseResponseDto {
    @ApiProperty()
    message: string;

    @ApiProperty({ enum: HttpStatus, default: HttpStatus.OK })
    statusCode: HttpStatus;
}

export class ResponseDto<DTO extends AbstractDto> extends BaseResponseDto {
    @ApiProperty()
    data?: DTO;
}

export class ResponsePaginationDto<DTO extends AbstractDto> extends ResponseDto<DTO> {
    @ApiProperty()
    metadata?: unknown;
}
