import React, { ChangeEvent, useState } from 'react';
import scheduleStore from '../../store/schedule';
import { Button, FormControl, Input } from '@mui/material';
import { dayKey } from '../../store/types';

type Props = {
  groupIndex: number
  day: dayKey
}

const LessonForm = ({ groupIndex, day }: Props) => {


  let [fromHours, setFromHours] = useState(0);
  let [fromMinutes, setFromMinutes] = useState(0);
  let [toHours, setToHours] = useState(0);
  let [toMinutes, setToMinutes] = useState(0);

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, width: 50 }}>
        <Input inputProps={{
          min: 0,
          max: 23,
        }} type='number' placeholder='0'
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 Number(e.target.value) > 23
                   ? setFromHours(23)
                   : Number(e.target.value) < 0
                     ? setFromHours(0)
                     : setFromHours(Number(e.target.value));
               }} defaultValue={0} />
      </FormControl>
      :
      <FormControl variant='standard' sx={{ m: 1, width: 50 }}>
        <Input inputProps={{
          min: 0,
          max: 59,
        }} type='number' placeholder='0'
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 Number(e.target.value) > 59
                   ? setFromMinutes(59)
                   : Number(e.target.value) < 0
                     ? setFromMinutes(0)
                     : setFromMinutes(Number(e.target.value));
               }} defaultValue={0} />
      </FormControl>
      -
      <FormControl variant='standard' sx={{ m: 1, width: 50 }}>
        <Input inputProps={{
          min: 0,
          max: 23,
        }} type='number' placeholder='0'
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 Number(e.target.value) > 23
                   ? setToHours(23)
                   : Number(e.target.value) < 0
                     ? setToHours(0)
                     : setToHours(Number(e.target.value));
               }} defaultValue={0} />
      </FormControl>
      :
      <FormControl variant='standard' sx={{ m: 1, width: 50 }}>
        <Input inputProps={{
          min: 0,
          max: 59,
        }} type='number' placeholder='0'
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 Number(e.target.value) > 59
                   ? setToMinutes(59)
                   : Number(e.target.value) < 0
                     ? setToMinutes(0)
                     : setToMinutes(Number(e.target.value));
               }} defaultValue={0} />
      </FormControl>
      <Button variant='contained'
              onClick={() => {
                let lesson = `${fromHours < 10 ? '0' + fromHours : fromHours}:${fromMinutes < 10 ? '0' + fromMinutes : fromMinutes}-${toHours < 10 ? '0' + toHours : toHours}:${toMinutes < 10 ? '0' + toMinutes : toMinutes}`;
                scheduleStore.addLesson(groupIndex, day, lesson);
              }}>
        Принять
      </Button>
    </div>
  );
};

export default LessonForm;