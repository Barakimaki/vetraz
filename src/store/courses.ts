import { makeAutoObservable } from 'mobx';

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
  from: string
  to: string
}

export interface IDay {
  lessons: ILesson[]
}


export interface IGroup {
  groupName: string
  week: IDay[]
}


export type Common = {
  categories: string[],
  addresses: string[],
  paymentTerms: string[]
}

class Courses {

  courses: ICourse[] = []
  categories: string[] = []
  addresses: string[] = []
  paymentTerms: string[] = []

  constructor() {
    makeAutoObservable(this, {}, { deep: true, autoBind: true })
  }
}