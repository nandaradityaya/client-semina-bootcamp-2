import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, role: null, refreshToken: null, email: null };

export default function reducer(state = initialState, action) {
  // action.type untuk mengecek actionnya apa (dari mana)
  switch (action.type) {
    case USER_LOGIN: // typenya user login maka dia akan ngeganti state yg ada | jadinya statenya bakal ke update dan ngeganti token dan rolenya
      return {
        token: action.token, // simpan token ke initialState agar ke update | action.token ini di kirim dari src/redux/auth/actions.js
        email: action.email,
        refreshToken: action.refreshToken, // ambil dari refreshToken
        role: action.role,
      };

    case USER_LOGOUT:
      return { token: null, role: null, refreshToken: null, email: null }; // hapus token, role, dan refreshToken dari state (redux) ketika logout

    default:
      return state;
  }
}
