//now let's prepare colors

const colors = [
    {r: 0xe4, g: 0x3f, b: 0x00},
    {r: 0xfa, g: 0xe4, b: 0x10},
    {r: 0x55, g: 0xcc, b: 0x3b},
    {r: 0x09, g: 0xad, b: 0xff},
    {r: 0x6b, g: 0x0e, b: 0xfd},
    {r: 0xe7, g: 0x0d, b: 0x86},
    {r: 0xe4, g: 0x3f, b: 0x00}
];
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('color-wheel').addEventListener('click', function(e) {
        var rect = e.target.getBoundingClientRect();
        //Вычисляем координаты так, как будто бы у круга радиус 1
        var x = 2 * (e.clientX - rect.left) / (rect.right - rect.left) - 1;
        var y = 1 - 2 * (e.clientY - rect.top) / (rect.bottom - rect.top);
        //Вычисляем угол в градусах с 0 вверху и по часовой стрелке как ожидается в css conic gradient
        var a = ((Math.PI / 2 - Math.atan2(y, x)) / Math.PI * 180);
        if (a < 0) a += 360;
        
        /*var aTriadicSecond = ((Math.PI / 2 - Math.atan2(y, x)) / Math.PI * 180);
        if (aTriadicSecond < 0) aTriadicSecond += 480;

        var aTriadicThird = ((Math.PI / 2 - Math.atan2(y, x)) / Math.PI * 180);
        if (aTriadicThird < 0) aTriadicThird += 240;*/

        //Маппим угол между 0 и цифрой цветов в градиенте минус один
        var aOriginal = a;
        a = a / 360 * (colors.length - 1);  //минус один потому что последний айтим в 360° что то же, что и 0°


        //Вычисляем комплиментарные (триадные) цвета
        var aTriadicSecond = (aOriginal + 120)
        var aTriadicThird = (aOriginal + 240)

        if (aTriadicSecond > 360) aTriadicSecond -= 360;
        if (aTriadicThird > 360) aTriadicThird -= 360;

        aTriadicSecond = aTriadicSecond / 360 * (colors.length - 1);
        aTriadicThird = aTriadicThird / 360 * (colors.length - 1);

        //Вычисляем аналоговые цвета
        var aAnalogousSecond = (aOriginal - 30)
        var aAnalogousThird = (aOriginal + 30)

        if (aAnalogousSecond < 0) aAnalogousSecond += 360;
        if (aAnalogousThird > 360) aAnalogousThird -= 360;

        aAnalogousSecond = aAnalogousSecond / 360 * (colors.length - 1);
        aAnalogousThird = aAnalogousThird / 360 * (colors.length - 1);
        

        //Вычисляем цвета для интерполяции
        var a0 = Math.floor(a) % colors.length;
        var a1 = (a0 + 1) % colors.length;
        var c0 = colors[a0];
        var c1 = colors[a1];

        var aTriadicSecond0 = Math.floor(aTriadicSecond) % colors.length;
        var aTriadicSecond1 = (aTriadicSecond0 + 1) % colors.length;
        var cTriadicSecond0 = colors[aTriadicSecond0];
        var cTriadicSecond1 = colors[aTriadicSecond1];

        var aTriadicThird0 = Math.floor(aTriadicThird) % colors.length;
        var aTriadicThird1 = (aTriadicThird0 + 1) % colors.length;
        var cTriadicThird0 = colors[aTriadicThird0];
        var cTriadicThird1 = colors[aTriadicThird1];

        var aAnalogousSecond0 = Math.floor(aAnalogousSecond) % colors.length;
        var aAnalogousSecond1 = (aAnalogousSecond0 + 1) % colors.length;
        var cAnalogousSecond0 = colors[aAnalogousSecond0];
        var cAnalogousSecond1 = colors[aAnalogousSecond1];

        var aAnalogousThird0 = Math.floor(aAnalogousThird) % colors.length;
        var aAnalogousThird1 = (aAnalogousThird0 + 1) % colors.length;
        var cAnalogousThird0 = colors[aAnalogousThird0];
        var cAnalogousThird1 = colors[aAnalogousThird1];

        //Вычисляем веса и интерполируем цвет
        var a1w = a - Math.floor(a);
        var a0w = 1 - a1w;
        var color = {
            r: c0.r * a0w + c1.r * a1w,
            g: c0.g * a0w + c1.g * a1w,
            b: c0.b * a0w + c1.b * a1w
        };

        var colorMonochromaticSecond = {
            r: c0.r * a0w + c1.r * a1w,
            g: c0.g * a0w + c1.g * a1w,
            b: c0.b * a0w + c1.b * a1w
        };

        var colorMonochromaticThird = {
            r: c0.r * a0w + c1.r * a1w,
            g: c0.g * a0w + c1.g * a1w,
            b: c0.b * a0w + c1.b * a1w
        };

        var aTriadicSecond1w = aTriadicSecond - Math.floor(aTriadicSecond);
        var aTriadicSecond0w = 1 - aTriadicSecond1w;
        var colorTriadicSecond = {
            r: cTriadicSecond0.r * aTriadicSecond0w + cTriadicSecond1.r * aTriadicSecond1w,
            g: cTriadicSecond0.g * aTriadicSecond0w + cTriadicSecond1.g * aTriadicSecond1w,
            b: cTriadicSecond0.b * aTriadicSecond0w + cTriadicSecond1.b * aTriadicSecond1w
        };

        var aTriadicThird1w = aTriadicThird - Math.floor(aTriadicThird);
        var aTriadicThird0w = 1 - aTriadicThird1w;
        var colorTriadicThird = {
            r: cTriadicThird0.r * aTriadicThird0w + cTriadicThird1.r * aTriadicThird1w,
            g: cTriadicThird0.g * aTriadicThird0w + cTriadicThird1.g * aTriadicThird1w,
            b: cTriadicThird0.b * aTriadicThird0w + cTriadicThird1.b * aTriadicThird1w
        };

        var aAnalogousSecond1w = aAnalogousSecond - Math.floor(aAnalogousSecond);
        var aAnalogousSecond0w = 1 - aAnalogousSecond1w;
        var colorAnalogousSecond = {
            r: cAnalogousSecond0.r * aAnalogousSecond0w + cAnalogousSecond1.r * aAnalogousSecond1w,
            g: cAnalogousSecond0.g * aAnalogousSecond0w + cAnalogousSecond1.g * aAnalogousSecond1w,
            b: cAnalogousSecond0.b * aAnalogousSecond0w + cAnalogousSecond1.b * aAnalogousSecond1w
        };

        var aAnalogousThird1w = aAnalogousThird - Math.floor(aAnalogousThird);
        var aAnalogousThird0w = 1 - aAnalogousThird1w;
        var colorAnalogousThird = {
            r: cAnalogousThird0.r * aAnalogousThird0w + cAnalogousThird1.r * aAnalogousThird1w,
            g: cAnalogousThird0.g * aAnalogousThird0w + cAnalogousThird1.g * aAnalogousThird1w,
            b: cAnalogousThird0.b * aAnalogousThird0w + cAnalogousThird1.b * aAnalogousThird1w
        };
        
        //Вычисляем радиус
        var r = Math.sqrt(x * x + y * y);
        if (r > 1) r = 1;

        var r1 = r/3;
        var r2 = r/3*2;

        //Вычисляем вес белого, интерполируем и округляем до целого
        var cw = r < 0.8 ? (r / 0.8) : 1;
        var ww = 1 - cw;

        var cw1 = r1 < 0.8 ? (r1 / 0.8) : 1;
        var ww1 = 1 - cw1;

        var cw2 = r2 < 0.8 ? (r2 / 0.8) : 1;
        var ww2 = 1 - cw2;

        color.r = Math.round(color.r * cw + 255 * ww);
        color.g = Math.round(color.g * cw + 255 * ww);
        color.b = Math.round(color.b * cw + 255 * ww);

        colorTriadicSecond.r = Math.round(colorTriadicSecond.r * cw + 255 * ww);
        colorTriadicSecond.g = Math.round(colorTriadicSecond.g * cw + 255 * ww);
        colorTriadicSecond.b = Math.round(colorTriadicSecond.b * cw + 255 * ww);

        colorTriadicThird.r = Math.round(colorTriadicThird.r * cw + 255 * ww);
        colorTriadicThird.g = Math.round(colorTriadicThird.g * cw + 255 * ww);
        colorTriadicThird.b = Math.round(colorTriadicThird.b * cw + 255 * ww);

        colorAnalogousSecond.r = Math.round(colorAnalogousSecond.r * cw + 255 * ww);
        colorAnalogousSecond.g = Math.round(colorAnalogousSecond.g * cw + 255 * ww);
        colorAnalogousSecond.b = Math.round(colorAnalogousSecond.b * cw + 255 * ww);

        colorAnalogousThird.r = Math.round(colorAnalogousThird.r * cw + 255 * ww);
        colorAnalogousThird.g = Math.round(colorAnalogousThird.g * cw + 255 * ww);
        colorAnalogousThird.b = Math.round(colorAnalogousThird.b * cw + 255 * ww);

        colorMonochromaticSecond.r = Math.round(color.r * cw1 + 255 * ww1);
        colorMonochromaticSecond.g = Math.round(color.g * cw1 + 255 * ww1);
        colorMonochromaticSecond.b = Math.round(color.b * cw1 + 255 * ww1);

        colorMonochromaticThird.r = Math.round(color.r * cw2 + 255 * ww2);
        colorMonochromaticThird.g = Math.round(color.g * cw2 + 255 * ww2);
        colorMonochromaticThird.b = Math.round(color.b * cw2 + 255 * ww2);
       
        //Вычисляем HEX код и применяем его
        var xColor = rgbToHex(color.r, color.g, color.b);
        
        document.getElementById('color').innerText = xColor;
        document.getElementById('color').style.backgroundColor = xColor;
        document.getElementById('colorTriadicFirst').innerText = xColor;
        document.getElementById('colorTriadicFirst').style.backgroundColor = xColor;
        document.getElementById('colorAnalogousFirst').innerText = xColor;
        document.getElementById('colorAnalogousFirst').style.backgroundColor = xColor;
        document.getElementById('colorMonochromaticFirst').innerText = xColor;
        document.getElementById('colorMonochromaticFirst').style.backgroundColor = xColor;

        var xColorTriadicSecond = rgbToHex(colorTriadicSecond.r, colorTriadicSecond.g, colorTriadicSecond.b);
        document.getElementById('colorTriadicSecond').innerText = xColorTriadicSecond;
        document.getElementById('colorTriadicSecond').style.backgroundColor = xColorTriadicSecond;
        
        var xColorTriadicThird = rgbToHex(colorTriadicThird.r, colorTriadicThird.g, colorTriadicThird.b);
        document.getElementById('colorTriadicThird').innerText = xColorTriadicThird;
        document.getElementById('colorTriadicThird').style.backgroundColor = xColorTriadicThird;

        var xColorAnalogousSecond = rgbToHex(colorAnalogousSecond.r, colorAnalogousSecond.g, colorAnalogousSecond.b);
        document.getElementById('colorAnalogousSecond').innerText = xColorAnalogousSecond;
        document.getElementById('colorAnalogousSecond').style.backgroundColor = xColorAnalogousSecond;

        var xColorAnalogousThird = rgbToHex(colorAnalogousThird.r, colorAnalogousThird.g, colorAnalogousThird.b);
        document.getElementById('colorAnalogousThird').innerText = xColorAnalogousThird;
        document.getElementById('colorAnalogousThird').style.backgroundColor = xColorAnalogousThird;

        var xColorMonochromaticSecond = rgbToHex(colorMonochromaticSecond.r, colorMonochromaticSecond.g, colorMonochromaticSecond.b);
        document.getElementById('colorMonochromaticSecond').innerText = xColorMonochromaticSecond;
        document.getElementById('colorMonochromaticSecond').style.backgroundColor = xColorMonochromaticSecond;

        var xColorMonochromaticThird = rgbToHex(colorMonochromaticThird.r, colorMonochromaticThird.g, colorMonochromaticThird.b);
        document.getElementById('colorMonochromaticThird').innerText = xColorMonochromaticThird;
        document.getElementById('colorMonochromaticThird').style.backgroundColor = xColorMonochromaticThird;
    });
});

//place a dot on selected place

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// let's generate 99 random items

function randBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

var item = {
    itemBrand: "Rick Owens",
    itemType: "Pants",
    itemColor: "#ffffff",
    itemName: function () {
        return this.itemBrand + " " + this.itemColor + " " + this.itemType;
    }
}

//prepare color converters

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

//end of color converters

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
    //document.body.style.backgroundColor = itemObject.itemColor;
}

// since "clothes" is an object (not an array) we have do Object.keys()
const generatedHtml = Object.keys(clothes).reduce((accum, currKey) => accum +
    `<div class="clothingItem" style="background-color:${clothes[currKey].itemColor}">
        <div class="number">${currKey}</div>
        <div class="itemBrand">${clothes[currKey].itemBrand}</div>
        <div class="itemType">${clothes[currKey].itemType}</div>
        <div class="itemColor">${clothes[currKey].itemColor}</div>
    
    </div>`, '');
  
// <div class="itemName">${clothes[currKey].itemName}</div>

  document.getElementById('itemsList').innerHTML = generatedHtml;