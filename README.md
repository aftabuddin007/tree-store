
#### 7) Create a README file to answer the following question-


#### 1) What is the difference between var, let, and const?
Answer: Var is function-scope. Let and Const are block Scope. var can be updated and redeclared within same scope without error.
let can be updated but can't be redeclared within the same scope.
Const cannot be reassigned after their initial declaration.

#### 2) What is the difference between map(), forEach(), and filter()? 
Answer: *map() is used to executes the same code on every element in an array and return a new array with the update element.
*ForEach() is used to execute the same code on every element in an array but does not change the array.
*Filter() is used to check every element in an array to see if it meets a certain criteria and return a new array with the elements that return truthy for the criteria.
#### 3) What are arrow functions in ES6?
Answer: Arrow functions allows a shorter syntax for function expressions. 
Example: let sum = (a,b) => a+b;
#### 4) How does destructuring assignment work in ES6?
Answer:Destructuring in javascript is a simple way to take values from an object or an array and put them into separate variables.
example: const n = [1,2,3]
const [a,b] = n;
console.log(a)
console.log(b)

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Answer:Template literals are an ES6 features that allow us to concat strings more quickly and in a much more readable form.
#Difference::
we joined string using the + sign which made the code too long. With template literals we can just write ${variable} and the variable or calculation value goes directly inside the string..
##