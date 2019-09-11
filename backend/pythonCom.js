const {PythonShell} = require('python-shell');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
var bodyParser  = require('body-parser');

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello world');
});




app.get('/api/weather', (req, res)=>{
  let db = new sqlite3.Database('weather.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    else
    {
      console.log('Connected to the weather.db.');
      let sql = `SELECT * FROM weather`;

      db.all(sql, [], (err, rows)=>{
        if(err)
        {
          res.send(err);
        }
        
        res.json(rows);
        
      });    
    }
  });

  db.close();
});

app.get('/api/diary', (req, res)=>{
  let db = new sqlite3.Database('weather.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    else
    {
      console.log('Connected to the weather.db.');
      let sql = `SELECT * FROM DIARY`;

      db.all(sql, [], (err, rows)=>{
        if(err)
        {
          res.send(err);
        }
        
        res.json(rows);
        
      });    
    }
  });

  db.close();
});

app.post('/api/diary', (req, res) => {
  var postData  = req.body;
  var type = req.headers.type;

  let db = new sqlite3.Database('weather.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    else
    {
      console.log('Connected to the weather.db.');
      console.log(postData)
      console.log(type)
      var sqli;

      if(type === "INSERT")
      {
        console.log("inserted")
        sql = `INSERT INTO DIARY (DATE, DIARY) VALUES(?,?)`;
        db.run(sql, [postData.DATE, postData.DIARY], function(err) {
          if (err) {
            return console.log(err.message);
          }
        });
      }
      else
      {
        console.log("updated")
        sql = `UPDATE DIARY SET DIARY = ? WHERE DATE = ?`;
        db.run(sql, [postData.DIARY, postData.DATE], function(err) {
          if (err) {
            return console.log(err.message);
          }
        });
      }
    }

  });
  db.close();
});

app.get('/api/liveWeather', (req, res) => {
  const myPyshell = new PythonShell('getLiveWeatherTest.py', {mode: 'json'});
  myPyshell.on('message', function (response) {
    res.json(response);
  });
});


const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
