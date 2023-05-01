import bcrypt from 'bcryptjs';
import {
  emailRegexPattern,
  passwordRegexPattern
} from '../constants/credentials';
import { LoginInputs } from '../types/User';

export class LoginHelper {
  credentialsInputsValidation(login: LoginInputs) {
    let emailIsValid = emailRegexPattern.test(login.email);
    let passwordIsValid = passwordRegexPattern.test(login.password);
    if (emailIsValid && passwordIsValid) {
      return;
    } else {
      let errorMessage = '';
      if (!emailIsValid) errorMessage += 'Email';
      if (!passwordIsValid)
        errorMessage += `${errorMessage.length && ' and '}Password`;
      throw `${errorMessage} validation fail.`;
    }
  }

  async comparePassword(enteredPassword: string, hashedPassword: string) {
    return await bcrypt
      .compare(enteredPassword, hashedPassword)
      .then((passwordIsValid: boolean): void | Error => {
        if (!passwordIsValid) throw 'password is not valid';
        return;
      });
  }
}
