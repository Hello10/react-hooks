import React from 'react';

import useTheme from './useTheme';
import Title from './Title';
import Button from './Button';

export default function Application () {
  const theme = useTheme();

  const style = {
    light: {
      backgroundColor: 'white',
      color: 'black'
    },
    dark: {
      backgroundColor: 'black',
      color: 'white'
    }
  }[theme.mode];

  return (
    <div
      className="Application"
      style={style}
    >
      <Title/>
      <Button/>
    </div>
  );
}
