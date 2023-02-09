// connect to the mongoose database

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ivanovandrew:raMIOUeS62vSZ8Dj@cluster0.xbj7nrv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// create item types schema

const ItemTypesSchema = new mongoose.Schema({
  name: String,
  category: String
});

const ItemTypes = mongoose.model('item_types', ItemTypesSchema);

// Retrieve items from the "items" collection
ItemTypes.find({}, function(err, items) {
  if (err) throw err;
  
  // Get the select element from the HTML
  const select = document.getElementById("item-selector");
  
  // Iterate through the items and create option elements
  items.forEach(function(item) {
    const option = document.createElement("option");
    option.value = item._id;
    option.text = item.name;
    select.appendChild(option);
  });
});