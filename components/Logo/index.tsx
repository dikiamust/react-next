import React from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';

// material
import { Box, styled } from '@mui/material';

// images
import LogoOriginal from '../../public/svg/Next.js.png';

const HeaderWrap = styled(Box)(({ theme }) => ({
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '26px 80px',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: '24px',
  },
}));

interface HeaderProps {
  logo?: string;
}

const Logo = ({ logo }: HeaderProps) => {
  const router = useRouter();
  return (
    <HeaderWrap>
      <Box
        sx={{
          width: { sm: '145px', xs: '98px' },
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => router.push('/')}
      >
        <Image
          alt="Logo"
          src={
            logo === 'original'
              ? LogoOriginal
              : LogoOriginal
          }
          objectFit="fill"
          quality={100}
        />
      </Box>
    </HeaderWrap>
  );
};

export default Logo;
