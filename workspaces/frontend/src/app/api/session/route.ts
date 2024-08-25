import { NextResponse } from 'next/server';

import { refreshAction } from '@/_actions/refresh-token.action';

export async function POST() {
    await refreshAction();
    return NextResponse.json({});
}
