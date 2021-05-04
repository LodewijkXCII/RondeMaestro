import schema from '@/utils/yup';

function validUser(user) {
  const result = schema.schema.validate(user, schema).catch((error) => {
    console.log('Mislukt:', error);
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
