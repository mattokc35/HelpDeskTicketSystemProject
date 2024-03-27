const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ticketController = require("./controllers/ticketController");

const app = express();
const PORT = process.env.PORT || 4242;

app.use(bodyParser.json());
app.use(cors());

app.use("/tickets", ticketController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
