// export interface ICourse {
//   id: string
//   address: string
//   contactPhone: string
//   courseName: string
//   category: string
//   description: string
//   imageUrl: string
//   paymentTerm: string
//   studentsAge?: {
//     from: number | null
//     to: number | null
//   }
//   teacherName: string,
//   schedule: IGroup[]
// }

export interface ICourse {
  id: string;
  contact_phone: string;
  department: string;
  description: string;
  groups_schedule: Group[];
  image_url: string;
  location_info: {
    address: string;
    contact_phone: string;
    room_number: string;
  };
  name: string;
  payment_term: string;
  program: string;
  program_duration: string;
  recruiting_is_open: boolean;
  students_age: {
    from: number;
    to: number;
  };
  teacher_name: string;
}

export interface Group {
  group_name: string,
  weekly_schedule: {
    monday_lessons?: string[]
    tuesday_lessons?: string[]
    wednesday_lessons?: string[]
    thursday_lessons?: string[]
    friday_lessons?: string[]
    saturday_lessons?: string[]
    sunday_lessons?: string[]
  }
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


export const categories = [
  ['art_creativity', 'ИЗОБРАЗИТЕЛЬНОЕ ТВОРЧЕСТВО'],
  ['choreographic_creativity', 'ХОРЕОГРАФИЧЕСКОЕ ТВОРЧЕСТВО'],
  ['classes_for_preschoolers', 'ЗАНЯТИЯ ДЛЯ ДОШКОЛЬНИКОВ'],
  ['decoration_creativity', 'ДЕКОРАТИВНОЕ ТВОРЧЕСТВО'],
  ['ecology_and_countries', 'ЭКОЛОГИЯ И КРАЕВЕДЕНИЕ'],
  ['foreign_languages', 'ИНОСТРАННЫЕ ЯЗЫКИ'],
  ['intellectual_creativity', 'ИНТЕЛЛЕКТУАЛЬНОЕ ТВОРЧЕСТВО'],
  ['it_technology', 'IT-ТЕХНОЛОГИИ'],
  ['music_creativity', 'МУЗЫКАЛЬНОЕ ТВОЧЕСТВО'],
  ['singing_direction', 'ВОКАЛЬНОЕ ТВОРЧЕСТВО'],
  ['sport_direction', 'СПОРТИВНОЕ НАПРАВЛЕНИЕ'],
  ['technical_creativity', 'ТЕХНИЧЕСКОЕ ТВОРЧЕСТВО']
]