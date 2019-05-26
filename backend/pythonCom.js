const {PythonShell} = require('python-shell');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
/*
PythonShell.run('readWeather.py', null, function (err, results) {
    if (err) throw err;
    console.log(results);
});
*/

app.get('/', (req, res) => {
  res.send('Hello world');
});


app.get('/api/weather', (req, res)=>{
  let db = new sqlite3.Database('weather.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    console.log('Connected to the weather.db.');
  });
  
  
  let sql = `SELECT * FROM weather`;

  db.all(sql, [], (err, rows)=>{
    if(err)
    {
      res.send(err);
    }
    
    res.json(rows);
    
  });
  
  db.close();
});


const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));