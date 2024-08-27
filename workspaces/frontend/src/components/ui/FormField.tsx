import { Form, Input } from 'antd';
import type { Rule } from 'rc-field-form/lib/interface';

type FormFieldProps<T> = {
    name: keyof T;
    label?: string;
    placeholder?: string;
    rules?: Rule[];
    title?: string;
    defaultValue?: string | number;
    disable?: boolean;
};

export default function FormField<T = any>({
    name,
    rules = [],
    label,
    placeholder,
    defaultValue,
    disable = false,
}: FormFieldProps<T>) {
    return (
        <Form.Item<T>
            initialValue={defaultValue}
            name={name as any}
            label={<span className="font-medium">{label}</span>}
            rules={rules}
        >
            <Input disabled={disable} placeholder={placeholder || label} className="px-4" />
        </Form.Item>
    );
}
