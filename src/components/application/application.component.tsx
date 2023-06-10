import React from 'react';
import { IApplication } from '../../store/types';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import applicationsStore from '../../store/applications';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';

type Props = {
  application: IApplication;
}

const Application = ({ application }: Props) => {

  const deleteApplication = async (key: string) => {
    await applicationsStore.deleteApplication(application.key);
  };

  return (
    <Card sx={{ minHeight: 220 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {application.courseName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {application.name} {application.surname}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Контактный телефон: {application.contactPhone}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          email: {application.email}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Дата рождения: {application.birthday}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Адрес: {application.address}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Школа: {application.schoolName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color='error' title='Удалить' onClick={() => deleteApplication(application.key)}>
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Application;