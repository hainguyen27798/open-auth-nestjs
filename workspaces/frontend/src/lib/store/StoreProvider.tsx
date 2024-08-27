'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';

import type { AppStore } from '@/lib/store/store';
import { makeStore } from '@/lib/store/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
