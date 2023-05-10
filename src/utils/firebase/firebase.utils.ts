import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ICourse } from '../../store/types';

let firebaseConfig;

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
} else {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
  };
}
firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
};

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
    courses.push({ id: doc.id, ...doc.data() } as ICourse);
  });

  return courses;
};


export const addImg = async (id: string, imageFile: File | null): Promise<string | void> => {

  const imageRef = ref(storage, id);
  if (imageFile) {
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
    // return Promise.resolve('');
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
    courses: arrayRemove(oldCourse),
  });
  await updateDoc(coursesRef, {
    courses: arrayUnion(updatedCourse),
  });
};

export const removeCourseArray = async (course: ICourse, isDeleteImage: boolean) => {

  const coursesRef = doc(db, 'courses', 'courses');

  if (course.image_url && isDeleteImage) {
    const imageRef = ref(storage, course.id);
    await deleteObject(imageRef);
  }

  await updateDoc(coursesRef, {
    courses: arrayRemove(course),
  });
};


