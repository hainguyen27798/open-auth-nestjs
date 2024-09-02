import { combineReducers } from 'redux';

import { permissionSlice, roleSlice } from '@/lib/store/slices';

const rootReducer = combineReducers({
    permission: permissionSlice.reducer,
    role: roleSlice.reducer,
});

export default rootReducer;
