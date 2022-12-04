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
import { Task } from 'utils/types';
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

    const columnIndex = columns.findIndex((column) => column._id === destination.droppableId);

    if (type === 'column') {
      const newParams = {
        boardId: columns[columnIndex].boardId,
        _id: columns[columnIndex]._id,
        title: columns[columnIndex].title,
        order: destination.index + 1,
      };
      const col = [...columns];
      col.splice(columnIndex, 1);
      col.splice(destination.index, 1, newParams);
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
      const tasks = [...columns[columnIndex].tasks!];
      const taskIndex = tasks.findIndex((task) => task._id === draggableId);
      if (source.droppableId === destination.droppableId) {
        const newTask = {
          ...tasks[taskIndex],
          order: destination.index + 1,
        };

        tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, newTask);
      } else {
        const newTask = {
          ...columns[columnIndex].tasks![taskIndex],
          order: destination.index + 1,
          columnId: destination.droppableId,
        };
        columns[columnIndex].tasks!.splice(source.index, 1);
        columns[columnIndex].tasks!.splice(destination.index, 0, newTask);
      }

      const newTaskArr = tasks.map((task, index) => {
        return {
          ...task,
          order: index + 1,
        };
      });
      console.log(newTaskArr);
      const newOrder = newTaskArr.map((task: Task) => {
        return {
          _id: task._id,
          order: task.order,
          columnId: task.columnId,
        };
      });

      await dispatch(updateOrderTask({ columnId: destination.droppableId, tasks: newOrder }));
      // Promise.all(
      //   columns.map((column) => {
      //     dispatch(fetchTasks({ id: column.boardId, columnId: column._id }));
      //   })
      // );
      // const columnIndex = tasks.findIndex((column) => column.columnId === destination.droppableId);
      // const columnTasks = tasks.find((item) => item.columnId === source.droppableId);
      // if (columnTasks) {
      //   const task = columnTasks.find((task) => task._id === draggableId);

      //   const column = columnTasks.find((column) => column._id === task!.columnId);
      //   const tasksArr = columnTasks.filter((task) => task.columnId === column?._id);
      //   const index = tasksArr.findIndex((task) => task._id === draggableId);
      //   if (source.droppableId === destination.droppableId) {
      //     const newTask = {
      //       ...task!,
      //       order: destination.index + 1,
      //     };
      //     tasksArr.splice(index, 1);
      //     tasksArr.splice(destination.index, 0, newTask);
      //     const newTaskArr = tasksArr.map((task, index) => {
      //       return {
      //         ...task,
      //         order: index + 1,
      //       };
      //     });
      //     console.log(newTaskArr);
      //     const newOrder = newTaskArr.map((task) => {
      //       return {
      //         _id: task._id,
      //         order: task.order,
      //         columnId: task.columnId,
      //       };
      //     });
      //     console.log(newOrder);
      //     await dispatch(updateOrderTask({ columnId: destination.droppableId, tasks: newOrder }));
      //     Promise.all(
      //       columns.map((column) => {
      //         dispatch(fetchTasks({ id: column.boardId, columnId: column._id }));
      //       })
      //     );
      //   }
      // }
      console.log(result);
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
