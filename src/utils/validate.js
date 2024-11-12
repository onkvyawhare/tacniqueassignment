export const validateUserForm = (formData) => {
    const errors = {};
  
    // Validate first name
    const isFirstNameValid = /^[a-zA-Z\s]{2,50}$/.test(formData.firstName.trim());
    if (!isFirstNameValid) {
      errors.firstName =
        "Please enter a valid first name (2-50 alphabetic characters and spaces only).";
    }
  
    // Validate last name
    const isLastNameValid = /^[a-zA-Z\s]{2,50}$/.test(formData.lastName.trim());
    if (!isLastNameValid) {
      errors.lastName =
        "Please enter a valid last name (2-50 alphabetic characters and spaces only).";
    }
  
    // Validate email
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
      formData.email.trim()
    );
    if (!isEmailValid) {
      errors.email =
        "Please enter a valid email address. It should include an '@' symbol and a domain name, such as 'example@domain.com'. Ensure the domain part has a valid format like '.com', '.net', or '.org'.";
    }
  
    // Validate department
    if (!formData.department.trim()) {
      errors.department = "Department is required.";
    }
  
    return errors;
  };