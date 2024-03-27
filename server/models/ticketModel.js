const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongo-db-connection-string";

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("TicketsData").collection("tickets");
}

async function submitTicket(name, email, description) {
  const collection = await connectToDatabase();
  const submissionDate = new Date();
  const result = await collection.insertOne({
    name,
    email,
    description,
    status: "new",
    submissionDate,
  });
  return result.acknowledged;
}

async function getTickets() {
  const collection = await connectToDatabase();
  return collection.find().toArray();
}

async function updateTicketStatus(id, status) {
  const collection = await connectToDatabase();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}

module.exports = { submitTicket, getTickets, updateTicketStatus };
