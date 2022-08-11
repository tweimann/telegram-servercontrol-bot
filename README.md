# telegram-servercontrol-bot
telegram bot to control my servers. idk if this will ever be public

## How to install / start
```
git clone https://github.com/tweimann/telegram-servercontrol-bot
cd telegram-servercontrol-bot
```
Now configure the variables in the ```auth.json``` and ```settings.json``` files
```
npm install
npm start
```

## How to run in Docker
clone the tweimann/telegram-servercontrol-bot image and setup the following environment vars:
```
TELEGRAM_API_KEY="XXXXXXXXX"
ADMINS="User1,User2"
CHATID="-123456789,-234567890"
PROBE_INTERVAL="60" 
```
bot will only respond to messages from admins that are in te defined channels