import { makeAutoObservable, runInAction } from 'mobx';
import { signIn } from '../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

class Auth {
  user: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true });
  }

  async setUser(email: string, password: string) {
    try {
      const user = await signIn(email, password);
      runInAction(() => {
        this.user = user;
      });
    } catch (e) {
      return e;
    }
  }
}

const authStore = new Auth();

export default authStore;