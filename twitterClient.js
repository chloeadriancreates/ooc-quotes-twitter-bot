import { config } from './config.js';
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
    appKey: config.APP_KEY,
    appSecret: config.APP_SECRET,
    accessToken: config.ACCESS_TOKEN,
    accessSecret: config.ACCESS_SECRET
});

export const rwClient = client.readWrite;