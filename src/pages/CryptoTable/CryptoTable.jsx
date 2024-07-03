import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Roboto"',
      'sans-serif'
    ].join(','),
  },
});

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptos(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о криптовалюте', error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Цены и изменения криптовалют
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Криптовалюта</TableCell>
                  <TableCell align="right">Цена</TableCell>
                  <TableCell align="right">За 24ч</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptos.map((crypto) => (
                  <TableRow key={crypto.id}>
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <img src={crypto.image} alt={crypto.name} width={24} height={24} />
                        <Box ml={2}>
                          {crypto.name}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${crypto.current_price}</TableCell>
                    <TableCell align="right" style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                      {crypto.price_change_percentage_24h}%
                    </TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CryptoTable;
