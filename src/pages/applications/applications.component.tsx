import React, { useEffect } from 'react';
import styles from './applications.module.scss'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import applicationsStore from '../../store/applications';
import { observer } from 'mobx-react-lite';
import Application from '../../components/application/application.component';
const Applications = observer(() => {

  const navigate = useNavigate();

  useEffect(()=>{
    applicationsStore.getApplicationsState();
  },[])

  return (<>
      <Button onClick={() => navigate('/')}>НА ГЛАВНУЮ</Button>
      <div className={styles.applications}>
        {applicationsStore.applications.map(application => <Application
          key={application.key} application={application}/>)}
      </div>
  </>
  );
});

export default Applications;