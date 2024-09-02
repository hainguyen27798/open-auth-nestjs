import type { ThemeConfig } from 'antd';
import colors from 'tailwindcss/colors';

export const theme: ThemeConfig = {
    token: {
        colorBgContainer: colors.white,
        colorPrimary: colors.indigo['500'],
        colorBorder: colors.gray['400'],
        colorText: colors.slate['800'],
        controlHeight: 36,
        colorError: colors.red['700'],
        colorErrorTextActive: colors.red['700'],
        colorBorderSecondary: colors.gray['300'],
    },
    components: {
        Table: {
            headerBg: 'transparent',
            headerSplitColor: 'transparent',
            colorBgContainer: 'transparent',
        },
        Dropdown: {
            paddingBlock: 4,
            paddingXXS: 6,
            controlPaddingHorizontal: 8,
        },
        Tabs: {
            colorText: colors.gray['500'],
        },
    },
};
