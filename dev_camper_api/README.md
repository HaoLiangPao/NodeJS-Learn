# Devcamper API

## Environment Set up



```bash
npm i express dotenv
```

- `express`: web framework
- [`dotenv`](https://github.com/motdotla/dotenv): allows us to create environment files and place it into a config file

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

