# Express Crash Course

## Dependencies used

### Add dependency <u>listed in package.json</u> & <u>installed in node_moudules</u>

```bash
npm i -D nodemon
npm i moment express-handlebars uuid
```

- `nodemon` : to monitor `server.js` to resart the server everytime it changes
- `moment`: deal with date formatting
- `uuid`: generate id generator
- `express-handlebars`: render templates

### Create scripts

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index",
    "dev": "nodemon index"
  }
}
```

- `npm run dev` will watch `index.js` file and constantly restart the server
- 

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

1. `res.use()` usually get used when **middleware functions** are included.
2. Usually one of three methods are used in full stack applications
   1. set static folder
   2. render templates
   3. API + frontend frameworks