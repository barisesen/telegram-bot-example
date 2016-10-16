/*
* @barisesen -Github
* https://barisesen.com
*/
var TelegramBot = require('node-telegram-bot-api');

var token = 'xxxxxxxxxxxxxxxxxxxxxx';
// Setup polling way

var bot = new TelegramBot(token, {polling: true});

var Twitter = require('twitter');

// Twitter app tokens
var client = new Twitter({
  consumer_key: 'xxxxxxxxxxx',
  consumer_secret: 'xxxxxxxxxxxxx',
  access_token_key: 'xxxxxxx-xxxxx',
  access_token_secret: 'xxxxxxxxx'
});


// oauth/authorize
// client.get('oauth/authorize', function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }else
//       console.log(error);
//   });

function senTweet(text) {
  client.post('statuses/update', {status: text}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet.text);
    }
  });
}


// Any kind of message
bot.on('message', function (msg) {
  console.log(msg);
  var chatId = msg.chat.id;
  var text = msg.text;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cats.jpg';

  // sendTweet(text);

  client.stream('statuses/filter', {track: text},  function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
      bot.sendMessage(chatId, tweet.text);
    });

    stream.on('error', function(error) {
      console.log(error);
    });
  });

  // bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});
