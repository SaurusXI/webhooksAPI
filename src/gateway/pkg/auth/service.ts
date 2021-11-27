import { v4 as uuidv4 } from 'uuid';

class AuthService {
  // Admin ID changes every time server is restarted, so token will keep changing
  users: { username: string, password: string, id: string }[];

  constructor() {
    this.users = [];
  }

  checkValidUserName(username: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const userDetails of this.users) {
      if (userDetails.username === username) {
        return userDetails;
      }
    }
    return null;
  }

  checkValidUserID(uid: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const userDetails of this.users) {
      if (userDetails.id === uid) {
        return true;
      }
    }
    return false;
  }

  register(username: string, password: string) {
    const id = uuidv4();
    this.users.push({ username, password, id });
    return id;
  }

  authenticate(username: string, password: string) {
    const userDetails = this.checkValidUserName(username);

    if (userDetails && userDetails.password === password) {
      return userDetails.id;
    }

    return null;
  }

  validate(uid: string) {
    return this.checkValidUserID(uid);
  }
}

export { AuthService as default };
