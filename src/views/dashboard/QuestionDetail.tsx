// src/pages/QuestionTable.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Tooltip,
  Box,
  Divider,
  TextField,
  Button,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint, IconQuote, IconSearch } from '@tabler/icons';
import { useParams, useNavigate, Link } from 'react-router-dom'; // ⬅️ đổi useLocation -> useParams
import PageContainer from 'src/components/container/PageContainer';
import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
import { Helmet } from 'react-helmet-async';
import { useDataMap } from 'src/hooks/useDataMap';
import { normalizeVi, Question } from 'src/store/data/dataMap';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from 'src/components/shared/BlankCard';
import BlogComment from 'src/components/apps/blog/detail/BlogComment';
import { BlogType } from 'src/types/apps/blog';
import { isNumber } from 'lodash';

const DEFAULT_ROUTE = '/404';

const QuestionDetail: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const DATA_MAP = useDataMap();
  const { field = '', subject = '', question: questionID = null } = useParams();
  const navigate = useNavigate();
  const key = `${field}/${subject}`;
  const entry = DATA_MAP[key];
  const fieldName = entry?.fieldName ?? '';
  const subjectName = entry?.subjectName ?? '';
  console.log('123123123');
  useEffect(() => {
    if (questionID && isNumber(Number(questionID))) {
      console.log(entry);
      const question = entry?.questions?.find((q) => q.id === Number(questionID));
      if (question) {
        setQuestion(question);
      } else {
        // navigate(DEFAULT_ROUTE, { replace: true });
      }
    }
  }, [DATA_MAP, questionID, entry, navigate]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question?.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question?.answer,
      },
    },
  };
  const BCrumb = [
    {
      to: '/',
      title: 'Trang chủ',
    },
    {
      to: `/${field}`,
      title: fieldName,
    },
    {
      to: `/${field}/${subject}`,
      title: subjectName,
    },
  ];

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{question?.question}</title>
        <meta name="description" content={question?.answer?.slice(0, 150)} />
        <link rel="canonical" href={`https://elearningneu.com/${field}/${subject}/${questionID}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Box>
        <Breadcrumb title="Chi tiết câu hỏi" items={BCrumb} />
        <BlankCard>
          <>
            <CardContent>
              <Stack direction="row"></Stack>

              <Chip label={'Câu hỏi'} size="small" sx={{ marginTop: 0, marginBottom: 0 }}></Chip>
              {/* <Stack direction="row" gap={3} alignItems="center">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconEye size="18" /> {1234513}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconMessage2 size="18" /> 123
                </Stack>

                <Stack direction="row" ml="auto" alignItems="center">
                  <IconPoint size="16" />
                  <small>{new Date().toDateString()}</small>
                </Stack>
              </Stack> */}
              <Box my={3}>
                <Typography
                  gutterBottom
                  variant="h3"
                  fontWeight={600}
                  color="inherit"
                  onCopy={(e) => e.preventDefault()}
                  sx={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    textDecoration: 'none',
                  }}
                >
                  {question?.question}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardContent sx={{ marginBottom: 5 }}>
              <Typography
                variant="h4"
                style={{ color: 'red' }}
                onCopy={(e) => e.preventDefault()}
                sx={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  textDecoration: 'none',
                }}
              >
                {question?.answer}
              </Typography>
            </CardContent>
          </>
        </BlankCard>
        {/* <BlankCard sx={{ mt: 3, p: 0 }}>
          <CardContent>
            <Box
              sx={{
                height: { xs: 'auto', md: 180 },
                width: '100%',
                mb: 3,
                p: { xs: 2, lg: 1.5 },
                pl: 3,
                pr: 3,
                borderRadius: 3,
                bgcolor: 'secondary.light',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 3,
                cursor: 'pointer',
              }}
              component={Link}
              to="/donate"
            >
              <Box sx={{ maxWidth: { md: '70%' }, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h4" fontWeight={700} mb={2} mt={0}>
                  Toàn bộ câu hỏi đều MIỄN PHÍ☕
                </Typography>
                <Typography variant="body1">
                  Mọi sự đóng góp đều được trân trọng và là nguồn động lực để tôi tiếp tục{' '}
                  <b>duy trì & cập nhật bộ câu hỏi!</b>
                </Typography>
              </Box>

              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/qrmini.jpg`}
                alt="QR Donate"
                sx={{
                  width: 'auto',
                  height: { xs: '150px', lg: '100%' },
                  boxShadow: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </Box>
          </CardContent>
        </BlankCard> */}
      </Box>
    </>
  );
};

export default QuestionDetail;
