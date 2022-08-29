// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  URL_SERVICIO: 'https://back-gestor-dot-august-mesh-330702.uc.r.appspot.com/',
  //URL_SERVICIO: 'http://localhost:8080/GestorMaestria/',
  firebase: {
    apiKey: "AIzaSyCJGt5Rs7Qd_V9W2aZN3Q1TYrsAgV3yrYA",
    authDomain: "gestordocumental-75ed0.firebaseapp.com",
    projectId: "gestordocumental-75ed0",
    storageBucket: "gestordocumental-75ed0.appspot.com",
    messagingSenderId: "177097683324",
    appId: "1:177097683324:web:ad336eaff09201a4c874f9"
  }
};
