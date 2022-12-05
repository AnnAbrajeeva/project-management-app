import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';

export const ToggleButton = styled(MuiToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#fff',
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  '&, &.Mui:hover': {
    color: '#fff',
    border: '1px solid rgb(220 220 220 / 75%);',
    lineHeight: 1,
  },
}));
