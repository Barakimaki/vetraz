import { makeAutoObservable } from 'mobx';
import { dayKey, IGroup } from './types';


class Schedule {
  schedule: IGroup[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true });
  }

  setSchedule(schedule: IGroup[]) {
    this.schedule = schedule;
  }

  addNewGroup(groupName: string) {
    let newGroup: IGroup = {group_name: groupName, weekly_schedule: {}}
    this.schedule = [...this.schedule, newGroup]
  }
  deleteGroup(groupIndex: number){
    this.schedule.splice(groupIndex,1)
  }
  addLesson(groupIndex: number, day:dayKey, lesson: string){
    if(this.schedule[groupIndex].weekly_schedule[day]){
    this.schedule[groupIndex].weekly_schedule[day]?.push(lesson)
    } else {
      this.schedule[groupIndex].weekly_schedule[day] = [lesson]
    }
  }
  deleteLesson(groupIndex: number, day:dayKey, lessonIndex: number){
    this.schedule[groupIndex].weekly_schedule[day]?.splice(lessonIndex, 1)
  }

}

const scheduleStore = new Schedule()

export default scheduleStore