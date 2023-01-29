const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//your static site folder name
app.use(express.static("nostylist-app"));

app.use('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/nostylist-app/index.html'));
});

app.get('/mvp', (req,res) => {
  res.send("this is mvp page");
});

app.listen(port, () => {
    console.log("server is running on "+port);
});

//prepare clothes array to push
function randBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

var brands = ["Stone Island", "Rick Owens", "Raf Simons", "A-Cold-Wall"];
var itemTypes = ["Shirt","Pants","Boots"];

var clothes = [];

for  (var i = 1; i < 100; i++) {
    var itemObject = {
        itemBrand: brands[randBetween(0,3)],
        itemType: itemTypes[randBetween(0,2)],
        itemColor: ConvertRGBtoHex(randBetween(0,255),randBetween(0,255),randBetween(0,255))
    };
    clothes.push(itemObject);
}

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
  ItemTypes.forEach(function(item) {
    const option = document.createElement("option");
    option.value = item._id;
    option.text = item.name;
    select.appendChild(option);
  });
});

//populate items 

/*
const Blazer = new ItemTypes({name: "Blazer", category:"Clothing"});
Blazer.save();

const BomberJacket = new ItemTypes({name: "Bomber Jacket", category:"Clothing"});
BomberJacket.save();

const BoxerShorts = new ItemTypes({name: "Boxer Shorts", category:"Clothing"});
BoxerShorts.save();

const Cardigan = new ItemTypes({name: "Cardigan", category:"Clothing"});
Cardigan.save();

const CargoPants = new ItemTypes({name: "Cargo Pants", category:"Clothing"});
CargoPants.save();

const CasualJacket = new ItemTypes({name: "Casual Jacket", category:"Clothing"});
CasualJacket.save();

const CasualTrousers = new ItemTypes({name: "Casual Trousers", category:"Clothing"});
CasualTrousers.save();

const Chinos = new ItemTypes({name: "Chinos", category:"Clothing"});
Chinos.save();

const CoachJacket = new ItemTypes({name: "Coach Jacket", category:"Clothing"});
CoachJacket.save();

const DenimJacket = new ItemTypes({name: "Denim Jacket", category:"Clothing"});
DenimJacket.save();

const Fleece = new ItemTypes({name: "Fleece", category:"Clothing"});
Fleece.save();

const Gilet = new ItemTypes({name: "Gilet", category:"Clothing"});
Gilet.save();

const Hoodie = new ItemTypes({name: "Hoodie", category:"Clothing"});
Hoodie.save();

const Coat = new ItemTypes({name: "Coat", category:"Clothing"});
Coat.save();

const Jeans = new ItemTypes({name: "Jeans", category:"Clothing"});
Jeans.save();

const LeatherJacket = new ItemTypes({name: "Leather Jacket", category:"Clothing"});
LeatherJacket.save();

const LongSleeve = new ItemTypes({name: "Long Sleeve", category:"Clothing"});
LongSleeve.save();

const Parka = new ItemTypes({name: "Parka", category:"Clothing"});
Parka.save();

const Polo = new ItemTypes({name: "Polo", category:"Clothing"});
Polo.save();

const PufferJacket = new ItemTypes({name: "Puffer Jacket", category:"Clothing"});
PufferJacket.save();

const Shirt = new ItemTypes({name: "Shirt", category:"Clothing"});
Shirt.save();

const ShortSleeveShirt = new ItemTypes({name: "Short Sleeve Shirt", category:"Clothing"});
ShortSleeveShirt.save();

const Shorts = new ItemTypes({name: "Shorts", category:"Clothing"});
Shorts.save();

const SweatPants = new ItemTypes({name: "Sweat Pants", category:"Clothing"});
SweatPants.save();

const Sweater = new ItemTypes({name: "Sweater", category:"Clothing"});
Sweater.save();

const TShirt = new ItemTypes({name: "T-Shirt", category:"Clothing"});
TShirt.save();

const Trousers = new ItemTypes({name: "Trousers", category:"Clothing"});
Trousers.save();

const Boots = new ItemTypes({name: "Boots", category:"Footwear"});
Boots.save();

const Brogues = new ItemTypes({name: "Brogues", category:"Footwear"});
Brogues.save();

const CasualShoes = new ItemTypes({name: "Casual Shoes", category:"Footwear"});
CasualShoes.save();

const ChelseaBoots = new ItemTypes({name: "Chelsea Boots", category:"Footwear"});
ChelseaBoots.save();

const DerbyShoes = new ItemTypes({name: "Derby Shoes", category:"Footwear"});
DerbyShoes.save();

const DesertBoots = new ItemTypes({name: "Desert Boots", category:"Footwear"});
DesertBoots.save();

const LaceUpBoots = new ItemTypes({name: "Lace-Up Boots", category:"Footwear"});
LaceUpBoots.save();

const Loafers = new ItemTypes({name: "Loafers", category:"Footwear"});
Loafers.save();

const Shoes = new ItemTypes({name: "Shoes", category:"Footwear"});
Shoes.save();

const Sneakers = new ItemTypes({name: "Sneakers", category:"Footwear"});
Sneakers.save();
*/