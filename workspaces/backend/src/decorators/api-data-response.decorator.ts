import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseDto, ResponsePaginationDto } from '@/common';

type TApiDataResponse = {
    type?: Type<unknown>;
    isArray?: boolean;
    description?: string;
};

export const ApiDataResponse = ({ type, isArray, description }: TApiDataResponse) => {
    const decorators = [ApiExtraModels(isArray ? ResponsePaginationDto : ResponseDto)];
    const allOf: unknown[] = [{ $ref: getSchemaPath(isArray ? ResponsePaginationDto : ResponseDto) }];

    if (type) {
        decorators.push(ApiExtraModels(type));

        allOf.push({
            properties: {
                data: isArray
                    ? {
                          type: 'array',
                          items: { $ref: getSchemaPath(type) },
                      }
                    : {
                          $ref: getSchemaPath(type),
                      },
            },
        });
    } else {
        allOf.push({
            properties: {
                data: null,
            },
        });
    }

    return applyDecorators(
        ...decorators,
        ApiOkResponse({
            description,
            schema: {
                allOf,
            },
        }),
    );
};
