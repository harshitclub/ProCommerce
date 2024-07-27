function validatePassword(password: string) {
  // Implement password complexity checks (length, special characters, etc.)
  // Consider using a password validation library
  const isValid =
    password.length >= 8 && // Minimum length
    /[A-Z]/.test(password) && // Uppercase letter
    /[a-z]/.test(password) && // Lowercase letter
    /[0-9]/.test(password); // Digit

  const message = `Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a digit.`;

  return { isValid, message };
}

export default validatePassword;
