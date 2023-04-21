import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import style from './settings.module.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import coursesStore, { Common } from '../../store/courses';
import { observer } from 'mobx-react-lite';

const Settings = observer(() => {

  const navigate = useNavigate();

  const handleDeleteItem = async (item: string, itemFrom: 'addresses' | 'categories' | 'paymentTerms') => {
    const newCommon: Common = {
      addresses: coursesStore.addresses,
      categories: coursesStore.categories,
      paymentTerms: coursesStore.paymentTerms,
    };
    switch (itemFrom) {
      case 'addresses': {
        newCommon.addresses = [...coursesStore.addresses].filter(address => (address !== item));
        break;
      }
      case 'categories': {
        newCommon.categories = [...coursesStore.categories].filter(category => (category !== item));
        break;
      }
      case 'paymentTerms': {
        newCommon.paymentTerms = [...coursesStore.paymentTerms].filter(category => (category !== item));
        break;
      }
    }
    await coursesStore.updateCommon(newCommon);

  };
  return (
    <div className={style.container}>
      <Button variant='contained' onClick={() => navigate('/')}>
        Назад
      </Button>
      <div className={style.settings}>
        <div>
          <h2>Направление</h2>
          {coursesStore.categories.map(category => <div>
              <span>{category}</span>
              <IconButton color='error'
                          title='Удалить'
                          onClick={() => handleDeleteItem(category, 'categories')}>
                <ClearIcon />
              </IconButton>
            </div>,
          )}
        </div>
        <div>
          <h2>
            Адрес
          </h2>
          {coursesStore.addresses.map(address => <div>
              <span>{address}</span>
              <IconButton color='error'
                          title='Удалить'
                          onClick={() => handleDeleteItem(address, 'addresses')}>
                <ClearIcon />
              </IconButton>
            </div>,
          )}
        </div>
        <div>
          <h2>
            Условие оплаты
          </h2>
          {coursesStore.paymentTerms.map(paymentTerm => <div>
              <span>{paymentTerm}</span>
              <IconButton color='error'
                          title='Удалить'
                          onClick={() => handleDeleteItem(paymentTerm, 'paymentTerms')}>
                <ClearIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>


    </div>
  );
});

export default Settings;