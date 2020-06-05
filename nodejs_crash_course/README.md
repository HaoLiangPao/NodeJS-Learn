# NodeJS Crash Course

## Dependencies used

### Add dependency <u>listed in package.json</u> && <u>installed in node_moudules</u>

```bash
npm install uuid
npm install --save-dev nodemon
npm install -D nodemon
```

- #1: A npm command which add `uuid` as a dependency, 
- #2 & #3: Two same npm command which add `nodemon` as a development dependency 

---

## Core Modules References

| module           | import                                    | Function                    |
| ---------------- | ----------------------------------------- | --------------------------- |
| Path             | `const path = require('path');`           | operate with file/dir path  |
| Operating system | `const os = require('os');`               | operate with machine info   |
| File system      | `const fs = require('fs');`               | operate with file systems   |
| Url              | `const url = require("url");`             | operate with url formats    |
| Event            | `const EventEmitter = require("events");` | Event loop                  |
| Http             | `const http = require("http");`           | dealing with http req & res |





---

## Deployment in Heroku

we deploy our app with git and heroku

1.Install [Heroku command line interface (CLI)](https://devcenter.heroku.com/articles/heroku-cli), so that we can login and deploy app via heroku in terminal

```bash
heroku --version
git add .
git commit -m"Ready to deploy with heroku"
heroku login
...
heroku create
heroku git:remote -a tranquil-waters-53953
git push heroku master
```

- #1 Check if heroku CLI is successfully installed
- #2 Add all changes to local repository
- #3 Commit the changes to local repository
- #4 Login heroku
- #5 Create heroku application
- #6 Get *randomly generated* application domain from heroku personal dashboard (<u>I provide an example above</u>)
- #7 Push the local repository to heroku master to deploy the application on their server

---

## Tips

1. Everything we installed via npm **all** comes from [npmjs.org](https://www.npmjs.com/)

2. NodeJS allows us to run JS code in terminal by run `node` in terminal

3. Every modules in Node.js is wrapped by a wrapper function. As a result, we have access to `exports`, `require`, `module`, `__filename`, `__dirname`

   ```javascript
   // Module Wrapper Function: everything is wrapped in a function like this
   (function (exports, require, module, __filename, __dirname) {});
   ```

4. Pdf