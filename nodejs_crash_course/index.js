const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // // Pure Node and not very efficient
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" }); // write to the headers
  //       res.end(content);
  //     }
  //   );
  // }
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" }); // write to the headers
  //       res.end(content);
  //     }
  //   );
  // }
  // // API page
  // if (req.url === "/api/users") {
  //   // instead of fetching data, use hard-coded data
  //   const users = [
  //     { name: "Bob Smith", age: 40 },
  //     { name: "John Doe", age: 30 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // 1. Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  console.log(filePath);

  // 2. Get the extension of file
  let extname = path.extname(filePath);

  console.log(extname);
  // 3. Initial content type
  let contentType = "text/html";
  // 4. Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  // 5. Read a file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Sucess
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

// (When we deploy it) First to finde a host decided by our server: Environment Variable
// If not found, run on port 5000
const PORT = process.env.PORT || 5000;

// Listen to the port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
