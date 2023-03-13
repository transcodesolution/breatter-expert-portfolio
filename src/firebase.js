import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
var firebaseConfig = {
  apiKey: "AIzaSyCQxy9QcFHmRHyx-uDgI26SPMy6pXX0Wms",
  authDomain: "question-answere.firebaseapp.com",
  projectId: "question-answere",
  storageBucket: "question-answere.appspot.com",
  messagingSenderId: "816587088072",
  appId: "1:816587088072:web:5e2354bb8ce90b263f45fd",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BFA2aeTRDB_1PN_hvCOD-6Az4fPty3zNnbC_2uP9yvGcfVTDEAzsgjPwjACKrzpIKd2BjnjORV1FGQ5QZtvcEjE",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        localStorage.setItem("deviceToken", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
