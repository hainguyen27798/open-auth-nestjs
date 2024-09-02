'use client';

import { App, Button, Form, type FormProps, Input } from 'antd';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { loginAction } from '@/_actions/login.action';
import { useRouter } from '@/navigation';

type FieldType = {
    email?: string;
    password?: string;
};

export default function Login() {
    const $t = useTranslations('auth');
    const { notification } = App.useApp();
    const router = useRouter();

    const onSubmit: FormProps<FieldType>['onFinish'] = ({ email, password }) => {
        if (email && password) {
            loginAction(email, password).then((rs) => {
                if (rs?.error) {
                    notification.error({
                        message: rs.message,
                        showProgress: true,
                    });
                } else {
                    router.push('/');
                    notification.success({
                        message: $t('login_success'),
                        showProgress: true,
                    });
                }
            });
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Form
                className="flex w-96 flex-col gap-6 rounded bg-white px-10 pb-14 pt-10 shadow-2xl"
                onFinish={onSubmit}
            >
                <div className="mb-3 flex items-center justify-center gap-6">
                    <Image src="/img/logo-dark.png" width={60} height={60} alt="logo" />
                    <div className="text-3xl font-semibold">Open Auth</div>
                </div>
                <div className="flex flex-col gap-2">
                    <Form.Item<FieldType> name="email" rules={[{ required: true }]}>
                        <Input placeholder="Email" className="px-4" />
                    </Form.Item>
                    <Form.Item<FieldType> name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Password" className="px-4" />
                    </Form.Item>
                </div>
                <Button size="large" className="w-full shadow-none" type="primary" htmlType="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}
