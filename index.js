const fs = require("fs");
const path = require("path");
const { SHA256, hexToRaw } = require("./lib/helpers");
const { HMAC } = require("./lib/HMAC");

const filePath = path.resolve(__dirname, "files", "DAN_BONEH.mp4");
const readStream = fs.createReadStream(filePath, { highWaterMark: 1024 });

const fileChunks = [];

readStream.on("data", (chunk) => {
  fileChunks.push(chunk);
});

readStream.on("end", () => {
  const signedBlocks = HMAC.sign(fileChunks);
  console.log(signedBlocks[0]);
});
