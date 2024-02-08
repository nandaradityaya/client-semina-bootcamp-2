import {
  START_FETCHING_ORDERS,
  SUCCESS_FETCHING_ORDERS,
  ERROR_FETCHING_ORDERS,
  SET_PAGE,
  SET_DATE,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  page: 1,
  limit: 10, // limit data per page di table
  pages: 1,
  date: {
    startDate: new Date(), // startDate: moment(getState().orders?.date?.startDate).format("YYYY-MM-DD"),
    endDate: new Date(),
    key: "selection", // key: "selection" karena kita mau nampilin data dari page 1
  },
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORDERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORDERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORDERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.orders,
        pages: action.pages,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_DATE:
      return {
        ...state,
        date: action.ranges,
      };

    default:
      return state;
  }
}
