import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise"; // debounce untuk mengurangi request ke server | jadi ada jeda waktu antara request pertama dan kedua
import { clearNotif } from "../notif/actions";

let debouncedFetchCategories = debounce(getData, 1000); // debounce untuk nge delay selama 1 detik baru masuk ke getData | jadi ada jeda waktu setiap ngetik keyword pencarian, biar servernya ga ke request terus menerus

// START
export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

// SUCCESS
export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES, // ngasih type action ke reducer
    categories, // ngasih data categories ke reducer
  };
};

export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories()); // dispatch untuk mengirim action ke reducer

    // ketika start jalankan try catch ini
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000); // clear notif alert setelah 5 detik

      let res = await debouncedFetchCategories("/cms/categories"); // API CMS Categories (ini isinya data)

      // jika success, maka jalankan successFetchingCategories, agar data yang didapat dari server bisa diolah di reducer dan muncul datanya di halaman client
      dispatch(
        successFetchingCategories({
          categories: res.data.data, // data categories yang didapat dari server akan dimasukkan ke dalam categories di reducer
        })
      );
    } catch (error) {
      dispatch(errorFetchingCategories());
    }
  };
};
