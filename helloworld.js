
const express = require('express')
const redis = require("redis");
const rcli = redis.createClient({
    url: process.env.REDIS_URL
});

rcli.on("error", function (error) {
    console.error(error);
});


const app = express()
const port = 8080

app.get('/', (req, res) => {
    rcli.INCR("hellocounter", (err, val) => {
        if (err) {
            return res.status(500)
        }

        res.send('Hello World! ' + val)
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
