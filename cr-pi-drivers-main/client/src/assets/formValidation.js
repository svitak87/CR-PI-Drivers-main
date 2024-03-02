const validate = (driverData) => {
  const errors = {
    name: "",
    lastname: "", 
    description: "",
    image: "",
    nationality: "",
    dob: "",
  };

  if (!driverData.name) {
    errors.name = "Name input field is empty";
  } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s']/g.test(driverData.name)) {
    errors.name = "The name cannot contain symbols and numbers";
  } else if (driverData.name.length > 15) {
    errors.name = "The name cannot be more than 15 characters long";
  }

  if (!driverData.lastname) {
    errors.lastname = "Lastname input field is empty";
  } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s']/g.test(driverData.lastname)) {
    errors.lastname = "The lastname cannot contain symbols and numbers";
  } else if (driverData.lastname.length > 15) {
    errors.lastname = "The lastname cannot be more than 15 characters long";
  }

  if (!driverData.description) {
    errors.description = "The description text field is empty";
  } else if (driverData.description.length < 10) {
    errors.description =
      "The description text field must have more than 10 characters";
  } else if (/[^a-zA-Z0-9\s']/g.test(driverData.description)) {
    errors.description = "The description cannot contain symbols";
  }
  if ((!driverData.image)) {
    errors.image =
      "If you don't have an image, we'll give you an automathic photo";
  } else if (
    !/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*?\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(
      driverData.image
    )
  ) {
    errors.image = "The image input field must be an URL"; 
  }

  if (!driverData.nationality) {
    errors.nationality = "Nationality input field is empty";
  } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s']/g.test(driverData.nationality)) {
    errors.nationality = "The nationality cannot contain symbols and numbers";
  } else if (driverData.nationality.length > 15) {
    errors.nationality =
      "The nationality cannot be more than 15 characters long";
  }

  if (!driverData.dob) {
    errors.dob = "The date of birth input field is empty";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(driverData.dob)) {
    errors.dob =
      "The date of birth must be in the format (YYYY-MM-DD) / year-month-day";
  }
  return errors;
};

export default validate;
