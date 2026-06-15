const add = require("./add");
const mathsFunctions = require("./maths");
const os = require("os");
const fs = require("fs");

// console.log("Operating System Info:", os.cpus().length); //Threadpool size is equal to number of CPU cores. That is 8 for this system
// process.env.UV_THREADPOOL_SIZE = 6; //Changing threadpool size to 6
// console.log("Threadpool size changed to: ", process.env.UV_THREADPOOL_SIZE);

// console.log("10 Raised to 3:" + mathsFunctions.power(10, 3));
// console.log("Square root of 10: " + mathsFunctions.root(10));
// // console.log("Log of 1000: " + mathsFunctions.log(1000));

// http = require("node:http");
// listener = function (request, response) {
//   // Send the HTTP header
//   // HTTP Status: 200 : OK
//   // Content Type: text/html
//   response.writeHead(200, { "Content-Type": "text/html" });

//   // Send the response body as "Hello World"
//   response.end('<h2 style="text-align: center;">Hello Node JS</h2>');
// };

// server = http.createServer(listener);
// server.listen(3000);

// // Console will print the message

// console.log("Server running at http://127.0.0.1:3000/");
