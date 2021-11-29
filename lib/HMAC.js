const { SHA256 } = require("./helpers");

/**
 * Get last message block
 * Push it to signed blocks
 * 
 * {
    * Get last signed block
    * Hash it
    * Get previous message block
    * Append hash to message block
    * Push it to signed blocks
* } repeat

    Get last signed block
    Hash it
    Push hash to the signed blocks
 */
class HMAC {
  static sign(blocks) {
    const reversedSignedBlocks = [];

    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];

      if (i === blocks.length - 1) {
        reversedSignedBlocks.push(block);
        continue;
      }

      const lastSignedBlock = reversedSignedBlocks[reversedSignedBlocks.length - 1];
      const lastBlockHash = Buffer.from(SHA256(lastSignedBlock), "hex");
      const currentBlockWithSign = Buffer.concat([block, lastBlockHash]);

      reversedSignedBlocks.push(currentBlockWithSign);
    }

    const firstBlock = reversedSignedBlocks[reversedSignedBlocks.length - 1];
    const firstBlockHash = SHA256(firstBlock);
    reversedSignedBlocks.push(firstBlockHash);

    const signedBlocks = reversedSignedBlocks.reverse();

    return signedBlocks;
  }
}

module.exports = {
  HMAC,
};
