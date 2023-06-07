const fs = require("fs");
const path = require("path");
const readFilesDir = (nameFiles, nameDir) => {
  const contentFiles = {};
  for (const file of nameFiles) {
    const filePath = path.join(__dirname, `${nameDir}`, file);
    contentFiles[file] = fs.readFileSync(filePath);
  }
  return contentFiles;
};
module.exports = readFilesDir;
