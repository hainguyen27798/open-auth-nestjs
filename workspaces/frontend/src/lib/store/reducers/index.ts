import { combineReducers } from 'redux';

import permissionReducer from '@/lib/store/reducers/permission.reducer';

const rootReducer = combineReducers({
    permission: permissionReducer,
});

export default rootReducer;
