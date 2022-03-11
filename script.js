//под "объектом описывающим X" буду подразумевать объект класса X
//Tasks 1
//1
/*
class Car{
    constructor(manufacturer, model, year, velocity){
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
        this.velocity = velocity;
    }
    toString(){
        return `${this.manufacturer} ${this.model} ${this.year}; Average speed: ${this.velocity} km/h`;
    }
    timeToRide(distance){
        let perfectTime = distance/this.velocity;
            let humanFactor = Math.floor(perfectTime/4);
            if(perfectTime%4==0){
                humanFactor--;
            }
        return perfectTime+humanFactor;
    }
}
let carPrototype = new Car("Toyoya", "Sprinter Trueno AE86", 1986, 170);
console.log(carPrototype.toString());
console.log(carPrototype.timeToRide(170));
console.log(carPrototype.timeToRide(340));
console.log(carPrototype.timeToRide(510));
console.log(carPrototype.timeToRide(680));
console.log(carPrototype.timeToRide(681));
console.log(carPrototype.timeToRide(850));
*/

//2
/*
Math.gcd = (x, y)=>{
    if(!y){
        return x;
    }
    return Math.gcd(y, x%y);
}
Math.lcm = (x,y)=>{
    return x*y/Math.gcd(x,y);
}
class Decimal{
    constructor(numerator, denominator){
        if(!(typeof numerator === "number") || !(typeof denominator === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!Number.isInteger(numerator) || !Number.isInteger(denominator)){
            throw new TypeError("Wrong type!");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.reduceFraction();
    }
    reduceFraction(){
        let gcdLocal = Math.gcd(this.numerator, this.denominator);
        this.numerator/=gcdLocal;
        this.denominator/=gcdLocal;
    }
    increaseFraction(fraction){
        if(fraction%this.denominator!=0){
            throw Error("Unable to increase to this fraction");
        }
        let increaseValue = fraction/this.denominator;
        this.numerator*=increaseValue;
        this.denominator=fraction;
    }
    reciprocal(){
        return new Decimal(this.denominator, this.numerator);
    }
    add(dec2){
        if(!(dec2 instanceof Decimal)){
            throw new TypeError("Wrong type!");
        }
        let lcmLocal = Math.lcm(this.denominator, dec2.denominator);
        this.increaseFraction(lcmLocal);
        dec2.increaseFraction(lcmLocal);
        let res = new Decimal(this.numerator+dec2.numerator, lcmLocal);
        this.reduceFraction();
        dec2.reduceFraction();
        res.reduceFraction();
        return res;
    }
    substract(dec2){
        if(!(dec2 instanceof Decimal)){
            throw new TypeError("Wrong type!");
        }
        let lcmLocal = Math.lcm(this.denominator, dec2.denominator);
        this.increaseFraction(lcmLocal);
        dec2.increaseFraction(lcmLocal);
        let res = new Decimal(this.numerator-dec2.numerator, lcmLocal);
        this.reduceFraction();
        dec2.reduceFraction();
        res.reduceFraction();
        return res;
    }
    multiply(dec2){
        if(!(dec2 instanceof Decimal)){
            throw new TypeError("Wrong type!");
        }
        let res = new Decimal(this.numerator*dec2.numerator, this.denominator*dec2.denominator);
        res.reduceFraction();
        return res;
    }
    divide(dec2){
        if(!(dec2 instanceof Decimal)){
            throw new TypeError("Wrong type!");
        }
        return this.multiply(dec2.reciprocal());
    }
    toNumber(){
        return this.numerator/this.denominator;
    }
    toString(){
        return this.denominator==1?this.numerator.toString():`${this.numerator}/${this.denominator}`;
    }
    static fromString(str){
        if(!(typeof str === "string")){
            throw new TypeError("Wrong type!");
        }
        let [num, denum] = str.split('/').map(Number);
        return new Decimal(num, denum);
    }
}
let deci1 = new Decimal(2, 6);
let deci2 = Decimal.fromString("1/6");
console.log(deci1.toString());
console.log(deci2.toString());
console.log(deci1.toNumber());
console.log(deci2.toNumber());
console.log(deci1.add(deci2).toString());
console.log(deci1.substract(deci2).toString());
console.log(deci1.multiply(deci2).toString());
console.log(deci1.divide(deci2).toString());
*/

//3
/*
class TimeSpan{
    #hh;
    #mm;
    #ss;
    constructor(hh, mm, ss){
        if(!(typeof hh === "number") || !(typeof mm === "number") || !(typeof ss === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!Number.isInteger(hh) || !Number.isInteger(mm) || !Number.isInteger(ss)){
            throw new TypeError("Wrong type!");
        }
        this.#hh = hh;
        this.#mm = mm;
        this.#ss = ss;
        this.#normalize();
    }
    #normalize(){
        if(this.#ss < 0 || this.#ss >= 60){
            let extraMM = Math.floor(this.#ss/60);
            this.#ss -= extraMM*60;
            this.#mm += extraMM;
        }
        if(this.#mm < 0 || this.#mm >= 60){
            let extraHH = Math.floor(this.#mm/60);
            this.#mm -= extraHH*60;
            this.#hh += extraHH;
        }
        if(this.#hh < 0 || this.#hh > 24){
            let extraDay = Math.floor(this.#hh/24);
            this.#hh -= extraDay*24;
        }
    }
    toString(){
        let str = "";
        if(this.#hh<10){
            str+="0";
        }
        str+=this.#hh;
        str+=":";
        if(this.#mm<10){
            str+="0";
        }
        str+=this.#mm;
        str+=":";
        if(this.#ss<10){
            str+="0";
        }
        str+=this.#ss;
        return str;
    }
    addSeconds(seconds){
        if(!(typeof seconds === "number")){
            throw new TypeError("Wrong type!");
        }
        this.#ss+=seconds;
        this.#normalize();
    }
    addMinutes(minutes){
        if(!(typeof minutes === "number")){
            throw new TypeError("Wrong type!");
        }
        this.#mm+=minutes;
        this.#normalize();
    }
    addHours(hours){
        if(!(typeof hours === "number")){
            throw new TypeError("Wrong type!");
        }
        this.#hh+=hours;
        this.#normalize();
    }
}
let timeSpan1 = new TimeSpan(-123, 564, 61);
console.log(timeSpan1.toString()); //06:25:01
timeSpan1.addSeconds(60);
console.log(timeSpan1.toString()); //06:26:01
timeSpan1.addMinutes(60);
console.log(timeSpan1.toString()); //07:26:01
timeSpan1.addHours(60);
console.log(timeSpan1.toString()); //19:26:01
*/








//Tasks 2
//1
/*
class Product{
    constructor(title, quantity, isBought){
        if(!(typeof title === "string")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof quantity === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof isBought === "boolean")){
            throw new TypeError("Wrong type!");
        }
        if(!Number.isInteger(quantity)){
            throw new TypeError("Wrong type!");
        }
        if(quantity<0){
            throw new TypeError("Quantity must be more than 0!");
        }
        this.title = title;
        this.quantity = quantity;
        this.isBought = isBought;
    }
    static compare(prod1, prod2){
        if(!(prod1 instanceof Product)){
            throw new TypeError("Wrong type!");
        }
        if(!(prod2 instanceof Product)){
            throw new TypeError("Wrong type!");
        }
        if(prod1.isBought === prod2.isBought){
            return 0;
        }
        return prod1.isBought ? 1 : -1;
    }
    compareWith(prod2){
        return Product.compare(this, prod2);
    }
    buy(){
        this.isBought = true;
    }
    toString(){
        return `${this.title}; ${this.quantity} qty.; ${this.isBought?"Bought":"Not bought"}`; 
    }
}
class ProductList{
    constructor(products){
        this.list = new Array();
        for (const item of products) {
            this.add(item);
        }
        this.#sort();
    }
    add(product){
        if(!(product instanceof Product)){
            throw new TypeError();
        }
        let index = this.list.findIndex(x=>x.title===product.title);
        if(index===-1){
            this.list.push(new Product(product.title, 0, true));
            index = this.list.length-1;
        }
        this.list[index].quantity += product.quantity;
        this.list[index].isBought = this.list[index].isBought && product.isBought;
    }
    #sort(){
        this.list.sort(Product.compare);
    }
    buy(title){
        let index = this.list.findIndex(x=>x.title===title);
        if(index!==-1){
            this.list[index].buy();
        }
        this.#sort();
    }
    toString(){
        let str = "";
        for (const item of this.list) {
            str += item.toString();
            str += "\n";
        }
        return str;
    }
}
let products = [
    new Product("Cola", 1, false),
    new Product("Cola", 2, true),
    new Product("Pepsi", 3, true),
    new Product("Pepsi", 4, true)
];
let productList = new ProductList(products);
console.log(productList.toString());
productList.add(new Product("Pepsi", 5, false));
console.log(productList.toString());
productList.buy("Cola");
console.log(productList.toString());
*/

//2
/*
class Product{
    constructor(title, quantity, price){
        if(!(typeof title === "string")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof quantity === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof price === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!Number.isInteger(quantity)){
            throw new TypeError("Wrong type!");
        }
        if(quantity<0){
            throw new TypeError("Quantity must be more than 0!");
        }
        if(price<0){
            throw new TypeError("Price must be more than 0!");
        }
        this.title = title;
        this.quantity = quantity;
        this.price = price;
    }
    get cost(){
        return this.price*this.quantity;
    }
    toString(){
        return `${this.title}; ${this.price}$ * ${this.quantity} qty. = ${this.cost}$`; 
    }
}
class Check{
    constructor(products){
        this.list = new Array();
        for (const item of products) {
            this.add(item);
        }
    }
    add(item){
        if(!(item instanceof Product)){
            throw new TypeError();
        }
        this.list.push(item);
    }
    totalCost(){
        let total = 0;
        for (const item of this.list) {
            total+=item.cost;
        }
        return total;
    }
    mostExpensive(){
        let tmp = new Product("placeholder", 0, 0);
        for (const item of this.list) {
            if(item.cost > tmp.cost){
                tmp = item;
            }
        }
        return tmp;
    }
    averagePrice(){ //Price = цена за покупку единицы товара
        let tmp = 0;
        for (const item of this.list) {
            tmp+=item.quantity;
        }
        return this.totalCost()/tmp;
    }
    averageCost(){ //Cost = цена за покупку n штук товара
        return this.totalCost()/this.list.length;
    }
    toString(){
        let str = "";
        for (const item of this.list) {
            str += item.toString();
            str += "\n";
        }
        str+=`Total cost: ${this.totalCost()}$`;
        return str;
    }
}
let productList = [
    new Product("Cola", 1, 2),
    new Product("Pepsi", 2, 4),
    new Product("Lays", 3, 3),
    new Product("Pringles", 4, 1)
]
let check = new Check(productList);
console.log(check.toString());
console.log(check.averageCost());
console.log(check.averagePrice());
console.log(check.mostExpensive());
console.log(check.totalCost());
*/

//3
/*
function writeP(styleMap, text){
    if(!(styleMap instanceof Map)){
        throw new TypeError("Wrong type!");
    }
    let strStyle = 'style="';
    for (const item of styleMap) {
        strStyle += `${item[0]}:${item[1]};`;
    }
    strStyle+='"';
    document.write(`<p ${strStyle}>${text}</p>`); //в задании было указано использование document.write(), хоть он больше и не используется
}
let styleMap = new Map();
styleMap.set("color", "red");
styleMap.set("background-color", "darkblue");
writeP(styleMap, "cool");
styleMap.set("color", "darkblue");
styleMap.set("background-color", "red");
writeP(styleMap, "cooler");
*/

//4
/*
class Group{
    constructor(title, students, faculty){
        if(!(typeof students === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof title === "string")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof faculty === "string")){
            throw new TypeError("Wrong type!");
        }
        if(students<1||students>20){
            throw new Error("Wrong students quantity");
        }
        this.title = title;
        this.students = students;
        this.faculty = faculty;
    }
}
class Auditory{
    constructor(title, places, faculty){
        if(!(typeof places === "number")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof title === "string")){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof faculty === "string")){
            throw new TypeError("Wrong type!");
        }
        if(places<10||places>20){
            throw new Error("Wrong places quantity");
        }
        this.title = title;
        this.places = places;
        this.faculty = faculty;
    }
    toString(){
        return `${this.title} для ${this.faculty}, вмещает ${this.places} студентов`;
    }
    static comparePlaces(aud1, aud2){
        if(!(aud1 instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        if(!(aud2 instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        return aud1.places-aud2.places;
    }
    static compareTitles(aud1, aud2){
        if(!(aud1 instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        if(!(aud2 instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        if(aud1.title < aud2.title) { return -1; }
        if(aud1.title > aud2.title) { return 1; }
        return 0;
    }
    static checkFaculty(auditory){
        if(!(auditory instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        if(!(typeof this === "string")){
            throw new TypeError("Wrong type!");
        }
        return auditory.faculty===this;
    }
    static checkGroup(auditory){
        if(!(auditory instanceof Auditory)){
            throw new TypeError("Wrong type!");
        }
        if(!(this instanceof Group)){
            throw new TypeError("Wrong type!");
        }
        return this.faculty === auditory.faculty && this.students <= auditory.places;
    }
}
let auditories = [
    new Auditory("101", 20, "Computer Science"),
    new Auditory("202", 15, "Aerospace engineering"),
    new Auditory("303", 10, "Computer Science")
];
let group = new Group("FSDE_12013_ru", 12, "Computer Science");
Array.tabToString = (array)=>{
    return array.join("\n");
}
Array.log = (array)=>{
    console.log(Array.tabToString(array));
}
Array.log(auditories);
auditories.sort(Auditory.comparePlaces);
Array.log(auditories);
auditories.sort(Auditory.compareTitles);
Array.log(auditories);
Array.log(auditories.filter(Auditory.checkFaculty, "Computer Science"));
Array.log(auditories.filter(Auditory.checkGroup, group));
*/








//Tasks 3
//1
/*
function info(str){
    let infObj = {letterCount: 0, digitCount: 0, otherCount: 0};
    for (const char of str) {
        if(char>='a' && char<='z'){
            infObj.letterCount++;
        }
        else if(char>='A' && char<='Z'){
            infObj.letterCount++;
        }
        else if(char>='0' && char<='9'){
            infObj.digitCount++;
        }
        else{
            infObj.otherCount++;
        }
    }
    return infObj;
}
let infObj = info("abc12&"); 
console.log(infObj);
*/

//2
/*
function info(int){
    if(!(typeof int === "number")){
        throw new TypeError("Wrong type!");
    }
    if(!Number.isInteger(int)){
        throw new TypeError("Wrong number!");
    }
    if(int<10||int>99){
        throw new TypeError("Wrong integer!");
    }
    let str = `${int} - `;
    if(int >= 10 && int <20){
        switch (int) {
            case 10:
                str += "десять";
                break;
            case 11:
                str += "одиннадцать";
                break;
            case 12:
                str += "двенадцать";
                break;
            case 13:
                str += "тринадцать";
                break;
            case 14:
                str += "четырнадцать";
                break;
            case 15:
                str += "пятнадцать";
                break;
            case 16:
                str += "шестнадцать";
                break;
            case 17:
                str += "семнадцать";
                break;
            case 18:
                str += "восемнадцать";
                break;
            case 19:
                str += "девятнадцать";
                break;
        }
    }
    else{
        switch(Math.floor(int/10)){
            case 2:
                str+="двадцать";
                break;
            case 3:
                str+="тридцать";
                break;
            case 4:
                str+="сорок";
                break;
            case 5:
                str+="пятьдесят";
                break;
            case 6:
                str+="шестьдесят";
                break;
            case 7:
                str+="семьдесят";
                break;
            case 8:
                str+="восемьдесят";
                break;
            case 9:
                str+="девяносто";
                break;
        }
        if(int%10!==0){
            str+=" ";
        }
        switch(int%10){
            case 1:
                str+="один";
                break;
            case 2:
                str+="два";
                break;
            case 3:
                str+="три";
                break;
            case 4:
                str+="четыре";
                break;
            case 5:
                str+="пять";
                break;
            case 6:
                str+="шесть";
                break;
            case 7:
                str+="семь";
                break;
            case 8:
                str+="восемь";
                break;
            case 8:
                str+="девять";
                break;
        }
    }
    return str;
}
console.log(info(35));
console.log(info(89));
console.log(info(10));
console.log(info(15));
console.log(info(19));
console.log(info(20));
console.log(info(21));
console.log(info(12));
*/

//3
/*
function alter(str){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    let tmp = "";
    for (const char of str) {
        if(char>='a' && char<='z'){
            tmp+=char.toUpperCase();
        }
        else if(char>='A' && char<='Z'){
            tmp+=char.toLowerCase();
        }
        else if(char>='0' && char<='9'){
            tmp+="_";
        }
        else{
            tmp+=char;
        }
    }
    return tmp;
}
console.log(alter("Ab12!"));
*/

//4
/*
function camelize(str){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    let tmp = "";
    let upper = false;
    for (const char of str) {
        if(char==='-'){
            upper=true;
        }
        else{
            tmp+=upper?char.toUpperCase():char;
            upper=false;
        }
    }
    return tmp;
}
console.log(camelize("font-size"));
console.log(camelize("background-color"));
console.log(camelize("text-align"));
*/

//5
/*
function abbreviaturize(str){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    let tmp = "";
    let upper = true;
    for (const char of str) {
        if(char==='-'||char===' '){
            upper = true;
        }
        else{
            if(upper===true){
                tmp+=char.toLocaleUpperCase();
                upper = false;
            }
        }
    }
    return tmp;
}
console.log(abbreviaturize("cascading style sheets"));
console.log(abbreviaturize("объектно-ориентированное программирование"));
*/

//6
/*
function merge(...strs){
    return strs.join(" ");
}
console.log(merge("abc", "абв", "string", "строка"));
*/

//7
//напишите мне если я уж слишком ленив ;)
/*
function calc(str){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    return eval(str);
}
console.log(calc("100+150*2"));
*/

//8
/*
function info(url){
    if(!(typeof url === "string")){
        throw new TypeError("Wrong type!");
    }
    let infObj = {protocol: null, domain: null, path: null};
    if(url.startsWith("http")){
        infObj.protocol = url.slice(0, url.indexOf("://"));
        url = url.slice(url.indexOf("://")+3);
    }
    if(url.indexOf("/") === -1){
        infObj.domain = url;
        return infObj;
    }
    infObj.domain = url.slice(0, url.indexOf("/"));
    infObj.path = url.slice(url.indexOf("/"));
    return infObj;
}
console.log(info("https://itstep.org/ua/about"));
*/

//9
/*
function customSplit(str, separator){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    if(!(typeof separator === "string")){
        throw new TypeError("Wrong type!");
    }
    let arr = [];
    while (str.indexOf(separator) !== -1) {
        arr.push(str.slice(0, str.indexOf(separator)));
        str = str.slice(str.indexOf(separator)+separator.length);
    }
    if(str.length>0){
        arr.push(str);
    }
    return arr;
}
console.log(customSplit("10/x/08/x/2020/x/", "/x/"));
*/

//10
function print(str, ...args){
    if(!(typeof str === "string")){
        throw new TypeError("Wrong type!");
    }
    let substr = "";
    let i = 0
    let isArg = false, start = -1, end = -1;
    for (const char of str) {
        if(char==='%'){
            start = i+1;
            end = i+1;
            isArg = true;
        }
        else if(isArg === true){
            if(Number.parseInt(char) != NaN && char != " " && char !="." && char !=","){
                end++;
            }
            else{
                let index = Number.parseInt(str.slice(start, end+1));
                substr += args[index-1];
                substr+=char;
                isArg = false;
            }
        }
        else{
            substr+=char;
        }
        i++;
    }
    return substr;
}
console.log(print("Today is %1 %2.%3.%4 hi", "Monday", 10, 8, 2020));
