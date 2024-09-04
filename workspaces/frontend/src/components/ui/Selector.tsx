import { Select } from 'antd';
import { ChevronDown } from 'lucide-react';
import type { DefaultOptionType } from 'rc-select/es/Select';
import React, { useCallback, useMemo, useState } from 'react';

type SelectorProps = {
    defaultValue?: string;
    options?: DefaultOptionType[];
    prefixNode?: React.ReactNode;
    value?: string;
    placeholder?: string;
    onSelect?: (value: string) => void;
};

export default function Selector({
    options = [],
    defaultValue,
    prefixNode = '',
    value,
    onSelect,
    placeholder = 'Select...',
}: SelectorProps) {
    const [valueSelected, setValueSelected] = useState<string | undefined>(value);

    const onSelectValue = useCallback(
        (value: string) => {
            setValueSelected(value);
            if (onSelect) {
                onSelect(value);
            }
        },
        [setValueSelected, onSelect],
    );

    useMemo(() => {
        setValueSelected(value);
    }, [value]);

    return (
        <Select
            options={options}
            className="w-full"
            defaultValue={defaultValue}
            optionLabelProp="label"
            labelRender={({ label }) => (
                <div>
                    {prefixNode}
                    {label}
                </div>
            )}
            value={valueSelected}
            onSelect={onSelectValue}
            suffixIcon={<ChevronDown size={22} className="text-gray-500" />}
            placeholder={placeholder}
        />
    );
}
