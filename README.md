# Out of context Cast Party Twitter bot - V2

Hello! This is the code for a Twitter bot I made that tweets a random quote from *Cast Party: a Dungeons & Dragons podcast* every four hours. The account is [@castpartyquotes](https://twitter.com/castpartyquotes), if you want to give it a look! I really recommend the show, it is one of the most heartfelt and funniest podcasts I know. 

## Now, for the tech stack! 
This version of the bot was made using Javascript, the twitter-api-v2 and cron packages, and Firebase. 
You can find the previous version on the v1 branch – the core is the same, but I switched from using Heroku Scheduler to another hosting service and the cron package.

### Firebase
I used a Realtime Database, because I only needed a small place to store two lists of quotes (tweeted and not tweeted). You can see the layout of the database in quotes.json!

### Cron
You may have noticed that the Cron job in index.js is commented – this is because my bots are all hosted on the same server, and I have a single file that runs all the Cron jobs there. However, for the sake of clarity, I decided to do separate Git repositories and add the extra code in comments.

I really love making these bots, and even though having to switch from Heroku (who are sadly cancelling their free plan from November onwards) was a bummer, I really think the code for this version is cleaner, and I'm ultimately very happy about it.

Thanks for reading, and happy coding! I hope you have a great day.
Chloé x