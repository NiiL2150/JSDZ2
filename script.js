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

