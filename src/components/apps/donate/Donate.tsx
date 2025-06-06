// src/components/DonateQRCard.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import { IconHeart, IconCopy } from '@tabler/icons';

interface DonateQRCardProps {
  qrSrc: string;
}

const DonateQRCard: React.FC<DonateQRCardProps> = ({ qrSrc }) => {
  /* copy nhanh số tài khoản */
  const handleCopy = () => navigator.clipboard.writeText('04018558201');

  return (
    <Card variant="outlined" sx={{ mx: 'auto', mt: 4, borderRadius: 3 }}>
      <CardContent>
        {/* --- Tiêu đề + icon --- */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <IconHeart color="#e53935" size={30} />
          <Typography variant="h3" fontWeight={600}>
            ỦNG HỘ TÁC GIẢ
          </Typography>
        </Box>

        <Typography variant="body2" whiteSpace="pre-line" mb={2} mt={2} sx={{ fontSize: 15 }}>
          Mọi câu hỏi đều được tôi tổng hợp và công khai <b>miễn phí</b>. <br /> <br />
          Mọi đóng góp dù là nhỏ nhất của bạn sẽ là động lực để tôi phát triển và{' '}
          <b>cập nhật các câu hỏi mới nhất.</b>
        </Typography>

        {/* --- QR code --- */}
        <Box
          component="img"
          src={qrSrc}
          alt="QR donate"
          sx={{
            display: 'block',
            maxWidth: 300,
            mx: 'auto',
            borderRadius: 2,
            boxShadow: 1,
          }}
        />

        {/* --- Thông tin tài khoản --- */}
        <Box mt={2} textAlign="center">
          <Typography variant="subtitle2" fontWeight={600}>
            TP BANK
          </Typography>

          <Box display="inline-flex" alignItems="center" gap={0.5}>
            <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
              04018558201
            </Typography>
            <Tooltip title="Copy">
              <IconButton size="small" onClick={handleCopy}>
                <IconCopy size={16} />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="subtitle2" color="text.secondary">
            NGUYEN THANH CONG
          </Typography>
        </Box>
        <Typography
          variant="body2"
          whiteSpace="pre-line"
          mb={2}
          sx={{ fontSize: 15, marginTop: 5 }}
        >
          Trân trọng cảm ơn!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DonateQRCard;
