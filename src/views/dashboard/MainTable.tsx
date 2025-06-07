import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import SearchTable from '../tables/SearchTable';

const MainTable = () => {
  return (
    <PageContainer
      title="Ngân Hàng Câu Hỏi - NEU E-Learning"
      description="Tổng hợp các câu hỏi trắc nghiệm cho các môn học tại NEU"
    >
      <Box mb={10}>
        <SearchTable />
      </Box>
    </PageContainer>
  );
};

export default MainTable;
