import React from 'react';
import styled from '@emotion/styled';

function MuiButton({ title, background, color, ...props }) {
  return (
    <button
      style={{
        backgroundColor: background,
        padding: 10,
        minWidth: '75%',
        color: color,
        borderRadius: '5px',
        border: 'none',
        fontSize: '18px',
        marginTop: '1rem',
      }}
      {...props}
    >
      {title}
    </button>
  );
}

export default MuiButton;
