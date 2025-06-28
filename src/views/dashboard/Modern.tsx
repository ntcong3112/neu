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
      description="Kho câu hỏi trắc nghiệm của Đại học Kinh tế Quốc dân: Quản trị kinh doanh, Luật kinh tế, Tài chính ngân hàng, Kế toán – cập nhật liên tục."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'NEU Elearning Question Bank',
        url: 'https://elearningneu.com',
        logo: 'https://elearningneu.com/favicon.ico',
        sameAs: ['https://www.facebook.com/nezteco'],
      }}
      additional={
        <>
          <meta property="og:type" id="og-type" content="website" />

          <meta
            id="og-title"
            property="og:title"
            content="Ngân Hàng Câu Hỏi Trắc Nghiệm – NEU Elearning"
          />
          <meta
            id="og-desc"
            property="og:description"
            content="Truy cập miễn phí kho câu hỏi trắc nghiệm NEU Elearning – đầy đủ tất cả các ngành."
          />
          <meta property="og:url" content="https://elearningneu.com/" />
          <meta property="og:image" content="https://elearningneu.com/favicon.ico" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@elearningneu" />
          <meta
            id="twitter-title"
            name="twitter:title"
            content="Ngân Hàng Câu Hỏi Trắc Nghiệm – NEU Elearning"
          />
          <meta
            id="twitter-desc"
            name="twitter:description"
            content="Kho câu hỏi trắc nghiệm miễn phí – luôn cập nhật mới."
          />
          <meta name="twitter:image" content="https://elearningneu.com/og-image.jpg" />

          <link id="link-canonical" rel="canonical" href="https://elearningneu.com/" />
        </>
      }
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
