import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import coursesStore from '../../store/courses';
import SelectItem from '../selectItem/selectItem.component';
import { observer } from 'mobx-react-lite';

type Props = {
  category: string,
  handleCategoryChange: (event: SelectChangeEvent) => void,
  address: string,
  handleAddressChange: (event: SelectChangeEvent) => void,
  paymentTerm: string,
  handlePaymentTermChange: (event: SelectChangeEvent) => void,
}

const Filter = observer(({
                           category,
                           handleCategoryChange,
                           address,
                           handleAddressChange,
                           paymentTerm,
                           handlePaymentTermChange,
                         }: Props) => {

  const navigate = useNavigate();


  return (
    <>
      <SelectItem item={category}
                  items={coursesStore.categories}
                  name={'Направление'}
                  handleChange={handleCategoryChange}
                  size={320}
      />
      <SelectItem item={address}
                  items={coursesStore.addresses}
                  name={'Адрес'}
                  handleChange={handleAddressChange}
                  size={320}
      />
      <SelectItem item={paymentTerm}
                  items={coursesStore.paymentTerms}
                  name={'Условие оплаты'}
                  handleChange={handlePaymentTermChange}
                  size={320}
      />
      <IconButton color='default' size='large' title='настройки'>
        <SettingsIcon onClick={() => {
          navigate('/settings');
        }} />
      </IconButton>
    </>
  );
});

export default Filter;