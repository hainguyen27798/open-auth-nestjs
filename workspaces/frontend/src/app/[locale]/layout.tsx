import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';

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
        <html lang="en">
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
