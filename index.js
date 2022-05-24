import { rwClient } from './twitterClient.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, push, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCpJtR-dqEROxc7CtsSb_-BX_o9chKP7NM",
    authDomain: "cast-party-quotes.firebaseapp.com",
    databaseURL: "https://cast-party-quotes-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cast-party-quotes",
    storageBucket: "cast-party-quotes.appspot.com",
    messagingSenderId: "999937059505",
    appId: "1:999937059505:web:f08f485fd4e4d70836d090",
    measurementId: "G-7Y1YY3LFQV"
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

const tweet = async (quotes, arrayLength) => {
    const random = Math.floor(Math.random() * arrayLength);
    const keyRandom = Object.keys(quotes)[random];
    console.log(quotes);
    console.log(quotes[keyRandom]);
    try {
        await rwClient.v2.tweet(quotes[keyRandom]);
        const newKey = push(child(dbRef, 'quotes/tweeted')).key;
        const updates = {};
        updates[`quotes/tweeted/${newKey}`] = quotes[keyRandom];
        updates[`quotes/not_tweeted/${keyRandom}`] = null;
        update(dbRef, updates);
    } catch(e) {
        console.error(e);
    }
}

function start() {
    get(child(dbRef, 'counter')).then((snapshot) => {
        console.log(snapshot.val());
        if(snapshot.val() == 1) {
            get(child(dbRef, 'quotes/not_tweeted')).then((snapshot) => {
                if(snapshot.val()) {
                    const length = Object.keys(snapshot.val()).length;
                    tweet(snapshot.val(), length);
                }
                const updates = {};
                const newCounter = 0;
                updates['counter'] = newCounter;
                update(dbRef, updates);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            const updates = {};
            const newCounter = snapshot.val() + 1;
            updates['counter'] = newCounter;
            update(dbRef, updates);
        }
    })
}

start();