// src/pages/QuestionTable.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { useParams, useNavigate, Link } from 'react-router-dom'; // ⬅️ đổi useLocation -> useParams
import PageContainer from 'src/components/container/PageContainer';
import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
import { normalizeVi, Question } from 'src/store/data/dataMap';
import { useDataMap } from 'src/hooks/useDataMap';

const DEFAULT_ROUTE = '/mon-dai-cuong/chu-nghia-mac-lenin-1'; // slug mặc định

const QuestionTable: React.FC = () => {
  /* ---- state ---- */
  const [rows, setRows] = useState<Question[]>([]);
  const DATA_MAP = useDataMap();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  /* ---- URL params ---- */
  const { field = '', subject = '' } = useParams(); // ⬅️ lấy từ path
  const navigate = useNavigate();
  const key = `${field}/${subject}`;
  const entry = DATA_MAP[key];
  const fieldName = entry?.fieldName ?? '';
  const subjectName = entry?.subjectName ?? '';

  /* ---- load data khi key đổi ---- */
  useEffect(() => {
    setRows(entry?.questions ?? []);
    setPage(0);
    setSearch('');
  }, [entry]);

  /* ---- fallback khi URL sai hoặc thiếu ---- */
  useEffect(() => {
    if (entry) return; // có dữ liệu → OK
    navigate(DEFAULT_ROUTE, { replace: true });
  }, [entry, navigate]);

  /* ---- filter search ---- */
  const filtered = useMemo(() => {
    const kw = normalizeVi(search);

    return rows.filter(
      ({ question, answer }) =>
        normalizeVi(question).includes(kw) || normalizeVi(answer).includes(kw),
    );
  }, [rows, search]);
  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const canonical = `https://elearningneu.com/${field}/${subject}`;
  const pageTitle =
    subjectName && fieldName
      ? `Câu hỏi ${subjectName} – ${fieldName} | NEU Elearning`
      : 'Bộ câu hỏi | NEU Elearning';
  const pageDesc = `Kho câu hỏi & đáp án môn ${subjectName} ngành ${fieldName} – NEU Elearning, miễn phí tra cứu, cập nhật liên tục.`;

  // 2️⃣ JSON-LD: ItemList (chỉ 1 trang kết quả hiển thị)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${subjectName} – ${fieldName}`,
    itemListElement: paged.map((q, i) => ({
      '@type': 'ListItem',
      position: page * rowsPerPage + i + 1,
      url: `https://elearningneu.com/${field}/${subject}/${q.id}`,
      name: q.question,
    })),
  };

  /* ---- UI ---- */
  return (
    <PageContainer title={pageTitle} description={pageDesc} canonical={canonical} jsonLd={jsonLd}>
      {/* 👉 dùng thẻ heading chuẩn */}
      {/* Header có tên Ngành & Môn */}
      <Grid
        container
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: 5,
          p: '30px 25px 20px',
          mb: '30px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Grid item xs={12} sm={6} lg={8} mb={1}>
          <Typography variant="h3">Ngành: {fieldName}</Typography>
          <Typography color="textSecondary" variant="h5" fontWeight={500} mt={1.5}>
            Môn: {subjectName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
          <Box
            sx={{
              display: { xs: 'none', md: 'block', lg: 'flex' },
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Box sx={{ top: 0, position: 'absolute' }}>
              <img src={breadcrumbImg} alt="" width={165} />
            </Box>
          </Box>
        </Grid>
      </Grid>
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
          <Typography variant="h4" fontWeight={700} mb={2}>
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
      {/* Search box */}
      <Toolbar disableGutters sx={{ p: { xs: 0 }, maxWidth: 400, mb: '20px' }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm câu hỏi hoặc đáp án"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1rem" />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>

      {/* Bảng */}
      <Paper variant="outlined">
        <TableContainer
          onCopy={(e) => e.preventDefault()}
          sx={{
            '& th, & td': { userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' },
          }}
        >
          <Table
            size="small"
            sx={{
              borderCollapse: 'separate',
              borderSpacing: 0,
              '& th, & td': {
                borderRight: '1px solid',
                borderColor: (theme) => theme.palette.divider,
              },
              '& th:last-of-type, & td:last-of-type': { borderRight: 'none' },
              '& tbody tr:last-of-type th, & tbody tr:last-of-type td': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width={15} sx={{ fontSize: 16, fontWeight: 600 }}>
                  STT
                </TableCell>
                <TableCell sx={{ width: '50%', fontSize: 16, fontWeight: 600 }}>Câu hỏi</TableCell>
                <TableCell sx={{ width: '50%', fontSize: 16, fontWeight: 600 }}>Đáp án</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paged.map((row, idx) => (
                <TableRow
                  key={row.id}
                  onClick={() => navigate(`/${field}/${subject}/${row.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
                    {page * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell sx={{ width: '50%' }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 14, fontWeight: 500, p: '12px 4px' }}
                    >
                      {row.question}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '50%' }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 14, fontWeight: 500, p: '12px 4px' }}
                    >
                      {row.answer}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 50, 100, 200]}
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
          labelRowsPerPage="Số câu hỏi mỗi trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
        />
      </Paper>
    </PageContainer>
  );
};

export default QuestionTable;
