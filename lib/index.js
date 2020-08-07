//
// hashcode as per thread here: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
// Thanks due to hyamamoto / Ante
//
const fs = require("fs");

const hashCode = function (s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

  return h;
};
const functionMap = {};
const outputFile = "functionHashes.txt";
try {
  fs.unlinkSync(outputFile);
} catch (e) {}

module.exports = function ({ types: t }) {
  return {
    name: "print-functions-with-hash-code",
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          if (path.node && path.node.id) {
            const functionName = path.node.id.name;
            const output = functionName + " - " + hashCode(functionName) + "\n";
            // write some data with a base64 encoding
            if (!functionMap[functionName]) {
              functionMap[functionName] = true;
              fs.appendFileSync(outputFile, output);
            }

            //console.log(output);
          }
        },
      },
    },
  };
};
