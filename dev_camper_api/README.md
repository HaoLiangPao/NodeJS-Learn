# Devcamper API

## Environment Set up



```bash
npm i express dotenv mongoose colors morgan slugify
```

- `express`: web framework

- [`dotenv`](https://github.com/motdotla/dotenv): Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)

- [`morgan`](https://github.com/expressjs/morgan): a third party middleware function working as a logger

- [`colors`](https://github.com/marak/colors.js/): a third party package which can change color and styles of logging message in node.js console

- [`mongoose`](https://mongoosejs.com/): MongoDB object modeling designed to work in an asynchronous environment.

- [`slugify`](https://www.npmjs.com/package/slugify): Change certain fields to a more user-friendly version (**from Name to Slug**)
  
  - ```json
    {
      name:"Devcentral Bootcamp",
      slug:"devcentral-bootcamp"
    }
    ```
  
- [`node-geocoder`](https://www.npmjs.com/package/node-geocoder): Node library for geocoding and reverse geocoding. Can be used as a nodejs library

  - add some environmental variables according to provider of geo infomation and API keys.



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

## Middleware functions:

### async.js







### logger.js







### error.js



---

## Tips:

1. In express, when editing the response from a server,  `res.send() can send json objects as well, express will automatically convert it`. However, usually we use `res.json()` for json objects. 

2. Mongoose model schema:
   1. Slug: a URL friendly string
   2. if extra `key:value` pairs sent within the request body, the mongoose schema will only take account of `key:value` pairs previously set
   
3. Mongoose preset middle ware functions:

   1. ```javascript
      // Create bootcamp slug from the name
      BootcampSchema.pre('save', function (next) {
        console.log('Slugify ran', this.name);
        next();
      })
      ```

   2. `pre`: runs this middleware function before the operation (in this case, before a document is saved into the database)

   3. `function(){}`: does not use an arrow function here since arrow function handles `this` keyword differently
   
4. `populate()` in Mongoose: 

   1. populate()
   2. Virtual:

5. 
