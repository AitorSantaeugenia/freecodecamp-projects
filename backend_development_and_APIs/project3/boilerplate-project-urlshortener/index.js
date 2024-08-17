require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const dns = require('dns');
const urlparser = require("url");


const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("urlshortner");
const urls = db.collection("urls");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  console.log(req.body);
  const dnslookup = dns.lookup(urlparser.parse(url).hostname,

  async (err, address) => {
    if(!address){
      res.json({error: "Invalid URL"})
    }else{
      const numberUrl = await urls.countDocuments({});
      const urlDocs = {
        url,
        short_url: numberUrl,
      }

      const result = await urls.insertOne(urlDocs);
      console.log(result);
      res.json({ original_url: url, short_url: numberUrl })
    }
  });
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  const shortUrl = req.params.short_url;
  const urlDoc = await urls.findOne({short_url: + shortUrl})
  res.redirect(urlDoc.url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});