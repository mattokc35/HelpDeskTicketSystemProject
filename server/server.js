const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 4242;
app.use(bodyParser.json());
app.use(cors());

const uri = "your-mongodb-connection-string-here";

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("TicketsData").collection("tickets");
}

// Submit a new ticket
app.post("/tickets", async (req, res) => {
  const { name, email, description } = req.body;
  const collection = await connectToDatabase();
  const result = await collection.insertOne({
    name,
    email,
    description,
    status: "new",
  });
  res.json(result.acknowledged);
});

// Get tickets
app.get("/tickets", async (req, res) => {
  const collection = await connectToDatabase();
  const tickets = await collection.find().toArray();
  res.json(tickets);
});

// Update ticket status
app.put("/tickets/:id/status", async (req, res) => {
  const { status } = req.body;
  const collection = await connectToDatabase();
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status } }
  );
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
