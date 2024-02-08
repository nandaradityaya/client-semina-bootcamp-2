import { USER_LOGIN, USER_LOGOUT } from "./constants";

// terima parameter dari src/pages/signin/index.js
export function userLogin(token, role, email, refreshToken) {
  // setelah terima parameter, jalanin perintah ini dan reducer akan ke trigger
  return {
    type: USER_LOGIN, // dia bakal ngetrigger reducer
    token,
    role,
    email,
    refreshToken,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
