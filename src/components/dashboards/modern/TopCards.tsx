import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';
import { useSelector, useDispatch } from 'src/store/Store';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';

interface cardType {
  href: string;
  icon: string;
  title: string;
  bgcolor: string;
}

const topcards: cardType[] = [
  {
    href: '/quan-tri-kinh-doanh/giao-tiep-kinh-doanh-va-thuyet-trinh',
    icon: icon5,
    title: 'QUẢN TRỊ KINH DOANH',
    bgcolor: 'error',
  },
  {
    href: '/ke-toan/he-thong-thong-tin-ke-toan-1',
    icon: icon3,
    title: 'KẾ TOÁN',
    bgcolor: 'warning',
  },
  {
    href: '/luat-kinh-te/chuyen-de-phap-luat-chung-khoan',
    icon: icon4,
    title: 'LUẬT KINH TẾ',
    bgcolor: 'secondary',
  },

  {
    href: '/tai-chinh-ngan-hang/bao-hiem-thuong-mai-1',
    icon: icon6,
    title: 'TÀI CHÍNH NGÂN HÀNG',
    bgcolor: 'success',
  },
];

const TopCards = () => {
  const dispatch = useDispatch();
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  return (
    <Grid container spacing={3} mt={3}>
      <Grid item xs={12}>
        <Link
          to={'/mon-dai-cuong/chu-nghia-mac-lenin-1'}
          onClick={() => lgDown && dispatch(toggleMobileSidebar())}
        >
          <Box bgcolor={'primary' + '.light'} textAlign="center">
            <CardContent>
              <img src={icon2} alt={icon2} width="50" />
              <Typography color={'primary' + '.main'} variant="h4" fontWeight={600}>
                MÔN ĐẠI CƯƠNG
              </Typography>
              <Typography color={'primary' + '.main'} mt={1} variant="subtitle1" fontWeight={600}>
                (Môn chung áp dụng cho tất cả các chuyên ngành)
              </Typography>
            </CardContent>
          </Box>
        </Link>
      </Grid>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} lg={6} key={i}>
          <Link to={topcard.href} onClick={() => lgDown && dispatch(toggleMobileSidebar())}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />

                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.title}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
