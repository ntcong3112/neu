import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import SearchTable from '../tables/SearchTable';
import DonateQRCard from 'src/components/apps/donate/Donate';

const Donate = () => {
  return (
    <PageContainer
      title="Ủng Hộ Tác Giả"
      description="Ủng hộ tác giả để duy trì và cập nhật ngân hàng câu hỏi thường xuyên"
    >
      <Box>
        <DonateQRCard qrSrc={`${process.env.PUBLIC_URL}/qr.jpg`} />;
      </Box>
    </PageContainer>
  );
};

export default Donate;
