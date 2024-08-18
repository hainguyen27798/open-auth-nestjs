import { HttpStatus } from '@nestjs/common';

export class SuccessDto {
    message?: string;
    statusCode: HttpStatus;
    data?: any;

    constructor(message: string | null, status: HttpStatus = HttpStatus.OK, data: any = null) {
        this.statusCode = status;
        if (message) {
            this.message = message;
        }
        this.data = data;
    }
}
