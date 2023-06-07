// const url = "/images/*";
// rx = new RegExp(url.replace("*", "(.*)"));
// console.log(rx);
// const urlexample = "/images/terabade";
// const match = urlexample.match(rx);
// const element = match[1];
// console.log(match);
// console.log(element);
const object = {
  a: 10,
  b: 20,
  c: 30,
};
for (const elements in object) {
  console.log(elements);
}
const a = "a";
console.log(object[`${a}`]);
Taras = { a: 10, b: 20 };
const routing = {
  "/": "Tarsfsas",
  "/styles/style.css": "radf",
  "/images/*": Taras,
};
console.log(routing["/images/*"]);
