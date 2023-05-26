import { makeAutoObservable, runInAction, toJS } from 'mobx';
import {
  addCourseArray,
  editCourseArray,
  getCoursesState,
  removeCourseArray,
} from '../utils/firebase/firebase.utils';
import { ICourse } from './types';


class Courses {

  courses: ICourse[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true });
  }

  async getCoursesState(category: string) {
    try {
      const courses = await getCoursesState(category);
      runInAction(() => {
        this.courses = courses;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addCourse(course: ICourse) {
    try {
      await addCourseArray(course);
    } catch (e) {
      console.log(e);
    }
  }

  async updateCourse(updatedCourse: ICourse, oldCategory: string) {
    try {
      await editCourseArray(updatedCourse, oldCategory);
      const index = this.courses.findIndex(c => c.id === updatedCourse.id);
      runInAction(() => {
        this.courses[index] = updatedCourse;
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

  getCourse(courseId: string){
    let course = this.courses.find(course => course.id === courseId)
    return toJS(course)
  }

}

const coursesStore = new Courses();

export default coursesStore;