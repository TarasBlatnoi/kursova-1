"use strict";
const http = require("http");
const fs = require("fs");
const PORT = 5000;
const getFilesFromDir = require("./getFilesFromDir");
const readFilesDir = require("./readFilesDir");
const catalog = fs.readFileSync("./Catalog.html", "utf8");
const index = fs.readFileSync("./index.html", "utf8");
const stylesNames = getFilesFromDir("./styles");
const styles = readFilesDir(stylesNames, "styles");
const imagesNames = getFilesFromDir("./images");
const images = readFilesDir(imagesNames, "images");
const fontNames = getFilesFromDir("./fonts");
const fonts = readFilesDir(fontNames, "fonts");
const frontNames = getFilesFromDir("./scripts");
const front = readFilesDir(frontNames, "scripts");
const products = fs.readFileSync("./products.json", "utf8");
const routing = {
  "/": index,
  "/Catalog.html": catalog,
  "/styles/*": styles,
  "/images/*": images,
  "/fonts/*": fonts,
  "/scripts/*": front,
  "/api/v1/products.json": products,
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
    const url = req.url;
    if (url.endsWith(".svg")) {
      res.setHeader("Content-Type", "image/svg+xml");
    } else if (url.endsWith(".png")) {
      res.setHeader("Content-Type", "image/png");
    } else if (url.endsWith(".json")) {
      res.setHeader("Content-Type", "application/json");
    }
    res.end(file || "Not found");
  })
  .listen(PORT);
console.log(`Running server on port ${PORT}`);
