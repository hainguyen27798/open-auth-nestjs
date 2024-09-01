'use client';

import { Button, Input } from 'antd';
import { debounce } from 'lodash-es';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useCallback, useState } from 'react';

import { Selector } from '@/components/ui/index';

type TFilter = {
    search: string;
    by?: string;
};

type DashboardFilterProps = {
    searchPlaceholder?: string;
    searchByOptions?: DefaultOptionType[];
    defaultSearchBy?: string;
    filterChange?: (value: TFilter) => void;
};

export default function DashboardFilter({
    searchPlaceholder = '',
    searchByOptions = [],
    defaultSearchBy,
    filterChange,
}: DashboardFilterProps) {
    const $t = useTranslations('dashboard_filter');
    const [searchValue, setSearchValue] = useState<string>();
    const [searchByValue, setSearchByValue] = useState<string>();

    const onReset = useCallback(() => {
        setSearchByValue(defaultSearchBy);
        setSearchValue('');
        if (filterChange) {
            filterChange({
                search: '',
                by: defaultSearchBy,
            });
        }
    }, [defaultSearchBy, filterChange]);

    return (
        <div className="flex items-center gap-3">
            <Input
                className="flex-1"
                defaultValue={searchValue}
                onChange={debounce(({ target: { value } }) => {
                    setSearchValue(value);
                    if (filterChange) {
                        filterChange({
                            search: value,
                            by: searchByValue || defaultSearchBy,
                        });
                    }
                }, 1000)}
                placeholder={searchPlaceholder}
                prefix={<Search size={16} className="mr-1" />}
            />
            <div className="w-56">
                <Selector
                    options={searchByOptions}
                    value={searchByValue}
                    defaultValue={defaultSearchBy}
                    onSelect={(value) => {
                        setSearchByValue(value);
                        if (filterChange) {
                            filterChange({
                                search: searchValue || '',
                                by: value,
                            });
                        }
                    }}
                    prefixNode={<span className="pr-1.5 text-gray-500">{$t('search_by')}:</span>}
                />
            </div>
            <Button onClick={onReset}>{$t('reset_btn')}</Button>
        </div>
    );
}
