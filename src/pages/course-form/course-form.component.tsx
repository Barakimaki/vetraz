import React, { ChangeEvent, useState } from 'react';
import { FormHelperText, Typography, Input, TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SelectItem from '../../components/selectItem/selectItem.component';
import { v4 as uuidv4 } from 'uuid';
import { addImg } from '../../utils/firebase/firebase.utils';
import { useNavigate, useParams } from 'react-router-dom';
import style from './course-form.module.scss';
import coursesStore from '../../store/courses';
import { observer } from 'mobx-react-lite';
import {  categoriesKeys, categoriesValues, ICourse } from '../../store/types';
import MenuItem from '@mui/material/MenuItem';


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


  let [inputError, setInputError] = useState(false);
  let [category, setCategory] = useState(course?.category || categoriesKeys[0]);
  let [name, setName] = useState(course?.name || '');
  let [contact_phone, setContact_phone] = useState(course?.contact_phone || '');
  let [department, setDepartment] = useState(course?.category || '');
  let [description, setDescription] = useState(course?.description || '');
  let [location_address, setLocation_address] = useState(course?.location_info.address || '');
  let [location_contact_phone, setLocation_contact_phone] = useState(course?.location_info.contact_phone || '');
  let [location_room_number, setLocation_room_number] = useState(course?.location_info.room_number || '');
  let [payment_term, setPayment_term] = useState(course?.payment_term || '');
  let [program, setProgram] = useState(course?.program || '');
  let [program_duration, setProgram_duration] = useState(course?.program_duration || '');
  let [recruiting_is_open, setRecruiting_is_open] = useState(course?.recruiting_is_open || true);
  let [students_age, setStudents_age] = useState(course?.students_age || { from: 1, to: 99 });
  let [teacher_name, setTeacher_name] = useState(course?.teacher_name || '');

  let [courseId, setCourseId] = useState(course?.id || uuidv4());


  let [imageFile, setImageFile] = useState(null as (null | File));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const submitForm = (url?: string) => {
    let newCourseData = {
      id: courseId,
      category,
      name,
      contact_phone,
      department,
      description,
      groups_schedule: course?.groups_schedule || [],
      image_url: url || course?.image_url || '',
      location_info: {
        address: location_address,
        contact_phone: location_contact_phone,
        room_number: location_room_number,
      },
      payment_term,
      program,
      program_duration,
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

    if (name.length > 0) {
      if (imageFile) {
        let url = await addImg(courseId, imageFile);
        if (url) {
          submitForm(url);
        }

      } else {
        submitForm();
      }
    } else {
      setInputError(true);
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
        <FormControl error={inputError} variant='standard' sx={{ m: 1, minWidth: 620 }}>
          <Input placeholder='Название курса' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputError(false);
            setName(e.target.value);
          }} defaultValue={name} />
          {inputError &&
            <FormHelperText id='component-error-text'>Название не может быть пустым</FormHelperText>}
        </FormControl>
        <Typography gutterBottom variant='h5' component='div'>
          Направление
        </Typography>
        {/*<SelectItem item={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}*/}
        {/*            items={categoriesValues}*/}
        {/*            name={'Направление'}*/}
        {/*            handleChange={(event: SelectChangeEvent) => setCategory(categoriesKeys[categoriesValues.findIndex(cat => event.target.value === cat)])}*/}
        {/*            size={320}*/}
        {/*/>*/}
        <FormControl sx={{ m: 1, minWidth: 320 }} size='small'>
          <Select
            defaultValue={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}
            value={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}
            label={categoriesValues[categoriesKeys.findIndex(cat => category === cat)]}
            onChange={(event: SelectChangeEvent) => setCategory(categoriesKeys[categoriesValues.findIndex(cat => event.target.value === cat)])}
          >
            {categoriesValues.map(item => <MenuItem key={item} value={item}>{item} </MenuItem>)}
          </Select>
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Изображение
        </Typography>
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
        <Typography gutterBottom variant='h6' component='div'>
          Контактный телефон
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Контактный телефон' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setContact_phone(e.target.value);
          }} type='tel' defaultValue={contact_phone} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Отделение
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Отделение' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDepartment(e.target.value);
          }} defaultValue={department} />
        </FormControl>


        <Typography gutterBottom variant='h6' component='div'>
          Описание
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 720 }}>
          <TextField
            multiline
            rows={4}
            defaultValue={description}
            variant='standard'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>

        <Typography gutterBottom variant='h6' component='div'>
          Условие оплаты
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Условие оплаты' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPayment_term(e.target.value);
          }} defaultValue={payment_term} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Программа
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Программа' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProgram(e.target.value);
          }} defaultValue={program} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Продолжительность:
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Продолжительность:' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProgram_duration(e.target.value);
          }} defaultValue={program_duration} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Руководитель
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 320 }}>
          <Input placeholder='Руководитель' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher_name(e.target.value);
          }} defaultValue={teacher_name} />
        </FormControl>
        <Typography gutterBottom variant='h6' component='div'>
          Возраст обучающихся
        </Typography>
        <FormControl variant='standard' sx={{ m: 1, width: 40 }}>
          <Input type='number' placeholder='с' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudents_age({ ...students_age, from: Number(e.target.value) });
          }} defaultValue={students_age.from} />
        </FormControl>
        <FormControl variant='standard' sx={{ m: 1, width: 40 }}>
          <Input type='number' placeholder='по' onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
        <FormControl variant='standard' sx={{ m: 1, minWidth: 240 }}>
          <Input placeholder='Телефон' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLocation_contact_phone(e.target.value);
          }} defaultValue={location_contact_phone} />
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