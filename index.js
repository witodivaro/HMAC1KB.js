const fs = require("fs");
const path = require("path");
const { SHA256, hexToRaw } = require("./lib/helpers");
const { HMAC } = require("./lib/HMAC");

/**
 * Hey Murphy!
 *
 * Thanks for visiting this repo, it means a lot.
 * Supporting this course for 6+ years deserves lots of respect.
 * It really helps:
 * Your answer for Week 2 helped me SO much with understanding PRFs.
 *
 * Much obliged!
 *
 * Thank you,
 * Wito Divaro
 */

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
