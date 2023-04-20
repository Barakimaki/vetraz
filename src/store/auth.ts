import { makeAutoObservable, flow } from 'mobx'
import { signIn } from '../utils/firebase/firebase.utils';
import {User} from 'firebase';

class Auth {
    user: User | null = null
    constructor() {
        makeAutoObservable(this, {}, { deep: true, autoBind: true })
    }
    setUser=flow(function* (email: String, password: String){
        try {
            this.user = yield signIn(email, password)
        } catch (e) {
            console.log(e);
        }
    })
}

const authStore = new Auth()

export default authStore