import {
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
  ERROR_FETCHING_TALENTS,
  SET_KEYWORD,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchTalents = debounce(getData, 1000);

export const startFetchingTalents = () => {
  return {
    type: START_FETCHING_TALENTS,
  };
};

export const successFetchingTalents = ({ talents }) => {
  return {
    type: SUCCESS_FETCHING_TALENTS,
    talents,
  };
};

export const errorFetchingTalents = () => {
  return {
    type: ERROR_FETCHING_TALENTS,
  };
};

export const fetchTalents = () => {
  // untuk ambil data keywordnya butuh dispatch dan getState
  return async (dispatch, getState) => {
    dispatch(startFetchingTalents());

    try {
      // const notif = getState().notif.status;
      // if (notif) {
      //   setTimeout(() => {
      //     dispatch(clearNotif());
      //   }, 5000);
      // } bisa juga pake if seperti ini supaya notif ga selalu di jalankan ketika fetchTalents dijalankan

      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000); // ini untuk menghilangkan notif setelah 5 detik

      let params = {
        keyword: getState().talents.keyword, // ambil keyword dari state, keyword itu apa yg diinputkan user
      };

      let res = await debouncedFetchTalents("/cms/talents", params); // response dari API. debouncedFetchTalents ini untuk mengurangi request ke server, jadi kalau user ngetik cepet2, requestnya akan di delay 1 detik, parameter keduanya itu params supaya apa yg diketikan oleh user masuk ke parameter urlnya, dan ini di kerjakan oleh function getData di file utils/fetch.js

      // looping ini untuk manipulasi data yang didapat dari server, jadi kita bisa mengubah data yang didapat dari server sebelum dimasukkan ke dalam reducer (kekurangan pada reusable component table)
      res.data.data.forEach((res) => {
        res.avatar = res.image.name; // mengubah nama key image menjadi avatar yg berisi image name
      });

      dispatch(
        successFetchingTalents({
          talents: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingTalents());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
