import { Param, ParseUUIDPipe, PipeTransform, Type } from '@nestjs/common';

export function UUIDParam(
    property: string = 'id',
    ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
    return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
