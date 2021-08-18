// import { useEffect } from "react";
import { useEffect, useState } from "react";

import { Cloudinary } from '@cloudinary/base';

const useCloudinary = (params) => {

  const [cld, setCLD] = useState(new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLD_CLOUD
    }
  }));

  useEffect(() => {
    if (params) setCLD(params);
  }, [params])

  return { cld };
}

export default useCloudinary;



