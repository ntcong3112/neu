import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import SearchTable from '../tables/SearchTable';

const MainTable = () => {
  return (
    <PageContainer title="Modern Dashboard" description="this is Modern Dashboard page">
      <Box>
        <SearchTable />
      </Box>
    </PageContainer>
  );
};

export default MainTable;
