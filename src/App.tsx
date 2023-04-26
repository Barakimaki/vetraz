import './App.css';
import authStore from './store/auth';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Courses from './pages/courses/courses.component';
import SignIn from './pages/sign-in/sign-in.component';
import Settings from './pages/settings/settings.component';
import Schedule from './pages/schedule/schedule.component';
import CourseForm from './pages/course-form/course-form.component';
import { useEffect } from 'react';
import coursesStore from './store/courses';

const App = observer(() => {

  useEffect(() => {
    if(authStore.user){
      coursesStore.getCoursesState();
    }
  }, [authStore.user]);

  return (
    <div className='App'>
      <Routes>
        {authStore.user
          ?
          <>
            <Route path='/*' element={<Courses />} />
            <Route path='/edit/:id' element={<CourseForm />} />
            <Route path='/add' element={<CourseForm />} />
            <Route path='/schedule/:id' element={<Schedule />} />
            <Route path='/settings' element={<Settings />} />
          </>
          :
          <Route path='/*' element={<SignIn />} />
        }
      </Routes>
    </div>
  );
});

export default App;
