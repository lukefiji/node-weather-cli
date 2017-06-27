const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers");
      }
    }, 1500);
  });
};

asyncAdd(5, 7)
  .then(res => {
    console.log("Result:", res);
    return asyncAdd(res, 33);
  })
  .then(res => {
    console.log("First result + 33:", res);
  })
  .catch(err => {
    console.log(err);
  });

// A promise takes a function as an argument
// Return resolve if everything is okay
// Reject if there is an error
// const somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hey, it worked!");
//     // reject("Unable to fulfill promise");
//   }, 2500);
// });

// somePromise
//   // On resolve
//   .then(message => {
//     console.log("Success: ", message);
//   })
//   // On reject
//   .catch(message => {
//     console.log("Error: ", message);
//   });
