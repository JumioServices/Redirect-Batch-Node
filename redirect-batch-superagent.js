const request = require('superagent');
var fs = require("fs");
var promises = [];
var results = {};
var args = process.argv.slice(2);
var count = args[0];

const btoa = Buffer.from(process.env.API_TOKEN + ":" + process.env.API_SECRET).toString('base64');

async function initiate(userReference) {
    var res = await request.post('https://netverify.com/api/v4/initiate')
        .set('Authorization', 'Basic ' + btoa)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('User-Agent', 'Jumio Redirect/1.0')
        .send(
            {
                customerInternalReference: 'Jumio Redirect',
                userReference: userReference
            }
        )
        ;
    return {
        userReference: userReference,
        redirectUrl: res.body.redirectUrl,
        transactionReference: res.body.transactionReference
    };
}

async function loop() {
    for (var ii = 0; ii < count; ii++) {
        var res = await initiate(ii);
        results[ii] = res;
    }
}

async function start() {
    await loop();

    fs.writeFile("redirects.csv", "userReference, transactionReference, redirectUrl\n", function (err) {
        if (err) throw err;
        for (var ii = 0; ii < count; ii++) {
            var res = results[ii];

            fs.appendFile("redirects.csv", res.userReference + ", " + res.transactionReference + ", " + res.redirectUrl + "\n", function(err) {
                if (err) throw err;
            });
        }
    });
}

start();
