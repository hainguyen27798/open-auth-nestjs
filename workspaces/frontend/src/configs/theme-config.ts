import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#6366f1',
        colorBorder: '#6b7280',
        colorText: '#191919',
        controlHeight: 36,
        colorError: '#b91c1c',
        colorErrorTextActive: '#b91c1c',
    },
    components: {
        Table: {
            headerBg: 'transparent',
            headerSplitColor: 'transparent',
            colorBgContainer: 'transparent',
            borderColor: '#d1d5db',
        },
        Dropdown: {
            paddingBlock: 4,
            paddingXXS: 6,
            controlPaddingHorizontal: 8,
        }
    },
};
