import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';

export const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        reload: 0,
    },
    reducers: {
        reloadPermissionAction: (state) => {
            return {
                ...state,
                reload: Date.now(),
            };
        },
    },
});

export const { reloadPermissionAction } = permissionSlice.actions;

export const selectReloadPermission = (state: RootState) => state.permission.reload;

export default permissionSlice.reducer;
