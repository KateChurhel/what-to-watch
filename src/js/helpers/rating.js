import USER_RATINGS from '../constants/rating';

export const computeRatingLevel = (rating) => USER_RATINGS.filter(
  (rank) => rank.min <= rating,
).pop().title;
