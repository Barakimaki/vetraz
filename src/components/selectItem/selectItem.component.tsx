import React, { ChangeEvent, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import DeleteButton from '../deleteTaskButton/delete-button'
import { Button, Input } from '@mui/material'
import coursesStore from '../../store/courses';
import { Common } from '../../store/types';

type Props = {
	item: string
	items: string[]
	name: string
	handleChange: (event: SelectChangeEvent) => void
	size: number
}

const SelectItem = ({ item, items, name, handleChange, size}: Props) => {




	return (
		<FormControl sx={{ m: 1, minWidth: size }} size='small'>
			<Select
				defaultValue={item}
				value={item}
				label={item}
				onChange={handleChange}
			>
				{items.map(item => <MenuItem key={item} value={item}>{item} </MenuItem>)}
			</Select>
		</FormControl>
	)
}

export default SelectItem