import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // jalanin action start fetching
    case START_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.process }; // process dulu pada saat start fetching

    case ERROR_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CATEGORIES:
      return {
        ...state,
        status: statuslist.success, // ketika success balikin statusnya jadi success agar bisa diolah di halaman client dan loadingnya hilang
        data: action.categories, // datanya diambil dari action yg dispatch success dan akan ngerubah data state di initialState sehingga data di halaman client akan berubah
      };

    default:
      return state;
  }
}
