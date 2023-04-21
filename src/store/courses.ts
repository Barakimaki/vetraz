import { makeAutoObservable, runInAction } from 'mobx';
import { addCourseArray, getCoursesState, removeCourseArray, setCommon } from '../utils/firebase/firebase.utils';

export interface ICourse {
  id: string
  address: string
  contactPhone: string
  courseName: string
  category: string
  description: string
  imageUrl: string
  paymentTerm: string
  studentsAge?: {
    from: number | null
    to: number | null
  }
  teacherName: string,
  schedule: IGroup[]
}

export interface ILesson {
  from: string;
  to: string;
}

export interface IDay {
  lessons: ILesson[];
}


export interface IGroup {
  groupName: string;
  week: IDay[];
}


export type Common = {
  categories: string[],
  addresses: string[],
  paymentTerms: string[]
}

class Courses {

  courses: ICourse[] = [];
  categories: string[] = [];
  addresses: string[] = [];
  paymentTerms: string[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true });
  }

  async getCoursesState() {
    try {
      const { categories, addresses, paymentTerms, courses } = await getCoursesState();
      runInAction(() => {
        this.categories = categories;
        this.addresses = addresses;
        this.paymentTerms = paymentTerms;
        this.courses = courses;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateCommon(common: Common) {
    try {
      await setCommon(common);
      runInAction(() => {
        this.categories = common.categories;
        this.addresses = common.addresses;
        this.paymentTerms = common.paymentTerms;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addCourse(course: ICourse) {
    try {
      await addCourseArray(course);
      runInAction(() => {
        this.courses.push(course);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateCourse(newCourse: ICourse, oldCourse: ICourse) {
    try {
      await removeCourseArray(oldCourse, false);
      await addCourseArray(newCourse);
      runInAction(() => {
        this.courses.forEach((course, index) => {
          if (course.id === newCourse.id) {
            this.courses[index] = newCourse;
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCourse(course: ICourse) {
    try {
      await removeCourseArray(course, true);
      const index = this.courses.findIndex(c => c.id === course.id);
      runInAction(() => {
        this.courses.splice(index, 1);
      });
    } catch (e) {
      console.log(e);
    }
  }

}

const coursesStore = new Courses();

export default coursesStore;