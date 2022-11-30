import React, { useState } from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';
import EmptyBoard from './EmptyBoard';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import ColumnModal from './ColumnModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function BoardInfo() {
  const [open, setOpen] = useState(false);
  const columns = useSelector((state: RootState) => state.columns.columns);

  // const onDragEnd = (result, newColumns, setColumns) => {
  //   if (!result.destination) return;
  //   const { source, destination } = result;
  //   const [column] = data.columns.filter((el) => el.id === draggableId);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log(result);
      }}
    >
      <Paper
        sx={{
          backgroundColor: 'transparent',
          pt: '20px',
          pb: '20px',
          position: 'relative',
          overflowY: 'unset',
        }}
        elevation={0}
      >
        <Droppable droppableId="wrapper" type="column" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={style.wrapper}>
              {columns.map((column, i) => {
                return <Board column={column} key={column._id} index={i} />;
              })}

              {provided.placeholder}
              <EmptyBoard action={handleClickOpen} text="Добавить колонку" />
            </div>
          )}
        </Droppable>
      </Paper>
      <ColumnModal open={open} handleClose={handleClose} />
    </DragDropContext>
  );
}

export default BoardInfo;
