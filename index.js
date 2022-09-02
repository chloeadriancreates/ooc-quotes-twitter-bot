import { rwClient } from './twitterClient.js';
import { firebaseConfig } from './config.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { CronJob } from 'cron';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function getQuotes() {
    const response = await get(child(dbRef, 'quotes/not_tweeted'));
    const quotes = await response.val();
    return quotes;
}

async function tweet(quotes) {
    const random = Math.floor(Math.random() * quotes.length);
    const randomKey = Object.keys(quotes)[random];
    try {
        await rwClient.v2.tweet(quotes[randomKey]);
        const newKey = push(child(dbRef, 'quotes/tweeted')).key;
        const updates = {};
        updates[`quotes/tweeted/${newKey}`] = quotes[randomKey];
        updates[`quotes/not_tweeted/${randomKey}`] = null;
        update(dbRef, updates);
    } catch(e) {
        console.error(e);
    }
}

export async function startQuotes() {
    const quotes = await getQuotes();
    tweet(quotes);
}

// const job = new CronJob(
// 	'0 */4 * * *',
// 	function() {
// 		startQuotes();
// 	},
// 	null,
// 	true,
// 	'America/Los_Angeles'
// );