//
// hashcode as per thread here: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
// Thanks due to hyamamoto / Ante
//

module.exports = function ({ types: t }) {
  const fs = require("fs");

  let writeStream = fs.createWriteStream("functionHashes.txt");

  hashCode = function (s) {
    let h;
    for (let i = 0; i < s.length; i++)
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

    return h;
  };

  return {
    name: "print-functions-with-hash-code",
    visitor: {
      Program: {
        exit(path) {
          // close the stream
          writeStream.end();
        },
      },

      FunctionDeclaration: {
        enter(path) {
          output =
            path.node.id.name + " - " + hashCode(path.node.id.name) + "\n";
          // write some data with a base64 encoding
          writeStream.write(output);

          console.log(output);
        },
      },
    },
  };
};
