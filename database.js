const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAHeka91l_CrcAmPfzyYahie-BqgVnn05c",
  authDomain: "hackday17s.firebaseapp.com",
  databaseURL: "https://hackday17s.firebaseio.com",
  projectId: "hackday17s",
  storageBucket: "hackday17s.appspot.com",
  messagingSenderId: "261685621415"
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();
var postRef = rootRef.child('post');
var imageRef = rootRef.child('image');
var commitRef = rootRef.child('commit');
var generalRef = rootRef.child('general')


var db = {
  savePost: function(message) {
    postRef.push().set({
      'ts': message['ts'],
      'author': message['username'],
      'title': message['file']['title'],
      'link': message['file']['permalink']
    });
  },

  saveImage: function(message) {
    imageRef.push().set({
      'ts': message['ts'],
      'author': message['username'],
      'title': message['file']['title'],
      'link': message['file']['url_private']
    });
  },

  saveGeneral: function(message) {
    generalRef.push().set({
      'ts': message['ts'],
      'author': message['username'],
      'title': message['file']['title'],
      'link': message['file']['permalink'],
      'type': message['file']['mimetype']
    })
  },

  saveCommit: function(message) {
    var authorRegex = '> by ([a-zA-Z]*)';
    var urlRegex = '<(.*?)\\|';
    var commitMsgRegex = '` (.*?) -';

    var commits = message['attachments'][0]['text'].split('\n');
    for (var i = 0; i < commits.length; i++) {
      commitRef.push().set({
        'ts': message['ts'],
        'author': message['attachments'][0]['fallback'].match(authorRegex)[1],
        'link': commits[i].match(urlRegex)[1],
        'message': commits[i].match(commitMsgRegex)[1]
      });
    }
  }
};

module.exports = db;
