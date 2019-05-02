const request = require('superagent');
var fs = require("fs");
var promises = [];
var results = {};
var args = process.argv.slice(2);

if (args.length < 2) {
    console.log("Usage: node redirect-batch-superagent.js start_count total_count [user_ref_prefix]");
    process.exit();
}

var start_count = args[0];
var total_count = args[1];
var user_ref_prefix = args[2];

if (isNaN(start_count) || isNaN(total_count)) {
    console.log("Err: Argument(s) not integer.");
    process.exit();
}

total_count = Number(start_count) + Number(total_count);
const btoa = Buffer.from(process.env.API_TOKEN + ":" + process.env.API_SECRET).toString('base64');

console.log("Start Count: " + start_count);
console.log("Total Count: " + total_count);
console.log("User Ref Prefix: " + user_ref_prefix);
console.log("Authorization: " + btoa);

async function initiate(count) {
    var customer_id = count;
    if ( typeof user_ref_prefix !== 'undefined' && user_ref_prefix ) {
        customer_id = user_ref_prefix + "__" + count;
    }

    var res = await request.post('https://netverify.com/api/v4/initiate')
        .set('Authorization', 'Basic ' + btoa)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('User-Agent', 'Jumio Redirect/1.0')
        .send(
            {
                customerInternalReference: 'Jumio Redirect',
                userReference: customer_id
            }
        )
        ;
    return {
        userReference: customer_id,
        redirectUrl: res.body.redirectUrl,
        transactionReference: res.body.transactionReference
    };
}

async function loop() {
    for (var ii = start_count; ii < total_count; ii++) {
        var res = await initiate(ii);
        console.log(res.userReference + " link successfully initiated.");
        results[ii] = res;
    }
}

async function start() {
    await loop();

    fs.writeFile("redirects.csv", "userReference, transactionReference, redirectUrl\n", function (err) {
        if (err) {
            console.log("Err: " + err);
            throw err;
        }
        for (var ii = start_count; ii < total_count; ii++) {
            var res = results[ii];

            fs.appendFile("redirects.csv", res.userReference + ", " + res.transactionReference + ", " + res.redirectUrl + "\n", function(err) {
                if (err) {
                    console.log("Err: " + err);
                    throw err;
                }
            });
        }
    });
}

start();
