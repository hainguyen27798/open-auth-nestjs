import { Form, Input } from 'antd';
import type { Rule } from 'rc-field-form/lib/interface';

type FormFieldProps<T> = {
    name: keyof T;
    label?: string;
    placeholder?: string;
    rules?: Rule[];
    title?: string;
};

export default function FormField<T = any>({ name, rules = [], label, placeholder }: FormFieldProps<T>) {
    return (
        <Form.Item<T> name={name as any} label={<span className="font-medium">{label}</span>} rules={rules}>
            <Input placeholder={placeholder || label} className="px-4" />
        </Form.Item>
    );
}
