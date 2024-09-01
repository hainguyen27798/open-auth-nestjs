import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import type { Rule } from 'rc-field-form/lib/interface';

type FormFieldProps<T> = {
    name: keyof T;
    label?: string;
    placeholder?: string;
    rules?: Rule[];
    title?: string;
    defaultValue?: string | number;
    disable?: boolean;
    type?: 'text' | 'textarea';
};

export default function FormField<T = any>({
    name,
    rules = [],
    label,
    placeholder,
    defaultValue,
    disable = false,
    type = 'text',
}: FormFieldProps<T>) {
    return (
        <Form.Item<T>
            initialValue={defaultValue}
            name={name as any}
            label={<span className="font-medium">{label}</span>}
            rules={rules}
        >
            {type === 'text' && <Input disabled={disable} placeholder={placeholder || label} className="px-4" />}
            {type === 'textarea' && <TextArea disabled={disable} placeholder={placeholder || label} className="px-4" />}
        </Form.Item>
    );
}
