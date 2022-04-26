const express = require("express");
const app = express();
const port = 3000;

const apollo = require("./apollo");

app.use(express.json());
app.use(apollo);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
