import { daysKeys, IGroup } from '../../store/types';
import scheduleStore from '../../store/schedule';
import style from './group.module.scss';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { dividerClasses } from '@mui/material';
import LessonForm from '../lesson-form/lesson-form.component';

let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];


type Props = {
  group: IGroup,
  groupIndex: number
}

const Group = ({ group, groupIndex }: Props) => {


  return (
    <div>
      <h2>{group.group_name}
        <IconButton color='error'
                    title='Удалить группу'
                    onClick={() => scheduleStore.deleteGroup(groupIndex)}
        >
          <ClearIcon />
        </IconButton>
      </h2>
      <div className={style.week}>
        {days.map((day, dayIndex) => {
          return <div className={style.day}>
            <h3>{day}</h3>
            <hr />
            {group.weekly_schedule[daysKeys[dayIndex]] &&
              group.weekly_schedule[daysKeys[dayIndex]]?.map((lesson, lessonIndex) => <div key={daysKeys[dayIndex]}>
                <span>{lesson}</span>
                <IconButton color='error'
                            title='Удалить занятие'
                            onClick={() => scheduleStore.deleteLesson(groupIndex,daysKeys[dayIndex],lessonIndex)}>
                  <ClearIcon />
                </IconButton>
              </div>)
            }
            <LessonForm groupIndex={groupIndex} day={daysKeys[dayIndex]}/>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Group;