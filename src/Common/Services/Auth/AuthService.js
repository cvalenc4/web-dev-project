import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = (currUser) => {
    const user = new Parse.User();

    user.set("password", currUser.password);
    user.set("username", currUser.email);
  
    console.log("User: ", user);
    console.log();
    return user
      .logIn(user.email, user.password)
      .then((currUserSaved) => {
        return currUserSaved;
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
};

export const checkUser = () => {
    return Parse.User.current()?.authenticated;
};

export const logoutUser = () => {
    return Parse.User.logOut()
    .then(() => {
      // This will return the updated state of the user after logout
      return !Parse.User.current()?.authenticated;
    })
    .catch((error) => {
      console.error('Error logging out', error);
      return false;
    });
};

export const getCurrentUser = () => {
  return Parse.User.current();
};
