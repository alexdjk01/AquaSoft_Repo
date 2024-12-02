var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Solutions for the questions
console.log("\n Starting internship practice ...");
console.log("\n ---------------- Task1 (Methods) + Task 2 (var,let,const)----------------");
// Main differences between ES5 and ES6 are : Introduced let, const (var is present in ES5), arrow functions,
// string interpolation, classes, import/export withoud require, spread and rest operators, Promises.
//VAR
var firstVariable; // var variables can be undefined if a value is not specified
console.log(firstVariable);
firstVariable = 10; //can be reassigned
console.log(firstVariable);
//LET
//let secondVariable; // error of syntax. We need to specifiy the value;
var secondVariable = 'Alex'; // or Typescript let secondVariable : string = "Alex";
var alwaysTrue = true;
if (alwaysTrue) //always true in order to check the block property of "let"
 {
    var auxiliaryVariable = 'Andrei'; // the variable is visible just inside it's block. If can't access it outside of the if statement.
    if (secondVariable === auxiliaryVariable) // == checks the type of the variable while === checks if the information also matches.
        console.log("".concat(secondVariable, " and ").concat(auxiliaryVariable, " match! ")); //string interpolation
    else
        console.log("".concat(secondVariable, " and ").concat(auxiliaryVariable, " do not match! ")); //string interpolation
}
//CONST
var thirdVariable = 10; // a constant variable needs to be initialized or we risk to get an error;
//thirdVariable =20; //cannot be reassigned. Good use when we create variables which are static and will not be changed (eg. port number, Serial Keys..)
//same as the let type, it exists only in the block of code in which it is defined.
//Traditional functions
function sumFunctionTraditional(param1, param2) {
    return param1 + param2;
}
//Arrow Functions
console.log("\n ----- Arrow Functions");
var sumFunctionArrow = function (param1, param2) { return param1 + param2; }; //simpler than traditional functions.
var someFunctionArrowMultipleLines = function (param1, param2) {
    var result = param1 * 100 + param2 * 100;
    return result;
};
console.log(sumFunctionTraditional(2, 3));
console.log(sumFunctionArrow(2, 3));
console.log(someFunctionArrowMultipleLines(2, 3));
//Classes
console.log("\n ----- Classes");
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.calculateArea = function () {
        return Math.pow(this.radius, 2) * Math.PI; //Math.pow (power) raises the first parameter to the power specified in the second parameter.
    };
    return Circle;
}());
var circle = new Circle(3); // a new object obtained from the class Circle
console.log(circle.calculateArea());
//We can extends a certain class
var ColoredCircle = /** @class */ (function (_super) {
    __extends(ColoredCircle, _super);
    function ColoredCircle(color, radius) {
        var _this = _super.call(this, radius) || this; //call the base class constructor with the radius attribute
        _this.color = color; // extra atributte specific to the ColoredCircle class
        return _this;
    }
    ColoredCircle.prototype.fillCircle = function () {
        return "The circle with area equal to ".concat(this.calculateArea(), " has been colored in ").concat(this.color, " !");
    };
    return ColoredCircle;
}(Circle));
var coloredCircle = new ColoredCircle('blue', 3);
console.log(coloredCircle.fillCircle());
console.log("\n ---------------- Task3 (Spread) + Task4 (Objects) + Task5 (Arrays) ----------------");
//Arrays
console.log("\n ----- Arrays");
var numbersArray = [1, 2, 3, 4];
var stringArray = ["Car", "House", "Table"];
//accesor methods: length, indexOf(), lastIndexOf(), includes(), join(), slice()
console.log('Array length: ' + numbersArray.length);
console.log('Index of an element: ' + stringArray.indexOf('Car'));
console.log('Does an array contains a specific element? ' + stringArray.includes("House"));
console.log('Join an array by another element', numbersArray.join('+')); //concats the elements 
console.log('Slices the array ', stringArray.slice(1, 2)); // last element is included into the slice result.
//iteration methods: forEach(), map(), filter(), reduce(), find(), findIndex(), every(), some()
numbersArray.forEach(function (element) { return console.log(element * element); }); //interates each element in the array
var powArray = numbersArray.map(function (element) { return element * element; }); //takes the result and forms a new array
console.log(powArray);
var filteredArray = stringArray.filter(function (element) { return element.length > 3; }); // only the elements that meets the cirteria
console.log(filteredArray);
var foundElement = stringArray.find(function (element) { return element.length === 3; }); //first element that meets the criteria
console.log(foundElement);
//mutator methods: push(), pop(), shift(), splice(), sort(), reverse(), fill(), 
numbersArray.push(5); //added 5 to the end of the array
numbersArray.pop(); // removes the last element and returns it.
numbersArray.shift(); // removes the first element of the array
numbersArray.unshift(1); //adds the element to the beginning of the array
numbersArray.splice(1, 2, 11, 12); //start at position 1 , delete 2 elements and add other elemetns( 11,12,..etc..);
numbersArray.splice(1, 2, 3, 4); // made it back to normal
//etc.
//Objects
console.log("\n ----- Objects");
var studentOne = { name: "Alexandru Ionel", studentId: 1, studyYear: 1 };
var studentTwo = { name: "Andrei Ivan", studentId: 2, studyYear: 2 };
var studentThree = { name: "Iustina Pavel", studentId: 3, studyYear: 3 };
console.log(studentOne);
//iterate over the properties of an object
Object.entries(studentOne).forEach(function (_a) {
    var key = _a[0], value = _a[1];
    console.log("".concat(key, " - ").concat(value));
});
//array of student objects 
var studentArray = [studentOne, studentTwo, studentThree];
studentArray.forEach(function (element) {
    console.log(element);
});
//deep copy
//Simple objects can be deep-copied with Json
var deepCopyJson = JSON.parse(JSON.stringify(studentOne));
console.log(deepCopyJson);
//For complex objects (that may contain methods we can use an external library)
var _ = require('lodash'); // can be replaced by import if we work inside a module
var deepCopyImport = _.cloneDeep(coloredCircle);
console.log(deepCopyImport);
//Spread on arrays:
console.log("\n ----- Spread");
var numbersArrayCopy = __spreadArray([], numbersArray, true); //we can copy an array like this
var numbersArray2 = __spreadArray(__spreadArray([100], numbersArray, true), [22, 23], false); // we can add elements dinamically
var numberStringArray = __spreadArray(__spreadArray([], numbersArray, true), stringArray, true); // we can combine string and numbers inside an array
console.log(numbersArrayCopy);
console.log(numbersArray2);
console.log(numberStringArray);
//Spread Objects
var extraStudent = __assign(__assign({}, studentOne), { "scholarship": true }); // we can add properties dynamic
console.log(extraStudent);
var shallowCopyObject = __assign({}, studentOne); // the shallowCopyObject points will still reference tot the original object
console.log(shallowCopyObject === studentOne); // even though it creates a new object in memory( that s why the result is false), the reference is the same
console.log("\n ---------------- Task6 (Promises / Callback) + Task7 (Async / Await) ----------------");
console.log("\n ----- Callback and Promises");
function getDataAsync(callbackFunction) {
    console.log('Data loading...');
    setTimeout(function () {
        var result = "Data fetched!";
        callbackFunction(result);
    }, 2000); //2000 miliseconds delay
}
function handleCallbackFunction(result) {
    console.log("Callback function: ", result);
}
getDataAsync(handleCallbackFunction);
//Promises are better for dealing with async tasks 
var examplePromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Hello user, please log in!");
        reject("Wrong URL, redirecting...");
    }, 2000);
});
examplePromise.then(function (message) {
    console.log("The promise has been resolved: ".concat(message));
}, function (error) {
    console.log("The promise has been rejected: ".concat(error));
});
//await async
// we can use await async with Promises, in order to make the code look syncronous
var fetchData = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("All the informations has been saved!");
        reject("The process failed to save the data!");
    }, 2000);
});
function processData(someData) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("".concat(someData, " Data has been processes !"));
            reject("The data cannot be processed!");
        }, 2000);
    });
}
function displayData() {
    return __awaiter(this, void 0, void 0, function () {
        var data, processedData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchData];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, processData(data)];
                case 2:
                    processedData = _a.sent();
                    console.log(processedData);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
displayData();
console.log("\n ---------------- Task8 (Closures) ----------------");
function printer(message) {
    return function insidePrinter(message2) {
        console.log("main function: ", message);
        console.log("inner function: ", message2);
    };
}
var letsPrint = printer("This is the main function!");
letsPrint("This is the inner function!");
console.log("Output from Promise and await incoming.....................");
console.log("\n ---------------- Task9 (React hooks) ----------------");
