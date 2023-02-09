// connect to the mongoose database

import { set, connect, connection as _connection, Schema, model } from 'mongoose';

set('strictQuery', true);

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://ivanovandrew:raMIOUeS62vSZ8Dj@cluster0.xbj7nrv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = _connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// create item types schema

const ItemTypesSchema = new Schema({
  name: String,
  category: String
});

const ItemTypes = model('item_types', ItemTypesSchema);

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