import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import style from './course.module.scss';
import DeleteButton from '../deleteTaskButton/delete-button';
import { useNavigate } from 'react-router-dom';
import { Schedule } from '@mui/icons-material';
import coursesStore from '../../store/courses';
import { ICourse } from '../../store/types';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';

type Props = {
  course: ICourse
}

const Course = ({ course }: Props) => {

  const navigate = useNavigate();


  const deleteCourse = async (course: ICourse) => {
    await coursesStore.deleteCourse(course);
  };

  return (
    <Card sx={{ minHeight: 460 }}>
      <CardMedia
        component='img'
        height='140'
        image={course.image_url}
        alt=''
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {course.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Контактный телефон: {course.contact_phone}
        </Typography>
        <Typography variant='body1' color='text.primary'>
          Направление: {course.department}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          Возраст обучающихся: {course.students_age?.from}-{course.students_age?.to}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          Продолжительность: {course.program_duration}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          {course.program}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          Набор: {course.recruiting_is_open ? <CheckCircleRoundedIcon color='success'/> : <DoNotDisturbAltRoundedIcon color='error'/> }
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {course.description}
        </Typography>
        <Typography variant='body2' color='error.main'>
          {course.payment_term}
        </Typography>
        <Typography variant='body1' color='text.primary'>
          {course.teacher_name}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Местонахождение
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Адрес: {course.location_info.address}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Телефон: {course.location_info.contact_phone}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Кабинет: {course.location_info.room_number}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={style.parentFlexSplit}>
        <IconButton color='primary'
                    title='Редактировать'
                    onClick={() => {
                      navigate(`/edit/${course.id}`);
                    }}>
          <EditIcon />
        </IconButton>
        <IconButton color='default'
                    title='Расписание'
                    onClick={() => {
                      navigate(`/schedule/${course.id}`);
                    }}>
          <Schedule />
        </IconButton>
        <div className={style.rightAlignItem}>
          <DeleteButton course={course} handleDelete={deleteCourse} />
        </div>
      </CardActions>
    </Card>
  );
};

export default Course;