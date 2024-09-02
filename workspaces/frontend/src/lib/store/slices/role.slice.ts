import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/store/store';
import type { Role, TSearchState } from '@/types';

type TRoleState = {
    searchRoleState: TSearchState;
    currentRole: {
        isLoading: true;
        data: Role | null;
    };
};

const initialState: TRoleState = {
    searchRoleState: {
        name: 'role',
        reload: 0,
        search: '',
        by: '',
    },
    currentRole: {
        isLoading: true,
        data: null,
    },
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
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
        changeCurrentRoleAction: (state, action) => {
            return {
                ...state,
                currentRole: {
                    ...state.currentRole,
                    ...action.payload,
                },
            };
        },
    },
});

export const { changeSearchRoleAction, changeCurrentRoleAction } = roleSlice.actions;

export const selectSearchRoleState = (state: RootState) => state.role.searchRoleState;

export const selectCurrentRoleState = (state: RootState) => state.role.currentRole;
