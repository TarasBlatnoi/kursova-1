"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 5000;
const getFilesFromDir = require("./getFilesFromDir");
const readFilesDir = require("./readFilesDir");
const index = fs.readFileSync("./index.html", "utf8");
const style = fs.readFileSync("./styles/style.css", "utf8");
const imagesNames = getFilesFromDir("./images");
const images = readFilesDir(imagesNames, "images");
const routing = {
  "/": index,
  "/styles/style.css": style,
  "/images/*": images,
  "/api/v1/login": () => {},
};
const matching = [];
for (const key in routing) {
  if (key.includes("*")) {
    const rx = new RegExp(key.replace("*", "(.*)"));
    const route = routing[key];
    matching.push([rx, route]);
    delete routing[key];
  }
}
const router = (req) => {
  const url = req.url;
  let file = routing[url];
  let params = [];
  if (!file) {
    for (const rx of matching) {
      params = url.match(rx[0]);
      if (params) {
        const fileName = params[1];
        const fileDir = rx[1];
        file = fileDir[fileName];
        break;
      }
    }
  }
  return file;
};

http
  .createServer((req, res) => {
    const file = router(req);

    if (Buffer.isBuffer(file)) {
      res.setHeader("Content-Type", "image/svg+xml");
    }

    res.end(file || "Not found");
  })
  .listen(PORT);

console.log(`Running server on port ${PORT}`);
