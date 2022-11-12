import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';

export const MyButton = styled(MuiButton)({
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    opacity: 1,

    '&:after': {
      transform: 'scaleX(1)',
      transition: 'all 0.2s ease',
      position: 'absolute',
      content: '""',
    },
  },

  '&:after': {
    backgroundColor: '#fff',
    width: '30px',
    height: '1px',
    margin: '0 auto',
    left: 0,
    right: 0,
    bottom: '8px',
    transform: 'scaleX(0)',
    transition: 'all 0.2s ease',
    position: 'absolute',
    content: '""',
  },
});

export const ToggleButton = styled(MuiToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'inherit',
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  '&, &.Mui:hover': {
    color: 'inherit',
    border: '1px solid rgb(220 220 220 / 75%);',
    lineHeight: 1,
  },
}));
