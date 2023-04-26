import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Common, ICourse } from '../../store/courses';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const storage = getStorage(app);

const auth = getAuth();
export const signIn = async (email: String, password: String) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
  }
};

export type CoursesState = {
  courses: ICourse[]
  categories: string[]
  addresses: string[]
  paymentTerms: string[]
}

export const getCoursesState = async () => {
  let coursesState: CoursesState = {
    courses: [],
    categories: [],
    addresses: [],
    paymentTerms: [],
  };

  const coursesRef = doc(db, 'courses', 'courses');
  const coursesSnap = await getDoc(coursesRef);
  if (coursesSnap.exists()) {
    coursesState.courses = coursesSnap.data().courses
  }
  const commonRef = doc(db, 'courses', 'common');
  const commonSnap = await getDoc(commonRef);
  if (commonSnap.exists()) {
    let common = commonSnap.data();
    coursesState.categories = common.categories;
    coursesState.addresses = common.addresses;
    coursesState.paymentTerms = common.paymentTerms;
  }
  return coursesState;
};

export const setCommon = async (common: Common) => {
  const commonRef = doc(db, 'courses', 'common');

  await updateDoc(commonRef, common);
};

export const addImg = async (id: string, imageFile: File | null): Promise<string | void> => {

  const imageRef = ref(storage, id);
  if (imageFile) {
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  } else {
    return Promise.resolve('');
  }
};

export const addCourseArray = async (course: ICourse) => {
  const coursesRef = doc(db, 'courses', 'courses');
  await updateDoc(coursesRef, {
    courses: arrayUnion(course),
  });

};

export const editCourseArray = async (updatedCourse: ICourse, oldCourse: ICourse) => {
  const coursesRef = doc(db, 'courses', 'courses');
  await updateDoc(coursesRef, {
    courses: arrayRemove(oldCourse)
  })
  await updateDoc(coursesRef, {
    courses: arrayUnion(updatedCourse)
  })
}

export const removeCourseArray = async (course: ICourse, isDeleteImage: boolean) => {

  const coursesRef = doc(db, 'courses', 'courses');

  if (course.imageUrl && isDeleteImage) {
    const imageRef = ref(storage, course.id);
    await deleteObject(imageRef);
  }

  await updateDoc(coursesRef, {
    courses: arrayRemove(course),
  });
};


