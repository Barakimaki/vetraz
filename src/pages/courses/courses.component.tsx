import { useEffect} from 'react';
import coursesStore from '../../store/courses';
import styles from './courses.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Course from '../../components/course/course.component';
import { Button, Typography } from '@mui/material';
import { categories } from '../../store/types';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Courses = observer(() => {
  let category: string = '';
  let params = useParams();
  if (params.category) {
    category = params.category;
  }
  let courses = coursesStore.courses
  useEffect(() => {
    if(category) {
      coursesStore.getCoursesState(category)
    }
  }, [category]);

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <IconButton color='primary' size='large' title='Добавить курс'>
          <AddCircleOutlineRoundedIcon onClick={() => {
            navigate('/add');
          }} />
        </IconButton>
      </div>
      <Typography className={styles.category} gutterBottom variant='h5' component='div'>
        {categories[categories.findIndex(([cat, nam]) => cat === category )][1]}
      </Typography>
      <Button onClick={() => navigate('/')}>НА ГЛАВНУЮ</Button>
      <div className={styles.courses}>
        {courses
          .map(course => <Course key={course.id} course={course} />)
        }
      </div>
    </div>
  );
});

export default Courses;