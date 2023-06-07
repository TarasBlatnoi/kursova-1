const fs = require("fs");
const path = require("path");
const getFilesFromDir = (dirPath) => {
  try {
    const contents = fs.readdirSync(dirPath);
    const files = [];
    for (const content of contents) {
      const contentPath = path.join(dirPath, content);
      const stats = fs.statSync(contentPath);
      if (stats.isFile()) {
        files.push(content);
      }
    }
    return files;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

module.exports = getFilesFromDir;
