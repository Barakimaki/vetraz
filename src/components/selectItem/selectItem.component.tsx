import React, { ChangeEvent, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import DeleteButton from '../deleteTaskButton/delete-button'
import { Button, Input } from '@mui/material'
import coursesStore, { Common } from '../../store/courses';

type Props = {
	item: string
	items: string[]
	name: string
	handleChange: (event: SelectChangeEvent) => void
	size: number
}

const SelectItem = ({ item, items, name, handleChange, size}: Props) => {

	const [newItem, setNewItem] = useState('')
	const [addNewItem, setAddNewItem] = useState(false)


	const handleAddItem = (item: string) => {
		const newCommon: Common = {
			addresses: [...coursesStore.addresses],
			categories: [...coursesStore.categories],
			paymentTerms: [...coursesStore.paymentTerms]
		}
		if (item) {
			if (name === 'Адрес') {
				newCommon.addresses = [...newCommon.addresses, item]
			}
			if (name === 'Направление') {
				newCommon.categories = [...newCommon.categories, item]
			}
			if (name === 'Условие оплаты') {
				newCommon.paymentTerms = [...newCommon.paymentTerms, item]
			}
			coursesStore.updateCommon(newCommon)
			setNewItem('')
		}
		setAddNewItem(false)
	}


	return (
		<FormControl sx={{ m: 1, minWidth: size }} size='small'>
			<InputLabel>{name}</InputLabel>
			<Select
				value={item}
				label={name}
				onChange={handleChange}
			>
				<MenuItem value=''>
					<em>Все</em>
				</MenuItem>
				{items.map(item => <MenuItem key={item} value={item}>{item} </MenuItem>)}
				{addNewItem
					? <div>
						<Input placeholder='Новое значение' onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setNewItem(e.target.value)
						}} />
						<Button variant='contained' onClick={() => handleAddItem(newItem)}>
							Добавить
						</Button>
					</div>
					: <div>
						<Button variant='contained' onClick={() => {
							setAddNewItem(true)
						}}>
							Добавить новое значение
						</Button>
					</div>
				}
			</Select>
		</FormControl>
	)
}

export default SelectItem