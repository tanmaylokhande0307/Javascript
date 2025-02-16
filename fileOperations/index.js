const fs = require("fs");
const readline = require("readline");
const Stream = require("stream");

const getLastLine = (fileName, minLength) => {
  let inStream = fs.createReadStream(fileName);
  let outStream = new Stream();
  return new Promise((resolve, reject) => {
    let rl = readline.createInterface(inStream, outStream);

    let lastLine = "";
    rl.on("line", function (line) {
      if (line.length >= minLength) {
        lastLine = line;
      }
    });

    rl.on("error", reject);

    rl.on("close", function () {
      resolve(lastLine);
    });
  });
};

const fileName = "./file.txt";
getLastLine(fileName, 1)
  .then((lastLine) => {
    console.log(lastLine);
  })
  .catch((err) => {
    console.error(err);
  });
