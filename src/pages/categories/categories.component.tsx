import styles from './categories.module.scss';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../store/types';
import { Button, Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React from 'react';

const Categories = () => {

  const navigate = useNavigate();

  return (<>
      <div>
        <IconButton color='primary' size='large' title='Добавить курс'>
          <AddCircleOutlineRoundedIcon onClick={() => {
            navigate('/add');
          }} />
        </IconButton>
        <Button variant='contained' onClick={() => navigate('/applications')}>
          Заявки
        </Button>
      </div>
      <div className={styles.categories}>

        {categories.map(([category, name]) => <Card key={category} sx={{ minHeight: 120 }}
                                                    className={styles.category}
                                                    onClick={() => {
                                                      navigate(`/courses/${category}`);
                                                    }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {name}
              </Typography>
            </CardContent>
          </Card>,
        )}
      </div>
    </>
  );
};

export default Categories;