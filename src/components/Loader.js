import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <InfinitySpin
        visible={true}
        width="200"
        color="red"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
