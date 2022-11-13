import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import style from './BoardTask.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';

function BoardTask() {
  return (
    <Card sx={{ minWidth: 275, overflow: 'initial', position: 'relative' }}>
      <div className={style.close}>
        <Tooltip title="Удалить задачу">
          <CloseIcon />
        </Tooltip>
      </div>
      <CardContent>
        <Typography variant="h5" component="div">
          New Task
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Посмотреть задачу">
          <RemoveRedEyeIcon />
        </Tooltip>
        <Tooltip title="Редактировать задачу">
          <EditIcon />
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default BoardTask;
