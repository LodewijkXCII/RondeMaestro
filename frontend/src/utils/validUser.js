import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

function validUser(user) {
  schema.validate(user, schema).catch((error) => {
    console.error('Mislukt:', error);
    if (error.message.includes('email')) {
      this.errorMessage = 'Email adres verkeerd';
    } else {
      this.errorMessage = 'Verkeerd wachtwoord';
    }
    return false;
  });
  return true;
}

export default validUser;
