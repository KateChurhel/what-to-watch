// libraries
import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
// helpers
import { formatCardData } from '../../../helpers/formatData';
// views
import SmallMovieCard from '../SmallMovieCard';

// install Swiper components
SwiperCore.use([Navigation]);

const Slider = ({ items = [], category }) => {
  const swiperSettings = {
    updateOnWindowResize: true,
    breakpoints: {
      1440: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 60,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
      480: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
    },
    setWrapperSize: true,
    navigation: true,
  };

  return (
    <Swiper {...swiperSettings}>
      {items.map((item) => (
        <SwiperSlide key={`${category}-${item.id}`}>
          <SmallMovieCard {...formatCardData(item)} link={`/details/${category}/${item.id}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  category: PropTypes.string.isRequired,
};

export default Slider;
