import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '@mui/material';
import style from './schedule.module.scss';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import coursesStore from '../../store/courses';
import { ICourse, IGroup, ILesson } from '../../store/types';


let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const Schedule = () => {

  const [newGroup, setNewGroup] = useState('');
  const [addNewGroup, setAddNewGroup] = useState(false);
  const [newLesson, setNewLesson] = useState({ from: '', to: '' });

  const navigate = useNavigate();

  let id: string = '';
  let params = useParams();
  if (params.id) {
    id = params.id;
  }
  let course = coursesStore.courses.find(course => course.id === id);

  let [schedule, setSchedule] = useState(course?.groups_schedule || [] as IGroup[]);

  useEffect(() => {
    if (course) {
      setSchedule(course.groups_schedule);
    }
  }, [course]);

  const handleAddGroup = (groupName: string) => {
    let newSchedule = [...schedule, {
      groupName, week: [
        { lessons: [] },
        { lessons: [] },
        { lessons: [] },
        { lessons: [] },
        { lessons: [] },
        { lessons: [] },
        { lessons: [] },
      ],

    }];
    setSchedule(newSchedule);
    setAddNewGroup(false);
  };

  const handleAddLesson = (lesson: ILesson, groupIndex: number, dayIndex: number) => {
    if (lesson.from && lesson.to) {
      let newSchedule: IGroup[] = JSON.parse(JSON.stringify(schedule));
      newSchedule[groupIndex].week[dayIndex].lessons = [...newSchedule[groupIndex].week[dayIndex].lessons, lesson];
      newSchedule[groupIndex].week[dayIndex].lessons = newSchedule[groupIndex].week[dayIndex].lessons.sort((a, b) => {
        if (a.from < b.from)
          return -1;
        if (a.from > b.from)
          return 1;
        return 0;
      });
      setSchedule(newSchedule);
    }
    setNewLesson({ from: '', to: '' });
  };

  const deleteLesson = (groupIndex: number, dayIndex: number, lessonIndex: number) => {
    let newSchedule: IGroup[] = JSON.parse(JSON.stringify(schedule));
    newSchedule[groupIndex].week[dayIndex].lessons = newSchedule[groupIndex].week[dayIndex].lessons.filter((lesson, index) => {
      return index !== lessonIndex;
    });
    setSchedule(newSchedule);
  };

  const deleteGroup = (groupIndex: number) => {
    let newSchedule: IGroup[] = JSON.parse(JSON.stringify(schedule));
    newSchedule = newSchedule.filter((group, index) => {
      return index !== groupIndex;
    });
    setSchedule(newSchedule);
  };

  const saveSchedule = async () => {
    if (course) {
      let newCourse: ICourse = { ...course, schedule };
      await coursesStore.updateCourse(newCourse, course);
      navigate('/');
    }
  };


  return (
    <div className={style.container}>
      <Button variant='contained' onClick={() => navigate('/')}>
        Назад
      </Button>
      <div>
        <h1>{course?.name}</h1>
        {schedule.map((group, groupIndex) => {
          return <div>
            <h2>{group.group_name}
              <IconButton color='error'
                          title='Удалить группу'
                          onClick={() => deleteGroup(groupIndex)}
              >
                <ClearIcon />
              </IconButton>
            </h2>
            <div className={style.week}>
              {group.week.map((day, dayIndex) => {
                return <div className={style.day}>
                  <h3>{days[dayIndex]}</h3>
                  <hr />
                  {day.lessons.map((lesson, lessonIndex) => <div>
                      <span>{lesson.from} - {lesson.to}</span>
                      <IconButton color='error'
                                  title='Удалить занятие'
                                  onClick={() => deleteLesson(groupIndex, dayIndex, lessonIndex)}>
                        <ClearIcon />
                      </IconButton>
                    </div>,
                  )}
                  <div>
                    <FormControl variant='standard' sx={{ m: 1, width: 60 }}>
                      <Input type='text' placeholder='с'
                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               setNewLesson({ ...newLesson, from: e.target.value });
                             }} defaultValue={''} />
                    </FormControl>
                    <FormControl variant='standard' sx={{ m: 1, width: 60 }}>
                      <Input type='text' placeholder='по'
                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               setNewLesson({ ...newLesson, to: e.target.value });
                             }} defaultValue={''} />
                    </FormControl>
                    <Button variant='contained'
                            onClick={() => handleAddLesson(newLesson, groupIndex, dayIndex)}>
                      Принять
                    </Button>
                  </div>
                </div>;
              })}
            </div>
          </div>;
        })}
      </div>
      {addNewGroup
        ? <div>
          <Input placeholder='Имя новой группы' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewGroup(e.target.value);
          }} />
          <Button variant='contained' onClick={() => handleAddGroup(newGroup)}>
            Добавить
          </Button>
        </div>
        : <div>
          <Button variant='contained' onClick={() => {
            setAddNewGroup(true);
          }}>
            Добавить новую группу
          </Button>
        </div>
      }
      <div className={style.button}>
        <Button variant='outlined' onClick={() => {
          saveSchedule();
        }}>
          Сохранить расписание
        </Button>
      </div>

    </div>
  );
};

export default Schedule;