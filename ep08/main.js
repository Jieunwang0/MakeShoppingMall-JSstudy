// const ret = fetch("https://jsonplaceholder.typicode.com/todos/1");
// console.log({ ret });

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((result) => console.log('result', result))
//     .then((error) => console.log('error', error));

// const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
//    console.log('response', response);

// try {
// const result = await fetch("https://jsonplaceholder.typicode.com/todos/1")
// console.log('resolved', result);
// }catch{
// console.log('rejected', err)
// }

// function returnPromise() {
//     return new Promise((resolve, reject) => {
//         //
//         // resolve(3);
//     });
// }

// const promise = returnPromise();

// const result = await promise;

// console.log({ result });


// setTimeout(() => {
//   consolelog('h1')
// }, 2000)

// function printDelayedMessage(message, timeout){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//     console.log(message);
//     // resolve();
//     reject('error!!')
//   }, timeout)
//   }) 
// }

// async function main() {console.log("before resolving promise")
// try{
// await printDelayedMessage("hi", 1000);
// }catch(err) {
//   console.log('err: ', err)
// }
// console.log('after resolving promise')}

// main();



async function getTodo(id) {
  if(id ===2) {
    throw new Error (`error getting todo for #${id}`)
  }
return await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
} // Promise return

const promise1 = getTodo(1); 
const promise2 = getTodo(2); 
const promise3 = getTodo(3); 

try{
const responses = await Promise.allSettled([promise1, promise2, promise3])
console.log('responses', responses)
if(responses[1].status === 'rejected'){
  
}
}catch(err) {
  console.log('error: ', err)
}
// const jsonPromise1 = response[0].json();
// const jsonPromise2 = response[1].json();
// const jsonPromise3 = response[2].json();

// const jsons = await Promise.all([jsonPromise1, jsonPromise2, jsonPromise3]);
// console.log(jsons);

const jsons = await Promise.all(responses.map(response => response.json()))
console.log(jsons);

// const response1 = await getTodo(1)
//   const json1 = await response1.json();
// console.log(json1);

// const response2 = await getTodo(2);
// const json2 = await response2.json();
// console.log(json2);
