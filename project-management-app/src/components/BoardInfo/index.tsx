import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';
import EmptyBoard from './EmptyBoard';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import ColumnModal from './ColumnModal';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { fetchTasks, updateColumn, updateColumnOrder, updateOrderTask } from 'redux/thunks';
import { Column, Task } from 'utils/types';
import { useParams } from 'react-router-dom';

function BoardInfo() {
  const [open, setOpen] = useState(false);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const [columnsArr, setColumnsArr] = useState(columns);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const newColumns = [...columns];
    newColumns.sort((a, b) => a.order - b.order);
    setColumnsArr(newColumns);
  }, [columns]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, type, draggableId, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const col = [...columns];
      const spliced = col.splice(source.index, 1)[0];
      col.splice(destination.index, 0, spliced);
      setColumnsArr(col);
      const newOrder = col.map((column, i) => {
        return {
          _id: column._id,
          order: i + 1,
        };
      });
      await dispatch(updateColumnOrder(newOrder));
      columns.map(async (column) => {
        await dispatch(
          fetchTasks({ id: columns[destination.index].boardId, columnId: column._id })
        );
      });
    } else {
      const colArr = [...columnsArr];
      const [sourceGroup] = colArr.filter((column) => column._id === source.droppableId);

      const destinationGroup = destination
        ? colArr.find((column) => column._id === destination.droppableId)
        : { ...sourceGroup };

      const movingTask: Task | undefined = sourceGroup?.tasks?.find(
        (task) => task._id === draggableId
      );

      const sourceTasks = [...sourceGroup.tasks!];
      const destinationTasks = [...destinationGroup!.tasks!];

      sourceTasks.splice(source.index, 1);

      destinationTasks.splice(destination.index, 0, movingTask!);

      const newTaskList = colArr.map((column) => {
        if (column._id === source.droppableId) {
          return {
            ...column,
            tasks: sourceTasks,
          };
        }
        if (column._id === destination.droppableId) {
          return {
            ...column,
            tasks: destinationTasks,
          };
        }

        return column;
      });

      const newOrder = destinationTasks.map((task, i) => {
        return {
          _id: task._id,
          order: i + 1,
          columnId: destination.droppableId,
        };
      });

      const sourceOrderTask = sourceTasks.map((task, i) => {
        return {
          _id: task._id,
          order: i + 1,
          columnId: source.droppableId,
        };
      });

      setColumnsArr(newTaskList);

      if (source.droppableId === destination.droppableId) {
        dispatch(updateOrderTask({ columnId: source.droppableId, tasks: newOrder }));
      } else {
        await dispatch(updateOrderTask({ columnId: source.droppableId, tasks: sourceOrderTask }));
        await dispatch(updateOrderTask({ columnId: destination.droppableId, tasks: newOrder }));
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result);
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
              {columnsArr.map((column, i) => {
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
