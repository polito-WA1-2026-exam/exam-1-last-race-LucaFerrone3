import validator from "validator";

export function validateCredentials(email, password) {
    let emailErr = '';
    let passwordErr = '';

    if (!email) {
        emailErr = 'The email is mandatory';
    } else if (!validator.isEmail(email)) {
        emailErr = 'Invalid email';
    }

    if (!password) {
        passwordErr = 'The password is mandatory';
    } else if (password.length < 4) {
        passwordErr = 'The password must contain at least 4 characters';
    }

    return { emailErr, passwordErr };
}