import './App.css';
import authStore from './store/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Courses from './pages/courses/courses.component';
import SignIn from './pages/sign-in/sign-in.component';
// import Schedule from './pages/schedule/schedule.component';
import CourseForm from './pages/course-form/course-form.component';
import Categories from './pages/categories/categories.component';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const App = observer(() => {

  const navigate = useNavigate();

  return (
    <div className='App'>
      <div>
        <IconButton color='primary' size='large' title='Добавить курс'>
          <AddCircleOutlineRoundedIcon onClick={() => {
            navigate('/add');
          }} />
        </IconButton>
      </div>
      <Routes>
        {authStore.user
          ?
          <>
            <Route path='/*' element={<Categories />}/>
            <Route path='/courses/:category' element={<Courses />} />
            <Route path='/edit/:category/:id' element={<CourseForm />} />
            <Route path='/add' element={<CourseForm />} />
            {/*<Route path='/schedule/:id' element={<Schedule />} />*/}
          </>
          :
          <Route path='/*' element={<SignIn />} />
        }
      </Routes>
    </div>
  );
});

export default App;
