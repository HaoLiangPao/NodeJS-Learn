const os = require("os"); // operating system library

// Platform
console.log(os.platform());

// CUP Arch
console.log(os.arch());

// CUP Core Info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Home dir
console.log(os.homedir());

// Uptime (default in seconds, now set in days)
console.log(os.uptime() / 60 / 60 / 24);
