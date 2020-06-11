# Devcamper API

## Environment Set up



```bash
npm i express dotenv mongoose colors morgan
```

- `express`: web framework
- [`dotenv`](https://github.com/motdotla/dotenv): allows us to create environment files and place it into a config file
- [`morgan`](https://github.com/expressjs/morgan): a third party middleware function working as a logger
- [`colors`](https://github.com/marak/colors.js/): a third party package which can change color and styles of logging message in node.js console
- [`mongoose`](https://mongoosejs.com/): MongoDB object modeling designed to work in an asynchronous environment.

```bash
npm i -D nodemon
```

---

## Route define

1. Create **routes** in **seperate folder** and imported them back to `server.js`

   ```javascript
   // Route files
   const bootcamps = require("./routes/bootcamps");
   ```

2. Create **controllers** for **each route** for specific action implementation

3. Deconstruct API handling functions in **route files** from **controller files**.

   ```javascript
   const {
     getBootCamps,
     getBootCamp,
     createBootCamp,
     updateBootCamp,
     deleteBootCamp,
   } = require("../controllers/bootcamps");
   ```

   *Where `getBootCamps`, `getBootCamp` ... are specific action implementations*

4. Pdf



---

## Tips:

1. In express, when editing the response from a server,  `res.send() can send json objects as well, express will automatically convert it`. However, usually we use `res.json()` for json objects. 
2. Mongoose model schema:
   1. Slug: a URL friendly string
   2. if extra `key:value` pairs sent within the request body, the mongoose schema will only take account of `key:value` pairs previously set

