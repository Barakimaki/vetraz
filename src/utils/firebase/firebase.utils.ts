import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ICourse, IApplication } from '../../store/types';


let firebaseConfig;
firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
};
if (process.env.NETLIFY === 'true') {
  firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASURE_ID,
  };
}


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const storage = getStorage(app);

const auth = getAuth();
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

export type CoursesState = {
  courses: ICourse[]
}

export const getCoursesState = async (category: string) => {
  let courses: ICourse[] = [];

  const q = query(collection(db, 'categories', category, 'courses'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    courses.push({ category: category, ...doc.data() } as ICourse);
  });
  return courses;
};

export const getApplicationState = async () => {
  let applications: IApplication[] = [];
  let q = query(collection(db, 'applications'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    applications.push({key: doc.id, ...doc.data()} as IApplication)
  })
  console.log(applications);
  return applications;
};

export const deleteApplication = async (key: string) =>{
  await deleteDoc(doc(db, 'applications', key));
}

export const addImg = async (id: string, imageFile: File | null): Promise<string | void> => {
  const imageRef = ref(storage, id);
  if (imageFile) {
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  }
};

export const addCourseArray = async (course: ICourse) => {
  const collectionRef = collection(db, 'categories', course.category, 'courses');
  await setDoc(doc(collectionRef, course.id), {
    id: course.id,
    contact_phone: course.contact_phone,
    department: course.department,
    description: course.description,
    groups_schedule: course.groups_schedule,
    image_url: course.image_url,
    location_info: {
      address: course.location_info.address,
      contact_phone: course.location_info.contact_phone,
      room_number: course.location_info.room_number,
    },
    name: course.name,
    payment_term: course.payment_term,
    program: course.program,
    program_duration: course.program_duration,
    recruiting_is_open: course.recruiting_is_open,
    student_age_from: course.student_age_from,
    student_age_to: course.student_age_to,
    teacher_name: course.teacher_name,
  });
};

export const editCourseArray = async (updatedCourse: ICourse, oldCategory: string) => {
  const collectionRef = collection(db, 'categories', oldCategory, 'courses');
  await deleteDoc(doc(collectionRef, updatedCourse.id));
  await addCourseArray(updatedCourse);
};

export const removeCourseArray = async (course: ICourse, isDeleteImage: boolean) => {
  if (course.image_url && isDeleteImage) {
    const imageRef = ref(storage, course.id);
    await deleteObject(imageRef);
  }
  const collectionRef = collection(db, 'categories', course.category, 'courses');
  await deleteDoc(doc(collectionRef, course.id));
};


