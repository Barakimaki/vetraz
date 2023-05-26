import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '@mui/material';
import style from './schedule.module.scss';
import coursesStore from '../../store/courses';
import { ICourse } from '../../store/types';
import { observer } from 'mobx-react-lite';
import scheduleStore from '../../store/schedule';
import Group from '../../components/group/group.component';
import { toJS } from 'mobx';

const Schedule = observer(() => {

  const navigate = useNavigate();
  let params = useParams();
  let [course, setCourse] = useState(coursesStore.getCourse(params.id as string));
  const [newGroup, setNewGroup] = useState('');
  const [addNewGroup, setAddNewGroup] = useState(false);
  let schedule = toJS(scheduleStore.schedule);

  useEffect(() => {
    if (course?.id) {
      scheduleStore.setSchedule([...course.groups_schedule]);
    }
  }, [params.id]);


  const saveSchedule = async () => {
    if (course) {
      let newCourse: ICourse = { ...course, groups_schedule: scheduleStore.schedule };
      await coursesStore.updateCourse(newCourse, course.category);
      navigate(-1);
    }
  };


  return (
    <div className={style.container}>
      <Button variant='contained' onClick={() => navigate('/')}>Назад</Button>
      <h1>{course?.name}</h1>
      {schedule && schedule.map((group, groupIndex) => {
        return <Group group={group} groupIndex={groupIndex} />;
      })}
      {addNewGroup
        ? <div>
          <Input placeholder='Имя новой группы' onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewGroup(e.target.value);
          }} defaultValue={newGroup} />
          <Button variant='contained' onClick={() => {
            if(newGroup.length > 0) {
              scheduleStore.addNewGroup(newGroup);
              setAddNewGroup(false);
              setNewGroup('')
            }
          }}>
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
});

export default Schedule;