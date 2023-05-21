import { CLEAR_NOTIF, SET_NOTIF } from "./constants";

// status itu buat nampilin atau ngga notifnya, type itu success dan danger, message itu isinya
let initialState = { status: false, typeNotif: "", message: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // SET_NOTIF data yang dikirim dari action
    case SET_NOTIF:
      return {
        ...state,
        status: action.status,
        typeNotif: action.typeNotif,
        message: action.message,
      };

    // clear notif itu buat ngilangin notifnya atau balikin ke state awal
    case CLEAR_NOTIF:
      return { state: initialState }; // balikin ke initialState

    default:
      return state;
  }
}
