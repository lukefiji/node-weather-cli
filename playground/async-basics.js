console.log("-- Starting App --");

setTimeout(() => {
  console.log("Inside of setTimeout callback");
}, 1000);

setTimeout(() => {
  console.log("Inside of setTimeout callback 2");
}, 0);

setTimeout(() => {
  console.log("Inside of setTimeout callback 3");
}, 500);

console.log("-- Finishing Up --");
