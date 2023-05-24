import styles from './categories.module.scss';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../store/types';
import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Categories = () => {

  const navigate = useNavigate();

  return (<>
      <div>
        <IconButton color='primary' size='large' title='Добавить курс'>
          <AddCircleOutlineRoundedIcon onClick={() => {
            navigate('/add');
          }} />
        </IconButton>
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