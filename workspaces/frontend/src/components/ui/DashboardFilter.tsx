'use client';

import { Button, Input } from 'antd';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useCallback, useState } from 'react';

import { Selector } from '@/components/ui/index';

type DashboardFilterProps = {
    searchPlaceholder?: string;
    searchByOptions?: DefaultOptionType[];
    defaultSearchBy?: string;
};

export default function DashboardFilter({
    searchPlaceholder = '',
    searchByOptions = [],
    defaultSearchBy,
}: DashboardFilterProps) {
    const $t = useTranslations('dashboard_filter');
    const [searchValue, setSearchValue] = useState<string>();
    const [searchByValue, setSearchByValue] = useState<string>();

    const onReset = useCallback(() => {
        setSearchByValue(defaultSearchBy);
        setSearchValue('');
    }, [defaultSearchBy]);

    return (
        <div className="flex items-center gap-3">
            <Input
                className="flex-1"
                value={searchValue}
                onChange={({ target: { value } }) => setSearchValue(value)}
                placeholder={searchPlaceholder}
                prefix={<Search size={16} className="mr-1" />}
            />
            <div className="w-56">
                <Selector
                    options={searchByOptions}
                    value={searchByValue}
                    defaultValue={defaultSearchBy}
                    onSelect={setSearchByValue}
                    prefixNode={<span className="pr-1.5 text-gray-500">{$t('search_by')}:</span>}
                />
            </div>
            <Button onClick={onReset}>{$t('reset_btn')}</Button>
        </div>
    );
}
