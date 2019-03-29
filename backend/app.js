const {PythonShell} = require('python-shell');

PythonShell.run('readTemperature.py', null, function (err, results) {
    if (err) throw err;
    console.log(results);
  });