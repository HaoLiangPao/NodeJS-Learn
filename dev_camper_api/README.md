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

## Tips:

1. In express, when editing the response from a server,  `res.send() can send json objects as well, express will automatically convert it`. However, usually we use `res.json()` for json objects. 

