import {
  combineReducers,
  legacy_createStore as createStore, // legacy_createStore digunakan supaya createStore tidak deprecated
  applyMiddleware, // digunakan untuk menghubungkan middleware ke store
  compose, // digunakan untuk menghubungkan redux devtools ke store (utk liat di web browser jg bisa)
} from "redux";

import thunk from "redux-thunk"; // redux thunk digunakan untuk menghandle async action
import authReducer from "./auth/reducer";
import categoriesReducer from "./categories/reducer";
import notifReducer from "./notif/reducer";
import talentsReducer from "./talents/reducer";
import paymentsReducer from "./payments/reducer";
// import speakersReducer from './speakers/reducers';
// import eventsReducer from './events/reducers';
// import listsReducer from './lists/reducer';
// import transactionsReducer from './transactions/reducers';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ambil semua reducer yang ada di folder redux (statenya)
const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notif: notifReducer,
  talents: talentsReducer,
  payments: paymentsReducer,
  // speakers: speakersReducer,
  // events: eventsReducer,
  // lists: listsReducer,
  // transactions: transactionsReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
