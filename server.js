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