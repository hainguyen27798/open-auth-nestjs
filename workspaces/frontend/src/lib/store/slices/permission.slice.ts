import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';

export const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        searchPermissionState: {
            name: 'permission',
            reload: 0,
            search: '',
            by: '',
        },
    },
    reducers: {
        changeSearchPermissionAction: (state, action) => {
            return {
                ...state,
                searchPermissionState: {
                    ...state.searchPermissionState,
                    ...action.payload,
                },
            };
        },
    },
});

export const { changeSearchPermissionAction } = permissionSlice.actions;

export const selectSearchPermissionState = (state: RootState) => state.permission.searchPermissionState;
