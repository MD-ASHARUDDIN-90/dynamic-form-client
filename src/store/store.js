// store.js
import { createStore } from "redux";

import dynamicFormReducer from "./reducer";

const store = createStore(dynamicFormReducer);

export default store;
