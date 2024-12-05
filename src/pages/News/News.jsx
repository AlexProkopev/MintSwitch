import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, CircularProgress } from '@mui/material';

const CryptoNews = ({ loadingNews, cryptoNews }) => {
  return (
    <div className="crypto-news-container" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h2" style={{ marginBottom: '20px', fontWeight: 600 }}>
        Новости криптовалют
      </Typography>
      {loadingNews ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={4}>
          {cryptoNews?.map((newsItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {newsItem.urlToImage && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={newsItem.urlToImage}
                    alt={newsItem.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" style={{ fontWeight: 500 }}>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        style={{
                          fontWeight: 600,
                          marginTop: '10px',
                          fontSize: '1rem', // размер шрифта для маленьких экранов
                        }}
                      >
                        {newsItem.title}
                      </Typography>
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CryptoNews;
