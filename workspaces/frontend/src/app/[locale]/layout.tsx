import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';

import StyledComponentsRegistry from '@/lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Open Auth',
    description: 'Authentication and Authorization',
};

type RootLayoutProps = React.PropsWithChildren & {
    params: { locale: string };
};

export default async function RootLayout({ children, params: { locale } }: Readonly<RootLayoutProps>) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className} suppressHydrationWarning>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <StyledComponentsRegistry>
                        <AntdRegistry>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#6c757d',
                                    },
                                }}
                            >
                                <App>{children}</App>
                            </ConfigProvider>
                        </AntdRegistry>
                    </StyledComponentsRegistry>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
