const validate = (userData) => {
    const errors = {
      email: "",
      password: "",
    };
  
    // Email validation
    if (!userData.email) {
      errors.email = "Email input empty";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) {
      errors.email = "Invalid email";
    } else if (userData.email.length > 35) {
      errors.email = "The email must not contain more than 35 characters";
    }
  
    // Password validation
    if (!userData.password) {
      errors.password = "Empty password";
    } else if (!/\d/.test(userData.password)) {
      errors.password = "The password must contain at least one number";
    } else if (userData.password.length < 5 || userData.password.length > 10) {
      errors.password = "The password must be between 6 and 10 characters long";
    }
  
    return errors;
  };
  
  export default validate;

