const fs = require("fs");

function tail(filepath, numLines = 10) {
  const stream = fs.createReadStream(filepath, {
    encoding: "utf-8",
    highWaterMark: 1024,
    // start,end    
  });

  let data = ""
  let lines = []


  stream.on("data",(chunk) => {
    data = data + chunk
    lines = data.split("\n")
    if(lines.length > numLines){
        stream.destroy()
    }
  })

  stream.on("close",()=>{
    console.log(lines.slice(-numLines))
  })
}

// Example usage
tail("file.txt", 1);
