import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import filtersReducer from "../features/filtersSlice";
import themeReducer from "../features/themeSlice";
import configReducer from "../features/configSlice";
import pageReducer from "../features/pageSlice";
import dialogsReducer from "../features/dialogsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        filters: filtersReducer,
        dialogs: dialogsReducer,
        theme: themeReducer,
        config: configReducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;
