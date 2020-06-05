const url = require("url");

const myUrl = new URL(
  "http://mywebsite.com:8000/hello.html?id=100&status=active"
);

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.href.toString());

// Host (Domain)
console.log(myUrl.host);
// HostName (does not include the port)
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchParams);

// Add param
myUrl.searchParams.append("abc", "123");
console.log(myUrl.search);
console.log(myUrl.searchParams);

console.log(myUrl.searchParams.keys());

// Loop through the params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
