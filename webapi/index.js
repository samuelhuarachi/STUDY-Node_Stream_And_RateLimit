/*
curl -i \
-X POST \
--data '{"name": "Samuel", "age": 37}' \
-H 'content-type: application/json' \
 localhost:3000
 */

import bodyParser from "body-parser";
import express from "express";
import { createWriteStream } from "node:fs";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
});
const output = createWriteStream("output.ndjson");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(limiter);

app.post("/", async (req, res) => {
    console.log("receivid", req.body);
    output.write(`${JSON.stringify(req.body)}\n`);

    res.send("ok...");
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
