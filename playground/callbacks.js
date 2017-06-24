const getUser = (id, callback) => {
  let user = {
    id,
    name: "Nate"
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, userObj => {
  console.log(userObj);
});
