import { IApplication, ICourse } from './types';
import { makeAutoObservable, runInAction } from 'mobx';
import { getApplicationState, deleteApplication } from '../utils/firebase/firebase.utils';


class Applications {

  applications: IApplication[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true });
  }

  async getApplicationsState() {
    try {
      const applications = await getApplicationState();
      runInAction(() => {
        this.applications = applications;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteApplication(key: string) {
    try {
      await deleteApplication(key)
      const index = this.applications.findIndex(a => a.key === key);
      runInAction(() => {
        this.applications.splice(index, 1);
      });
    } catch (e) {
      console.log(e);
    }
  }

}

const applicationsStore = new Applications();
export default applicationsStore;