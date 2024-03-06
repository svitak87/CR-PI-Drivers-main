const validate = (userData) => {
    const errors = {
      email: "",
      password: "",
      name: "",
      lastname: "",
    };
    
    if (!userData.name) {
      errors.name = "Name input field is empty";
    } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s']/g.test(userData.name)) {
      errors.name = "The name cannot contain symbols and numbers";
    } else if (userData.name.length > 15) {
      errors.name = "The name cannot be more than 15 characters long";
    }

    if (!userData.lastname) {
      errors.lastname = "Lastname input field is empty";
    } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s']/g.test(userData.lastname)) {
      errors.lastname = "The lastname cannot contain symbols and numbers";
    } else if (userData.lastname.length > 15) {
      errors.lastname = "The lastname cannot be more than 15 characters";
    }
    
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
      errors.password = "The password must contain a number";
    } else if (userData.password.length < 5 || userData.password.length > 10) {
      errors.password = "The password must be between 6 and 10 characters long";
    }
  
    return errors;
  };
  
  export default validate;

