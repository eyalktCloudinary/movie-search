import { AdvancedImage } from '@cloudinary/react';
import { format, quality } from '@cloudinary/base/actions/delivery';
import { auto } from '@cloudinary/base/qualifiers/format';
import { auto as qAuto } from '@cloudinary/base/qualifiers/quality';
import { trim } from '@cloudinary/base/actions/reshape';


import useCloudinary from '../hooks/useCloudinary';
import posterPlaceHolder from '../poster-placeholder.svg';

// represents a single result
function Result({ movie }) {

  const { cld } = useCloudinary();

  const posterImg = movie.Poster === 'N/A' ? posterPlaceHolder :
    cld.image(movie.Poster)
      .delivery(format(auto()))
      .delivery(quality(qAuto()))
      .effect(trim(10, 'white'))
      .setStorageType('fetch');

  return (
    <div className="result">
      <div className="result-img">
        {
          posterImg === posterPlaceHolder ?
            <img src={posterPlaceHolder} alt={'placeholder for unavailable "' + movie.Title + '" poster'} /> :
            <AdvancedImage cldImg={posterImg} alt={'"' + movie.Title + '" poster'} />
        }
      </div>
      <div className="result-details">
        <h3>{movie.Title}</h3>
        <span>{movie.Year}</span>
      </div>
    </div>
  );
}

export default Result;