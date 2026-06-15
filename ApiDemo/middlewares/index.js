const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `Request: ${new Date().toISOString()} : ${req.method}: ${req.path}\n`,
      (err) => {
        if (err) {
          console.log("Error writing to log file", err);
        }
        next();
      },
    );
  };
}

module.exports = {
  logReqRes,
};
