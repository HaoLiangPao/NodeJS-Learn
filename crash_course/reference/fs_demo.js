const fs = require("fs"); // file systems
const path = require("path");

// Create folder
// fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Folder created...");
// });

// Create and write to file (Overwrite whatever in the given path)
// fs.writeFile(
//   path.join(__dirname, "/test", "hello.txt"),
//   "Hello World!",
//   (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("File written to...");
//   }
// );
//
// Append content to a file
// fs.appendFile(
//   path.join(__dirname, "/test", "hello.txt"),
//   "<br> I love Node.js",
//   (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("File written to...");
//   }
// );

// Read file
// fs.readFile(path.join(__dirname, "/test", "hello.txt"), "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// Rename a file
fs.rename(
  path.join(__dirname, "/test", "hello.txt"),
  path.join(__dirname, "/test", "renameHello.txt"),
  (err) => {
    if (err) {
      throw err;
    }
    console.log("File renamed...");
  }
);
