const http = require("http");

const todos = [
  { id: 1, text: "Todo one" },
  { id: 2, text: "Todo two" },
  { id: 3, text: "Todo Thre" },
];

// Example of 200
// const server = http.createServer((req, res) => {
//   // Set tatusCode
//   res.statusCode = 200;
//   // Set Headers
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("X-Powered-By", "Node.js"); // a non-standard header which usually used to specify what language it use
//   // ??
//   res.write("<h1>Hello!</h1>");
//   res.write("<h2>My name is Hao</h2>");
//   // Sent back data response
//   res.end(
//     JSON.stringify({
//       success: true,
//       data: todos,
//     })
//   );
// });

// Example of 404
// const server = http.createServer((req, res) => {
//   // // Set tatusCode
//   // res.statusCode = 404;
//   // // Set Headers
//   // res.setHeader("Content-Type", "application/json");
//   // res.setHeader("X-Powered-By", "Node.js"); // a non-standard header which usually used to specify what language it use

//   // Clearer way of writing above code
//   res.writeHead(404, {
//     "Content-Type": "application/json",
//     "X-Powered-By": "Node.js",
//   });
//   // Sent back data response
//   res.end(
//     JSON.stringify({
//       success: false,
//       error: "Not Found",
//       data: null,
//     })
//   );
// });

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//     "X-Powered-By": "Node.js",
//   });
//
//   // Get information from request body
//   let body = [];
//   console.log(`------- Logging request --------:`); // request
//   console.log(req);
//   req
//     .on("data", (chunk) => {
//       console.log(`------- Logging chunk --------:`); // chunk
//       console.log(chunk);
//       body.push(chunk);
//     })
//     .on("end", () => {
//       body = Buffer.concat(body);
//       console.log(`------- Logging Buffer --------:`); // Buffer
//       console.log(Buffer);
//       console.log(`------- Logging Buffer.concat(body).toString() --------:`); // Buffer
//       console.log(body.toString());
//     });

//   res.write("<h1>Hello!</h1>");
//   res.write("<h2>My name is Hao</h2>");
//   // Sent back data response
//   res.end(
//     JSON.stringify({
//       success: true,
//       data: todos,
//     })
//   );
// });

// Rewrite above code to try out different HTTP request methods
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Get information from request body
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body);

      let status = 404; // not found by default

      const response = {
        success: false,
        data: null,
        error: null,
      };

      // Simple GET methods handling
      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);
        // Validation
        if (!id || !text) {
          status = 400;
          error = "Please add an id and some text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });
      // Sent back data response
      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
