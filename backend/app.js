const {PythonShell} = require('python-shell');

PythonShell.run('readWeather.py', null, function (err, results) {
    if (err) throw err;
    console.log(results);
  });
