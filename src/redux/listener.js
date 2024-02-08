import store from "./store"; // import store supaya bisa ngambil state authnya

let currentAuth;

function listener() {
  let previousAuth = currentAuth;

  currentAuth = store.getState().auth; // ambil state auth dari store | auth karna nama yg di storenya jg auth (line 21)

  // jika dia punya isi token dan tidak sama dengan sebelumnya | karna sebelumnya dia null dan skrg udah login berarti udah punya isi tokennya
  if (currentAuth !== previousAuth) {
    localStorage.setItem("auth", JSON.stringify(currentAuth)); // masukin ke dalam localstorage dengan nama "auth" maka localstoragenya bakal nyimpen currentAuth, localstorage itu tempat penyimpanan di browser
  }
}

function listen() {
  store.subscribe(listener); // store nge subscribe ke listener | jadi setiap ada perubahan di store, dia bakal ngisi listener
}
// kirim listen ke App.js | jadi setiap ada perubahan di store, dia bakal ngisi listener

export { listen };
