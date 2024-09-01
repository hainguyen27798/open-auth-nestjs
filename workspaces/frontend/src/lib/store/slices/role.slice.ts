import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';

export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        searchRoleState: {
            reload: 0,
            search: '',
            by: '',
        },
    },
    reducers: {
        changeSearchRoleAction: (state, action) => {
            return {
                ...state,
                searchRoleState: {
                    ...state.searchRoleState,
                    ...action.payload,
                },
            };
        },
    },
});

export const { changeSearchRoleAction } = roleSlice.actions;

export const selectSearchRoleState = (state: RootState) => state.role.searchRoleState;
