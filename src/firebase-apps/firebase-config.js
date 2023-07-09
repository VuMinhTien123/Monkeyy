
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyByt5JxsZMhoMfDNdlvtd0jufdx-e3xYw0",
  authDomain: "monkey-blogg-81cd7.firebaseapp.com",
  projectId: "monkey-blogg-81cd7",
  storageBucket: "monkey-blogg-81cd7.appspot.com",
  messagingSenderId: "809128039009",
  appId: "1:809128039009:web:cd8e6a595dea7aaf4c9020"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
