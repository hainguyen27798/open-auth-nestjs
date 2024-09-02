import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '@/lib/store/root.reducer';

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
