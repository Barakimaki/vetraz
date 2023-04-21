import React, { ChangeEvent, useState } from 'react';
import authStore from '../../store/auth';
import style from './sign-in.module.scss';
import { FormHelperText, Typography, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const SignIn = () => {

  const [inputError, setInputError] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await authStore.setUser(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={style.container}>
      <Typography gutterBottom variant='h4' component='div'>
        Vetraz
      </Typography>
      <form action="">
        <FormControl error={inputError} variant="standard" sx={{m: 1, minWidth: 540}}>
          <Typography gutterBottom variant='h5' component='div'>
            Email
          </Typography>
          <TextField type='email' placeholder="Email" onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputError(false)
            setEmail(e.target.value)
          }}/>
          <Typography gutterBottom variant='h5' component='div'>
            Пароль
          </Typography>
          <TextField type='password' placeholder="Password" onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputError(false)
            setPassword(e.target.value)
          }}/>
          {inputError &&
            <FormHelperText id="component-error-text">Неправильные данные</FormHelperText>}
        </FormControl>
        <Button variant="contained" onClick={login}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default SignIn;