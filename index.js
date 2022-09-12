import { rwClient } from './twitterClient.js';
import { firebaseConfig } from './config.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { CronJob } from 'cron';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function getQuotes() {
    const response = await get(child(dbRef, 'quotes'));
    const quotes = await response.val();
    return quotes;
}

async function tweet(quotes) {
    const notTweeted = quotes["not_tweeted"];
    const tweeted = quotes["tweeted"];
    const random = Math.floor(Math.random() * notTweeted.length);
    try {
        await rwClient.v2.tweet(notTweeted[random]);
        const updates = {};
        updates[`quotes/tweeted`] = [...tweeted, notTweeted[random]];
        notTweeted.splice(random, 1);
        updates[`quotes/not_tweeted`] = notTweeted;
        update(dbRef, updates);
    } catch(e) {
        console.error(e);
    }
}

export async function startQuotes() {
    const quotes = await getQuotes();
    tweet(quotes);
}

const job = new CronJob(
	'0 */4 * * *',
	function() {
		startQuotes();
	},
	null,
	true,
	'America/Los_Angeles'
);