import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#6366f1',
        colorBorder: '#6b7280',
        colorText: '#191919',
    },
    components: {
        Table: {
            headerBg: 'transparent',
            headerSplitColor: 'transparent',
            colorBgContainer: 'transparent',
            borderColor: '#d1d5db',
        },
    },
};
