const fs = require("fs");

//sync call
fs.writeFileSync("hello.txt", "Hello Node JSsssss");

// Async call
// fs.writeFile("hello.txt", "Hello Node JS async", (err) => {
//   if (err) {
//     console.error("Error writing to file:", err);
//   }
// });

const res = fs.readFileSync("hello.txt", "utf-8");
console.log("sync", res);

// fs.readFile("Hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//   } else {
//     console.log("async ", data);
//   }
// });

fs.appendFileSync(
  "hello.txt",
  "\nthis text is added by append file sync method",
);

// fs.appendFile(
//   "hello.txt",
//   "\nthis text is added by append file async method",
//   (err) => {
//     if (err) {
//       console.error("Error appending to file:", err);
//     }
//   },
// );

// fs.cpSync("add.js", "add_copy.js");

console.log(fs.statSync("hello.txt"));
