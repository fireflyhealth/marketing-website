import React from 'react';

enum BorderStyle {
  None = 'none',
  Hidden = 'hidden',
  Dotted = 'dotted',
  Solid = 'solid',
}

type FontStyle = 'bold' | 'italic' | 'normal';

type BoxProps = {
  /* Put something inside the box */
  children: React.ReactNode;
  /* Choose a custom border color */
  borderColor?: string;
  /* Choose a border style */
  borderStyle?: BorderStyle;
  /* Choose a font style */
  fontStyle?: FontStyle;
};

export const Box: React.FC<BoxProps> = ({
  children,
  borderColor = 'red',
  fontStyle = 'normal',
  borderStyle = BorderStyle.Solid,
}) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid',
        borderStyle,
        borderColor,
        fontStyle,
      }}
    >
      {children}
    </div>
  );
};
