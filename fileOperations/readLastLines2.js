const fs = require("fs");

const tail = (filePath, numLines) => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const fileSize = stats.size;
    const fd = fs.openSync(filePath, "r");
    let position = Math.max(0, fileSize - 1024);

    let data = "";
    let lines = [];

    while (position >= 0 && lines.length <= numLines) {
      const buffer = Buffer.alloc(1024);
      const bytesRead = fs.readSync(fd, buffer, 0, 1024, position);
      data = buffer.toString("utf8", 0, bytesRead) + data;
      lines = data.split("\n");

      position -= 1024;
    }
    fs.closeSync(fd); // Close file descriptor
    console.log(lines.slice(-numLines).join("\n")); // Print last N lines
  });
};

tail("file.txt", 10);
