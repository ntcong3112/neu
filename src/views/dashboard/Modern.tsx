import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import TopCards from 'src/components/dashboards/modern/TopCards';
import RevenueUpdates from 'src/components/dashboards/modern/RevenueUpdates';
import YearlyBreakup from 'src/components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from 'src/components/dashboards/modern/MonthlyEarnings';
import EmployeeSalary from 'src/components/dashboards/modern/EmployeeSalary';
import Customers from 'src/components/dashboards/modern/Customers';
import Projects from 'src/components/dashboards/modern/Projects';
import Social from 'src/components/dashboards/modern/Social';
import SellingProducts from 'src/components/dashboards/modern/SellingProducts';
import WeeklyStats from 'src/components/dashboards/modern/WeeklyStats';
import TopPerformers from 'src/components/dashboards/modern/TopPerformers';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';

const Modern = () => {
  return (
    <PageContainer
      title="Ngân Hàng Câu Hỏi - NEU E-Learning"
      description="Lựa chọn ngành học - Tổng hợp các câu hỏi trắc nghiệm cho các môn học tại NEU"
    >
      <Box>
        <Grid item xs={12} lg={12}>
          <TopCards />
        </Grid>

        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Modern;
