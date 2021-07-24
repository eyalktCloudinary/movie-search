import { useEffect } from 'react';

import {AdvancedImage} from '@cloudinary/react';
import {format, quality} from "@cloudinary/base/actions/delivery";
import {auto} from "@cloudinary/base/qualifiers/format";
import {auto as qAuto} from "@cloudinary/base/qualifiers/quality";


function Result({ movie, cld }) {

  const posterImg = cld.image(movie.Poster)
    .delivery(format(auto()))
    .delivery(quality(qAuto()))
    .setStorageType("fetch");

  useEffect(() => console.log("Result re-rendered"))
  
  return (
    <div className="result">
      {/* <img src={movie.Poster} alt={movie.Title + " poster"}></img> */}
      <AdvancedImage cldImg={posterImg} alt={movie.Title + " poster"} />
      <h1>{movie.Title}</h1>
      <h2>{movie.Year}</h2>
    </div>
  );
}

export default Result;