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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import User from '../../assets/img/user.png';
import { BoardTaskProps } from 'utils/types';

function BoardTask({ task }: BoardTaskProps) {
  return (
    <Card sx={{ minWidth: 275, overflow: 'initial', position: 'relative' }}>
      <div className={style.close}>
        <Tooltip title="Удалить задачу">
          <CloseIcon />
        </Tooltip>
      </div>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon />
        <Typography variant="h6" component="div">
          {task.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Посмотреть задачу">
          <div className={style.icon}>
            <RemoveRedEyeIcon />
          </div>
        </Tooltip>
        <Tooltip title="Редактировать задачу">
          <div className={style.icon}>
            <EditIcon />
          </div>
        </Tooltip>
        <div className={style.users}>
          <Tooltip title="User1">
            <div className={style.user}>
              <img src={User} alt="user" />
            </div>
          </Tooltip>
          <Tooltip title="User2">
            <div className={style.user}>
              <img src={User} alt="user" />
            </div>
          </Tooltip>
        </div>
      </CardActions>
    </Card>
  );
}

export default BoardTask;
