export interface ICourse {
  id: string;
  category: string;
  name: string;
  contact_phone: string;
  department: string;
  description: string;
  groups_schedule: IGroup[];
  image_url: string;
  location_info: {
    address: string;
    contact_phone: string;
    room_number: string;
  };
  payment_term: string;
  program: string;
  program_duration: string;
  recruiting_is_open: boolean;
  student_age_from: number;
  student_age_to: number;
  teacher_name: string;
}

export interface IGroup {
  group_name: string;
  weekly_schedule: {
    monday_lessons?: string[]
    tuesday_lessons?: string[]
    wednesday_lessons?: string[]
    thursday_lessons?: string[]
    friday_lessons?: string[]
    saturday_lessons?: string[]
    sunday_lessons?: string[]
  };
}

export interface IApplication {
  key: string;
  address: string;
  birthday: string;
  contactPhone: string;
  courseName: string;
  email: string;
  name: string;
  schoolName: string;
  surname: string;
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
  ['technical_creativity', 'ТЕХНИЧЕСКОЕ ТВОРЧЕСТВО'],
];

export const categoriesKeys = [
  'art_creativity',
  'choreographic_creativity',
  'classes_for_preschoolers',
  'decoration_creativity',
  'ecology_and_countries',
  'foreign_languages',
  'intellectual_creativity',
  'it_technology',
  'music_creativity',
  'singing_direction',
  'sport_direction',
  'technical_creativity',
];

export const categoriesValues = [
  'ИЗОБРАЗИТЕЛЬНОЕ ТВОРЧЕСТВО',
  'ХОРЕОГРАФИЧЕСКОЕ ТВОРЧЕСТВО',
  'ЗАНЯТИЯ ДЛЯ ДОШКОЛЬНИКОВ',
  'ДЕКОРАТИВНОЕ ТВОРЧЕСТВО',
  'ЭКОЛОГИЯ И КРАЕВЕДЕНИЕ',
  'ИНОСТРАННЫЕ ЯЗЫКИ',
  'ИНТЕЛЛЕКТУАЛЬНОЕ ТВОРЧЕСТВО',
  'IT-ТЕХНОЛОГИИ',
  'МУЗЫКАЛЬНОЕ ТВОЧЕСТВО',
  'ВОКАЛЬНОЕ ТВОРЧЕСТВО',
  'СПОРТИВНОЕ НАПРАВЛЕНИЕ',
  'ТЕХНИЧЕСКОЕ ТВОРЧЕСТВО',
];
export type tDays = ['monday_lessons',
  'tuesday_lessons',
  'wednesday_lessons',
  'thursday_lessons',
  'friday_lessons',
  'saturday_lessons',
  'sunday_lessons']
export type dayKey = 'monday_lessons' |
  'tuesday_lessons' |
  'wednesday_lessons' |
  'thursday_lessons' |
  'friday_lessons' |
  'saturday_lessons' |
  'sunday_lessons'
export const daysKeys: tDays = ['monday_lessons',
  'tuesday_lessons',
  'wednesday_lessons',
  'thursday_lessons',
  'friday_lessons',
  'saturday_lessons',
  'sunday_lessons'];