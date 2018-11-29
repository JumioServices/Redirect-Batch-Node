const request = require("request");
var fs = require("fs");
var args = process.argv.slice(2);
var count = args[0];

fs.writeFile("redirects.csv", "userReference, transactionReference, redirectUrl\n", function (err) {
    if (err) throw err;
});

function initiate(userReference, save) {
    var username = process.env.API_TOKEN;
    var password = process.env.API_SECRET;
    var options = {
        url: 'https://netverify.com/api/v4/initiate',
        method: 'POST',
        json: true,
        body: {
            "customerInternalReference": "JUMIOGENERATED",
            "userReference": userReference
        },
        auth: {
            user: username,
            password: password
        },
        headers: {
            "User-Agent" : "SMB Redirect/1.0.0",
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }

    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            save({
                redirectUrl: body.redirectUrl,
                transactionReference: body.transactionReference,
                userReference: userReference
            });
        } else {
            console.log(err);
        }
    });
}

for (let ii = 0; ii < count; ii++) {
    initiate(ii, function(res) {
        fs.appendFile("redirects.csv", res.userReference + ", " + res.transactionReference + ", " + res.redirectUrl + "\n", function(err) {
            if (err) throw err;
            console.log("User " + res.userReference + " link generated.");
        });
    });
}
