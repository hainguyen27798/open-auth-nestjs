'use client';

import { Button, Form, Input } from 'antd';
import Image from 'next/image';

export default function Login() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Form className="flex w-96 flex-col gap-6 rounded bg-white px-10 pb-14 pt-10 shadow-2xl">
                <div className="mb-3 flex items-center justify-center gap-6">
                    <Image src="/img/logo.png" width={60} height={60} alt="logo" />
                    <div className="text-3xl font-semibold">Open Auth</div>
                </div>
                <Input size="large" placeholder="Email" className="px-4" />
                <Input.Password size="large" placeholder="Password" className="px-4" />
                <Button size="large" className="mt-3 w-full shadow-none" type="primary">
                    Login
                </Button>
            </Form>
        </div>
    );
}
