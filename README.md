# Out of context Cast Party Twitter bot

Hello! This is the code for a Twitter bot I made that tweets a random quote from *Cast Party: a Dungeons & Dragons podcast* every four hours. The account is [@castpartyquotes](https://twitter.com/castpartyquotes), if you want to give it a look! I really recommend the show, it is one of the most heartfelt and funniest podcasts I know. 

## Now, for the tech stack! 
This bot was made using Javascript, the twitter-api-v2 package, Firebase and Heroku. 

### Firebase
I used a Realtime Database, because I only needed a small place to store two lists of quotes (tweeted and not tweeted), as well as a counter (you'll see why in the next part). 

### Heroku
I originally used a Cron job to tweet every four hours, but I found out that while it worked perfectly locally, it wouldn't work while deploying, because Heroku apps got to sleep after 30 minutes of inactivity. This is why I switched to Heroku Scheduler that starts the program every hour, and added a counter that increments every hour, so it only tweets every four hours!

This was my first time using any of these services, and while it was difficult at times, I had a lot of fun! I'm sure my code isn't perfect, but I'm excited to keep learning.

Thanks for reading! I hope you have a great day.
Chloé x