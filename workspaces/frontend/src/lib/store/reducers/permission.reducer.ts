import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';

export const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        searchPermissionStatue: {
            reload: 0,
            search: '',
            by: '',
        },
    },
    reducers: {
        changeSearchPermissionAction: (state, action) => {
            return {
                ...state,
                searchPermissionStatue: {
                    ...state.searchPermissionStatue,
                    ...action.payload,
                },
            };
        },
    },
});

export const { changeSearchPermissionAction } = permissionSlice.actions;

export const selectSearchPermissionState = (state: RootState) => state.permission.searchPermissionStatue;

export default permissionSlice.reducer;
