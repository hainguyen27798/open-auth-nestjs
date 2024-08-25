'use client';

import useSWR from 'swr';

export default function Session() {
    useSWR(
        'api/session',
        () => {
            fetch('http://localhost:3000/api/session', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then();
        },
        {
            refreshInterval: 30000,
        },
    );
    return <></>;
}
