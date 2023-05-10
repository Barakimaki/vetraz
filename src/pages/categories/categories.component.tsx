import styles from './categories.module.scss';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../store/types';
import { Card, CardContent, Typography } from '@mui/material';

const Categories = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.categories}>
      {categories.map(([category, name]) => {
        return <Card key={category} sx={{ minHeight: 120}}
                     className={styles.category}
                     onClick={() => {
                       navigate(`/courses/${category}`);
                     }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {name}
            </Typography>
          </CardContent>
        </Card>;
      })}
    </div>
  );
};

export default Categories;