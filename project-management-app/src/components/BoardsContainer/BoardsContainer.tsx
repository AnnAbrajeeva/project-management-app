import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import BoardCard from 'components/BoardCard/BoardCard';
import EmptyBoard from '../BoardInfo/EmptyBoard';
import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import { fetchBoards } from 'redux/thunks';
import Loader from 'components/Loader';
import { Board } from 'utils/types';

function BoardsContainer() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { status, boards } = useSelector((state: RootState) => state.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  function handleClose() {
    setOpen(false);
  }

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <Grid container sx={{ position: 'relative' }}>
      {boards.map((board: Board, i) => {
        return (
          <Grid key={board._id} item xs={12} md={6} lg={4}>
            <BoardCard board={board} index={i} />
          </Grid>
        );
      })}

      <Grid sx={{ padding: '30px' }} item xs={12} md={6} lg={4}>
        <EmptyBoard action={() => setOpen(true)} text="Добавить доску" />
      </Grid>
      <Modal open={open} title="Добавить доску" handleClose={handleClose}>
        {<AddBoard />}
      </Modal>
    </Grid>
  );
}

export default BoardsContainer;

const AddBoard = () => {
  const [personName, setPersonName] = useState<string[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <form action="">
      <TextField
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label="Введите название доски"
        defaultValue="Hello World"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Добавьте исполнителей</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          margin="dense"
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Добавьте исполнителей" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};
