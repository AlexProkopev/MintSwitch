import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialReviews } from './array';
import { useSelector } from 'react-redux';
import { selectIsAutorization } from '../../redux/state/autentification/authentification.selectors';

// Стили для компонента
const ReviewCard = styled(Card)`
  margin-bottom: 16px;
  background: #1c1c1c;
  color: #fff;
`;

const ReviewDate = styled(Typography)`
  font-size: 0.9rem;
  color: #888;
`;

const ReviewListContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FormContainer = styled(Box)`
  margin-bottom: 20px;
`;

const LoadMoreButton = styled(Button)`
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;

// Компонент ReviewsList
const ReviewsList = () => {
  const [items, setItems] = useState(initialReviews.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Проверка авторизации
  const isAuthorized = useSelector(selectIsAutorization);

  // Функция для подгрузки дополнительных данных
  const fetchMoreData = () => {
    if (items.length >= initialReviews.length) {
      setHasMore(false);
      return;
    }

    // Симуляция задержки при загрузке данных (можно заменить на запрос к API)
    setTimeout(() => {
      setItems(items.concat(initialReviews.slice(items.length, items.length + 10)));
    }, 500);
  };

  // Функция для обработки отправки нового отзыва
  const handleSubmitReview = (event) => {
    event.preventDefault();

    if (!isAuthorized) {
      toast.error('Пожалуйста, зарегистрируйтесь и войдите в систему для отправки отзыва.');
      return;
    }

    // Проверка на корректность данных
    if (name && reviewText) {
      const newReview = {
        name,
        date: new Date().toISOString().split('T')[0], // Форматирование даты в YYYY-MM-DD
        review: reviewText,
      };

      setItems([newReview, ...items]); // Добавляем новый отзыв в начало списка
      setName('');
      setEmail(''); // Очищаем email
      setReviewText('');

      toast.success('Ваш отзыв размещен!'); // Уведомление о успешной отправке отзыва
    } else {
      toast.error('Пожалуйста, заполните все поля.'); // Уведомление о том, что не все поля заполнены
    }
  };

  return (
    <ReviewListContainer>
      <FormContainer>
        <form onSubmit={handleSubmitReview}>
          <TextField
            fullWidth
            margin="normal"
            label="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              backgroundColor: '#2c2c2c',
              '& .MuiInputBase-root': {
                backgroundColor: '#2c2c2c',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiFormHelperText-root': {
                color: '#f5f5f5',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: '#2c2c2c',
              '& .MuiInputBase-root': {
                backgroundColor: '#2c2c2c',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiFormHelperText-root': {
                color: '#f5f5f5',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ваш отзыв"
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            sx={{
              backgroundColor: '#2c2c2c',
              '& .MuiInputBase-root': {
                backgroundColor: '#2c2c2c',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiFormHelperText-root': {
                color: '#f5f5f5',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Оставить отзыв
          </Button>
        </form>
      </FormContainer>
      {items.map((review, index) => (
        <ReviewCard key={index}>
          <CardContent>
            <Typography variant="h6">{review.name}</Typography>
            <ReviewDate>{review.date}</ReviewDate>
            <Typography variant="body1">{review.review}</Typography>
          </CardContent>
        </ReviewCard>
      ))}
      {hasMore ? (
        <LoadMoreButton onClick={fetchMoreData}>
          Загрузить больше отзывов
        </LoadMoreButton>
      ) : (
        <Typography variant="h6" color="white" align="center" sx={{ marginTop: 2 }}>
          Загружены последние 100 отзывов
        </Typography>
      )}
      <ToastContainer />
    </ReviewListContainer>
  );
};

export default ReviewsList;
