import Filter from '../../components/filter/filter.component';
import { useEffect, useState } from 'react';
import coursesStore from '../../store/courses';
import styles from './courses.module.scss';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { observer } from 'mobx-react-lite';
import { SelectChangeEvent } from '@mui/material/Select';
import Course from '../../components/course/course.component';

const Courses = observer(() => {
  // useEffect(() => {
  //   coursesStore.getCoursesState()
  // }, []);

  let courses = coursesStore.courses
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('')

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  const handleAddressChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value)
  }
  const handlePaymentTermChange = (event: SelectChangeEvent) => {
    setPaymentTerm(event.target.value)
  }

  const navigate = useNavigate();


  return (
    <div>
      <Filter category={category}
              handleCategoryChange={handleCategoryChange}
              address={address}
              handleAddressChange={handleAddressChange}
              paymentTerm={paymentTerm}
              handlePaymentTermChange={handlePaymentTermChange}
      />
      <div>
        <IconButton color='primary' size='large' title='Добавить курс'>
          <AddCircleOutlineRoundedIcon onClick={() => {
            navigate('/add');
          }} />
        </IconButton>
      </div>
      <div className={styles.courses}>
        {courses
          .filter(course => {
            return (course.category === category || !category) &&
              (course.address === address || !address) &&
              (course.paymentTerm === paymentTerm || !paymentTerm);
          }).sort((a, b) => {
            if (a.courseName.toLowerCase() < b.courseName.toLowerCase())
              return -1;
            if (a.courseName.toLowerCase() > b.courseName.toLowerCase())
              return 1;
            return 0;
          })
          .map(course => <Course key={course.id} course={course} />)
        }
      </div>
    </div>
  );
});

export default Courses;