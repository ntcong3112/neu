import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
import LogoDark from 'src/assets/images/logos/logo.jpg';
import LogoDarkRTL from 'src/assets/images/logos/logo.jpg';
import LogoLight from 'src/assets/images/logos/logo.jpg';
import LogoLightRTL from 'src/assets/images/logos/logo.jpg';
import { styled, Typography } from '@mui/material';
import { AppState } from 'src/store/Store';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled
        to="/"
        sx={{ margin: '10', display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}
      >
        {customizer.activeMode === 'dark' ? (
          <img
            src={LogoLight}
            height={customizer.TopbarHeight}
            alt="Logo"
            style={{ padding: '10px 0px' }}
          />
        ) : (
          <img
            src={LogoDark}
            height={customizer.TopbarHeight}
            alt="Logo"
            style={{ padding: '10px 0px' }}
          />
        )}
        <Typography variant="h2" color="textPrimary" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
          NEU ELEARNING
        </Typography>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled to="/" sx={{ margin: '10', display: 'flex', alignItems: 'center', gap: 1 }}>
      {customizer.activeMode === 'dark' ? (
        <img
          src={LogoDarkRTL}
          height={customizer.TopbarHeight}
          alt="Logo RTL"
          style={{ padding: '10px 0px' }}
        />
      ) : (
        <img
          src={LogoLightRTL}
          height={customizer.TopbarHeight}
          alt="Logo RTL"
          style={{ padding: '10px 0px' }}
        />
      )}
      <Typography variant="h2" color="textPrimary" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
        NEU ELEARNING
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
