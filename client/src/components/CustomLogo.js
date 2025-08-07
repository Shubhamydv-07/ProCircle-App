import React from 'react';
import { Box } from '@mui/material';

const CustomLogo = ({ size = 40, color = '#20B2AA', ...props }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill={color} />
        
        {/* Three spiral bands that curve outward */}
        {/* Outer band - largest spiral */}
        <path
          d="M50 5 C70 5 85 20 85 50 C85 80 70 95 50 95 C30 95 15 80 15 50 C15 20 30 5 50 5"
          stroke="white"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Middle band - medium spiral */}
        <path
          d="M50 20 C65 20 75 30 75 50 C75 70 65 80 50 80 C35 80 25 70 25 50 C25 30 35 20 50 20"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Inner band - smallest spiral */}
        <path
          d="M50 35 C60 35 65 40 65 50 C65 60 60 65 50 65 C40 65 35 60 35 50 C35 40 40 35 50 35"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

export default CustomLogo; 