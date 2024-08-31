import { HttpStatus } from '@nestjs/common';

type IData = {
    data: any;
    metadata?: any;
};

export class SuccessDto {
    message?: string;
    statusCode: HttpStatus;
    data?: any;
    metadata?: any;

    constructor(message: string | null, status: HttpStatus = HttpStatus.OK, data: any | IData = null) {
        this.statusCode = status;
        if (message) {
            this.message = message;
        }
        if (data?.data) {
            this.data = data?.data;
            this.metadata = data?.metadata;
        } else {
            this.data = data;
        }
    }
}
