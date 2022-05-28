const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

const url = 'mongodb+srv://mongo:mon123@cluster0.ayjrt.mongodb.net/dreamData?retryWrites=true&w=majority'
const dbName = 'dreamData'

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.listen(1001, function() {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, 
        (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
    
    
}); 

app.get('/', (req, res) => {
    db.collection('dreams').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log({dreams: result})
        res.render('index.ejs', {dreams: result})
      })
    
})

app.post('/checkWord', (req, res) => {
  console.log(req.body.word)
  let word = `${req.body.word}`
  let wordPal = word.toLowerCase().split('').reverse().join('')
          
  if ( word.toLowerCase() === wordPal) {
      conclusion = 'Yes! A palindrome'
  } else {
      conclusion = 'This is NOT what we want!'
  }

    db.collection('dreams').insertOne({word: req.body.word, outcome: conclusion})
      .then(result => {
        console.log('saved to database')
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })