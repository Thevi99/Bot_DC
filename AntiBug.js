fs = require('fs');

setInterval(() => {
    fs.writeFile('Restart.js', 'const require("request");', function (err) {
        if (err) return console.log(err);
        console.log("File Create!");
    });
    setTimeout(() => {
        fs.unlink('Restart.js', function(err) {
            console.log("File Remove!");
        });
    }, 1000);
}, 10000);