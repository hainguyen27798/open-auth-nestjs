'use client';

import { Spin } from 'antd';
import React from 'react';

type LoadingWrapperProps = React.PropsWithChildren & {
    loading?: boolean;
};

export default function LoadingWrapper({ children, loading }: LoadingWrapperProps) {
    return (
        <>
            {loading && (
                <div className="flex h-40 w-full items-center justify-center">
                    <Spin></Spin>
                </div>
            )}
            {!loading && children}
        </>
    );
}
