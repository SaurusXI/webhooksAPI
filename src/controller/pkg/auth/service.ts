import { v4 as uuidv4 } from 'uuid';

class AuthService {
  // Admin ID changes every time server is restarted, so token will keep changing
  adminId: string

  constructor() {
    this.adminId = uuidv4();
  }

  authenticate(username: string, password: string) {
    if (username === process.env.USER && password === process.env.PASS) {
      return this.adminId;
    }

    return null;
  }

  validate(uid: string) {
    console.log(uid);
    if (uid === this.adminId) {
      return true;
    }
    return false;
  }
}

export { AuthService as default };
