import React, { ChangeEvent, useState } from 'react';
import { FormHelperText, Typography, Input, TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import { addImg } from '../../utils/firebase/firebase.utils';
import { useNavigate, useParams } from 'react-router-dom';
import style from './course-form.module.scss';
import coursesStore from '../../store/courses';
import { observer } from 'mobx-react-lite';
import { categoriesKeys, categoriesValues, ICourse } from '../../store/types';
import MenuItem from '@mui/material/MenuItem';
import { formatPhoneNumber, getYearsString } from '../../utils/phoneNumber/phone';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';


const CourseForm = observer(() => {

  const navigate = useNavigate();
  let oldCategory = '';
  let id: string = '';
  let params = useParams();
  if (params.id) {
    id = params.id;
  }
  if (params.category) {
    oldCategory = params.category;
  }


  let course = coursesStore.courses.find(course => course.id === id);



  let [category, setCategory] = useState(course?.category || categoriesKeys[0]);

  let [name, setName] = useState(course?.name || '');
  let [nameError, setNameError] = useState({ isError: false, errorMessage: '' });

  let [contact_phone, setContact_phone] = useState(course?.contact_phone || '+375 ');
  let [contact_phoneError, setContact_phoneError] = useState({ isError: false, errorMessage: '' });

  let [department, setDepartment] = useState(course?.department || 'Отделение хореографии');

  let [description, setDescription] = useState(course?.description || '');
  let [descriptionError, setDescriptionError] = useState({ isError: false, errorMessage: '' });

  let [location_address, setLocation_address] = useState(course?.location_info.address || '');

  let [location_contact_phone, setLocation_contact_phone] = useState(course?.location_info.contact_phone || '');
  let [location_contact_phoneError, setLocation_contact_phoneError] = useState({ isError: false, errorMessage: '' });

  let [location_room_number, setLocation_room_number] = useState(course?.location_info.room_number || '');

  let [payment_term, setPayment_term] = useState(course?.payment_term || 'первый год на платной основе');

  let [program, setProgram] = useState(course?.program || '');

  let [program_duration, setProgram_duration] = useState(Number(course?.program_duration.split(' ')[0])|| 1);

  let [recruiting_is_open, setRecruiting_is_open] = useState(course?.recruiting_is_open);

  let [students_age, setStudents_age] = useState(course?.students_age || { from: 3, to: 35 });

  let [teacher_name, setTeacher_name] = useState(course?.teacher_name || '');
  let [teacher_nameError, setTeacher_nameError] = useState({ isError: false, errorMessage: '' });


  let [courseId, setCourseId] = useState(course?.id || uuidv4());

  let [imageFile, setImageFile] = useState(null as (null | File));
  let [imageError, setImageError] = useState({ isError: false, errorMessage: '' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError({isError: false, errorMessage: ''})
      setImageFile(e.target.files[0]);
    }
  };

  const submitForm = (url?: string) => {
    let newCourseData = {
      id: courseId,
      category,
      name,
      contact_phone: formatPhoneNumber(contact_phone),
      department,
      description,
      groups_schedule: course?.groups_schedule || [],
      image_url: url || course?.image_url || '',
      location_info: {
        address: location_address,
        contact_phone: formatPhoneNumber(location_contact_phone),
        room_number: location_room_number,
      },
      payment_term,
      program,
      program_duration: getYearsString(program_duration),
      recruiting_is_open,
      students_age,
      teacher_name,
    };

    course
      ? coursesStore.updateCourse(newCourseData as ICourse, oldCategory)
      : coursesStore.addCourse(newCourseData as ICourse);

    navigate('/');
  };

  const handleSubmitForm = async () => {
    let isError = false
    if (name.length === 0) {
      isError = true
      setNameError({ isError: true, errorMessage: 'Название курса не может быть пустым' });
    }
    if (description.length === 0) {
      isError = true
      setDescriptionError({ isError: true, errorMessage: 'Описание не может быть пустым' });
    }
    if(teacher_name.length === 0) {
      isError = true
      setTeacher_nameError({isError: true, errorMessage: 'Это поле не должно быть пустым'})
    }
    let correctPhone = formatPhoneNumber(contact_phone)
    if (correctPhone.length === 0) {
      isError = true
      setContact_phoneError({ isError: true, errorMessage: 'Пожалуйста, введите корректный номер телефона' });
    }
    let url
    if (imageFile) {
      url = await addImg(courseId, imageFile);
    }
    if(!(url || course?.image_url)){
      isError = true
      setImageError({isError: true, errorMessage: 'Изображение отсутствует'})
    }
    if(location_contact_phone.length > 0){
      let correctLocationPhone = formatPhoneNumber(location_contact_phone)
      if (correctLocationPhone.length === 0) {
        isError = true
        setLocation_contact_phoneError({ isError: true, errorMessage: 'Пожалуйста, введите корректный номер телефона' });
      }
    }



    if(!isError){
      if(url){
        submitForm(url)
      } else {
        submitForm()
      }
    }
  };


  return (
    <div className={style.container}>
      <Button variant='contained' onClick={() => navigate('/')}>
        Назад
      </Button>
      <form action='' className={style.form}>
        <Typography gutterBottom variant='h5' component='div'>
          Название курса
        </Typography>
        <FormControl error={nameError.isError} variant='standard' sx={{ m: 1, minWidth: 620 }}>
          <Input placeholder='Название курса' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 300) {
              setNameError({ isError: true, errorMessage: 'Название курса должно быть не более 300 символов' });
            } else {
              setNameError({ isError: false, errorMessage: '' });
              setName(e.target.value);
            }
          }} defaultValue={name}/>
          {nameError.isError &&
            <FormHelperText id='component-error-text'>{nameError.errorMessage}</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h5' component='div'>
          Набор
          {/*Набор: {course.recruiting_is_open ? <CheckCircleRoundedIcon color='success'/> : <DoNotDisturbAltRoundedIcon color='error'/> }*/}
        </Typography>
        <CheckCircleRoundedIcon color={recruiting_is_open ? 'success' : 'disabled'} onClick={()=> setRecruiting_is_open(true)}/>
        <DoNotDisturbAltRoundedIcon color={recruiting_is_open ? 'disabled' : 'error'} onClick={()=> setRecruiting_is_open(false)}/>
        <Typography gutterBottom variant='h5' component='div'>
          Направление
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 320 }} size='small'>
          <Select
            defaultValue={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}
            value={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}
            onChange={(event: SelectChangeEvent) => setCategory(categoriesKeys[categoriesValues.findIndex(cat => event.target.value === cat)])}
          >
            {categoriesValues.map(item => <MenuItem key={item} value={item}>{item} </MenuItem>)}
          </Select>
        </FormControl>

        <Typography gutterBottom variant='h6' component='div'>
          Изображение
        </Typography>
        <FormControl error={imageError.isError} variant='standard' sx={{ m: 1, minWidth: 480 }}>
        <Button
          variant='contained'
          component='label'
        >
          Добавить изображение
          <input type='file' hidden onChange={handleFileChange} />
        </Button>
        {
          imageFile ? <Typography gutterBottom variant='caption' component='div'>
            {imageFile.name}
          </Typography> : ''
        }
        {imageError.isError &&
          <FormHelperText id='component-error-text'>{imageError.errorMessage}</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Контактный телефон
        </Typography>
        <FormControl error={contact_phoneError.isError} variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Контактный телефон' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setContact_phoneError({ isError: false, errorMessage: '' });
            setContact_phone(e.target.value);
          }} type='tel' defaultValue={contact_phone} />
          {contact_phoneError.isError &&
            <FormHelperText id='component-error-text'>{contact_phoneError.errorMessage}</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Отделение
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 600 }} size='small'>
          <Select
            defaultValue={department}
            value={department}
            onChange={(event: SelectChangeEvent) => setDepartment(event.target.value)}
          >
            <MenuItem value={'Отделение хореографии'}>Отделение хореографии</MenuItem>
            <MenuItem value={'Отделение декоративно-прикладного творчества и ИЗО'}>Отделение декоративно-прикладного
              творчества и ИЗО </MenuItem>
            <MenuItem value={'Отделение туристско-краеведческой и экологической работы'}>Отделение
              туристско-краеведческой и экологической работы</MenuItem>
            <MenuItem value={'Отделение инструментальной музыки и вокального творчества'}>Отделение инструментальной
              музыки и вокального творчества</MenuItem>
            <MenuItem value={'Отделение культурно-досуговой деятельности'}>Отделение культурно-досуговой
              деятельности</MenuItem>
            <MenuItem value={'Отделение развивающего обучения'}>Отделение развивающего обучения</MenuItem>
            <MenuItem value={'Отделение интеллектуального и технического творчества'}>Отделение интеллектуального и
              технического творчества</MenuItem>
            <MenuItem value={'Отделение народного творчества'}>Отделение народного творчества</MenuItem>
          </Select>
        </FormControl>


        <Typography gutterBottom variant='h6' component='div'>
          Описание
        </Typography>
        <FormControl error={descriptionError.isError} variant='standard' sx={{ m: 1, minWidth: 720 }}>
          <TextField
            multiline
            rows={4}
            defaultValue={description}
            variant='standard'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescriptionError({ isError: false, errorMessage: '' });
              setDescription(e.target.value);
            }}
          />
          {descriptionError.isError &&
            <FormHelperText id='component-error-text'>{descriptionError.errorMessage}</FormHelperText>}
        </FormControl>

        <Typography gutterBottom variant='h6' component='div'>
          Условие оплаты
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 320 }} size='small'>
          <Select
            defaultValue={payment_term}
            value={payment_term}
            onChange={(event: SelectChangeEvent) => setPayment_term(event.target.value)}
          >
            <MenuItem value={'первый год на платной основе'}>первый год на платной основе</MenuItem>
            <MenuItem value={'обучение на безвозмездной основе'}>обучение на безвозмездной основе</MenuItem>
            <MenuItem value={'обучение на платной основе'}>обучение на платной основе</MenuItem>
          </Select>
        </FormControl>

        <Typography gutterBottom variant='h6' component='div'>
          Программа
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 520 }}>
          <Input placeholder='Программа' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProgram(e.target.value);
          }} defaultValue={program} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Продолжительность:
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 60 }}>
          <Input type='number' placeholder='Продолжительность:' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProgram_duration(Number(e.target.value));
          }} defaultValue={program_duration} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Руководитель
        </Typography>
        <FormControl error={teacher_nameError.isError} variant='standard' sx={{ m: 1, minWidth: 320 }}>
          <Input placeholder='Руководитель' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 50) {
              setTeacher_nameError({ isError: true, errorMessage: 'Не более 50 символов' });
            } else {
              setTeacher_nameError({ isError: false, errorMessage: '' });
              setTeacher_name(e.target.value);
            }

          }} defaultValue={teacher_name}/>
          {teacher_nameError.isError &&
            <FormHelperText id='component-error-text'>{teacher_nameError.errorMessage}</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Возраст обучающихся
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, width: 40 }}>
          <Input type='number' inputProps={{
            min: 3,
            max: students_age.to
          }} placeholder='с' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudents_age({ ...students_age, from: Number(e.target.value) });
          }} defaultValue={students_age.from} />
        </FormControl>
        <FormControl variant='standard' sx={{ m: 1, width: 40 }}>
          <Input type='number'  inputProps={{
            min: students_age.from,
            max: 35
          }}  placeholder='по' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudents_age({ ...students_age, to: Number(e.target.value) });
          }} defaultValue={students_age.to} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Местонахождение
        </Typography>
        <Typography gutterBottom variant='h6' component='div'>
          Адрес
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Адрес' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLocation_address(e.target.value);
          }} defaultValue={location_address} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Телефон
        </Typography>
        <FormControl error={location_contact_phoneError.isError} variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Телефон' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLocation_contact_phoneError({ isError: false, errorMessage: '' });
            setLocation_contact_phone(e.target.value);
          }} defaultValue={location_contact_phone} />
          {location_contact_phoneError.isError &&
            <FormHelperText id='component-error-text'>{location_contact_phoneError.errorMessage}</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Кабинет
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Кабинет' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLocation_room_number(e.target.value);
          }} defaultValue={location_room_number} />
        </FormControl>
        <div>
          <Button variant='contained' onClick={handleSubmitForm}>
            {course ? 'Редактировать' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default CourseForm;