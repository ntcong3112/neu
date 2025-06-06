import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import SearchTable from '../tables/SearchTable';
import DonateQRCard from 'src/components/apps/donate/Donate';

const Donate = () => {
  return (
    <PageContainer title="Modern Dashboard" description="this is Modern Dashboard page">
      <Box>
        <DonateQRCard qrSrc={`${process.env.PUBLIC_URL}/qr.jpg`} />;
      </Box>
    </PageContainer>
  );
};

export default Donate;
