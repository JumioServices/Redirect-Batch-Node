const request = require("request");
var fs = require("fs");

fs.writeFile("redirect.csv", "userReference, transactionReference, redirectUrl\n", function (err) {
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

for (let ii = 0; ii < 5; ii++) {
    initiate(ii, function(res) {
        fs.appendFile("redirect.csv", res.userReference + ", " + res.transactionReference + ", " + res.redirectUrl + "\n", function(err) {
            if (err) throw err;
        });
    });
}
