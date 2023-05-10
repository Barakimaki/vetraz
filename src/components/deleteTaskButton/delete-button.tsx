import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ICourse } from '../../store/types';


type Props = {
	course: ICourse
	handleDelete: (course: ICourse) => void
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
}

const DeleteButton = ({ course, handleDelete }: Props) => {

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<IconButton color='error' title='Удалить' onClick={() => handleOpen()}>
				<DeleteRoundedIcon />
			</IconButton>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 250
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography gutterBottom variant='h5' component='div'>
							Вы уверены, что хотите удалить?
						</Typography>
						<Button onClick={() => handleDelete(course)}>Да</Button>
						<Button onClick={() => handleClose()}>Нет</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	)

}

export default DeleteButton