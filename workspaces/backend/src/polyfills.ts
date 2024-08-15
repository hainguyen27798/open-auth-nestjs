import 'source-map-support/register';

import { compact, map } from 'lodash';

import { AbstractEntity } from '@/common/abstract.entity';
import { AbstractDto } from '@/common/dto/abstract.dto';

declare global {
    export type UUID = string & { _uuidBrand: undefined };

    interface Array<T> {
        toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];
    }
}

Array.prototype.toDtos = function <Entity extends AbstractEntity<Dto>, Dto extends AbstractDto>(
    options?: unknown,
): Dto[] {
    return compact(map<Entity, Dto>(this as Entity[], (item) => item.toDto(options as never)));
};
