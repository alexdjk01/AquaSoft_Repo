
// Solutions for the questions
console.log("\n Starting internship practice ...");

console.log("\n ---------------- Task1 (Methods) + Task 2 (var,let,const)----------------");
// Main differences between ES5 and ES6 are : Introduced let, const (var is present in ES5), arrow functions,
// string interpolation, classes, import/export withoud require, spread and rest operators, Promises.

//VAR
var firstVariable;  // var variables can be undefined if a value is not specified
console.log(firstVariable); 
firstVariable = 10; //can be reassigned
console.log(firstVariable); 

//LET
//let secondVariable; // error of syntax. We need to specifiy the value;
let secondVariable:string = 'Alex'; // or Typescript let secondVariable : string = "Alex";
let alwaysTrue: boolean = true;
if(alwaysTrue) //always true in order to check the block property of "let"
{
    let auxiliaryVariable = 'Andrei';   // the variable is visible just inside it's block. If can't access it outside of the if statement.
    if (secondVariable === auxiliaryVariable) // == checks the type of the variable while === checks if the information also matches.
        console.log(`${secondVariable} and ${auxiliaryVariable} match! `); //string interpolation
    else
        console.log(`${secondVariable} and ${auxiliaryVariable} do not match! `); //string interpolation
}

//CONST
const thirdVariable:number = 10; // a constant variable needs to be initialized or we risk to get an error;
//thirdVariable =20; //cannot be reassigned. Good use when we create variables which are static and will not be changed (eg. port number, Serial Keys..)
//same as the let type, it exists only in the block of code in which it is defined.

//Traditional functions
function sumFunctionTraditional(param1:number,param2:number){
    return param1+param2;
}

//Arrow Functions
console.log("\n ----- Arrow Functions");
let sumFunctionArrow = (param1:number, param2:number) => param1+param2; //simpler than traditional functions.
let someFunctionArrowMultipleLines = (param1:number, param2:number) =>{
    let result = param1*100 + param2*100;
    return result;
}
console.log(sumFunctionTraditional(2,3));
console.log(sumFunctionArrow(2,3));
console.log(someFunctionArrowMultipleLines(2,3));

//Classes
console.log("\n ----- Classes");
class Circle{
    private radius:number; // in typescript we need to explicitly declare the type
    constructor(radius){
        this.radius=radius;
    }

    calculateArea()
    {
        return Math.pow(this.radius,2) * Math.PI; //Math.pow (power) raises the first parameter to the power specified in the second parameter.
    }
}

const circle = new Circle(3); // a new object obtained from the class Circle
console.log(circle.calculateArea());

//We can extends a certain class
class ColoredCircle extends Circle{ // extends a certain class (base class or not) 
    private color:number;
    constructor(color,radius){
        super(radius);  //call the base class constructor with the radius attribute
        this.color=color;   // extra atributte specific to the ColoredCircle class
    }

    fillCircle()
    {
        return `The circle with area equal to ${this.calculateArea()} has been colored in ${this.color} !`;
    }

}

const coloredCircle = new ColoredCircle('blue',3);
console.log(coloredCircle.fillCircle());

console.log("\n ---------------- Task3 (Spread) + Task4 (Objects) + Task5 (Arrays) ----------------");

//Arrays
console.log("\n ----- Arrays");
let numbersArray: number[] = [1,2,3,4];
let stringArray: string[] = ["Car", "House", "Table"];
//accesor methods: length, indexOf(), lastIndexOf(), includes(), join(), slice()
console.log('Array length: '+ numbersArray.length);
console.log('Index of an element: '+ stringArray.indexOf('Car'));
console.log('Does an array contains a specific element? '+ stringArray.includes("House"));
console.log('Join an array by another element', numbersArray.join('+'));  //concats the elements 
console.log('Slices the array ', stringArray.slice(1,2)); // last element is included into the slice result.
//iteration methods: forEach(), map(), filter(), reduce(), find(), findIndex(), every(), some()
numbersArray.forEach((element)=> console.log(element*element)); //interates each element in the array
let powArray = numbersArray.map((element) => element*element); //takes the result and forms a new array
console.log(powArray);
let filteredArray = stringArray.filter((element) => element.length >3); // only the elements that meets the cirteria
console.log(filteredArray);
let foundElement = stringArray.find((element) => element.length === 3); //first element that meets the criteria
console.log(foundElement);
//mutator methods: push(), pop(), shift(), splice(), sort(), reverse(), fill(), 
numbersArray.push(5); //added 5 to the end of the array
numbersArray.pop(); // removes the last element and returns it.
numbersArray.shift(); // removes the first element of the array
numbersArray.unshift(1); //adds the element to the beginning of the array
numbersArray.splice(1,2,11,12); //start at position 1 , delete 2 elements and add other elemetns( 11,12,..etc..);
numbersArray.splice(1,2,3,4); // made it back to normal
//etc.

//Objects
console.log("\n ----- Objects");
// objects can be created in multiple ways (using object literals, classes, interfaces)
// classes were already shown earlier, so i will create objects using interfaces
interface Student{
    name:string;
    studentId:number;
    studyYear:number;
}

const studentOne : Student = {name:"Alexandru Ionel", studentId:1,studyYear:1};
const studentTwo : Student = {name:"Andrei Ivan", studentId:2,studyYear:2};
const studentThree : Student = {name:"Iustina Pavel", studentId:3,studyYear:3};
console.log(studentOne);

//iterate over the properties of an object
Object.entries(studentOne).forEach(([key,value])=>{
    console.log(`${key} - ${value}`);
});

//array of student objects 
let studentArray  :Array<Student> = [studentOne,studentTwo,studentThree];
studentArray.forEach(element => {
    console.log(element);
});

//deep copy
//Simple objects can be deep-copied with Json
const deepCopyJson = JSON.parse(JSON.stringify(studentOne));
console.log(deepCopyJson);
//For complex objects (that may contain methods we can use an external library)
const _ = require('lodash'); // can be replaced by import if we work inside a module
const deepCopyImport = _.cloneDeep(coloredCircle);
console.log(deepCopyImport);

//Spread on arrays:
console.log("\n ----- Spread");
let numbersArrayCopy: number[] = [...numbersArray]; //we can copy an array like this
let numbersArray2: number[] = [100,...numbersArray,22,23];  // we can add elements dinamically
let numberStringArray : Array<number | string> = [...numbersArray,...stringArray]; // we can combine string and numbers inside an array

console.log(numbersArrayCopy);
console.log(numbersArray2);
console.log(numberStringArray);

//Spread Objects
const extraStudent = {...studentOne, "scholarship": true}; // we can add properties dynamic
console.log(extraStudent);
const shallowCopyObject = {... studentOne}; // the shallowCopyObject points will still reference tot the original object
console.log(shallowCopyObject === studentOne); // even though it creates a new object in memory( that s why the result is false), the reference is the same

console.log("\n ---------------- Task6 (Promises / Callback) + Task7 (Async / Await) ----------------");
console.log("\n ----- Callback and Promises");

//Callbacks are functions passed as arguments to other functions that will execute after some operation is completed.
type CallbackFunction = (result :string) =>void; // receives a string param and return a void
function getDataAsync(callbackFunction : CallbackFunction)
{
    console.log('Data loading...')
    setTimeout( () =>{
        const result = "Data fetched!";
        callbackFunction(result);
    },2000); //2000 miliseconds delay
}

function handleCallbackFunction(result: string){
    console.log("Callback function: ", result);
}
getDataAsync(handleCallbackFunction);

//Promises are better for dealing with async tasks 
const examplePromise = new Promise<string>((resolve,reject) =>{
    setTimeout( () =>{
        resolve("Hello user, please log in!");
        reject("Wrong URL, redirecting...");
    },2000);
});

examplePromise.then(
    (message:string) => { //promise is resolved
      console.log(`The promise has been resolved: ${message}`)
    },
    (error:string) => { //promise is rejected
      console.log(`The promise has been rejected: ${error}`)
    }
  );

  //await async
  // we can use await async with Promises, in order to make the code look syncronous

  const fetchData = new Promise<string>((resolve,reject) => {
    setTimeout( () =>{
        resolve("All the informations has been saved!");
        reject("The process failed to save the data!")
    },2000);
  });

  function processData(someData:string){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`${someData} Data has been processes !`);
            reject("The data cannot be processed!");
        },2000);
    });
  }

  async function displayData () {
    try{
        let data:string = await fetchData;      //asyncroniosly waiting for data
        let processedData = await processData(data);    //processing data asyncroniously
        console.log(processedData);
    }
    catch (err){
        console.error(err);
    }
  }

  displayData();

console.log("\n ---------------- Task8 (Closures) ----------------");

function printer(message:string){   //main function
    return function insidePrinter(message2:string)  //inner function
    {
        console.log("main function: " , message);
        console.log("inner function: ", message2);
    }
}

const letsPrint = printer("This is the main function!");    //even if the main function stoped executing, we can access the inner function later
letsPrint("This is the inner function!");

//console.log("\n ---------------- Task9 (React hooks) ----------------");
// useState React hook adds state to components.
// used for managing and updating component variables of the functional components. Triggers re-renders when their values have changed
// useRef references values that are not needed to re-render. Used to store mutable values
//!!! Made a react-app component in order to test useState, useRef.
console.log("\n\nOutput from Promise and await incoming.....................");