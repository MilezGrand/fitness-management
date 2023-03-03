import React from 'react';
import ContentLoader from 'react-content-loader';
import s from './Info.module.scss';

const Skeleton = () => {
    return (
      <ContentLoader
        speed={2}
        width={476}
        height={128}
        viewBox="0 0 476 128"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="40" y="0" rx="3" ry="3" width="400" height="18" />
        <rect x="40" y="32" rx="3" ry="3" width="300" height="18" />
        <rect x="40" y="64" rx="3" ry="3" width="360" height="18" />
        <rect x="40" y="96" rx="3" ry="3" width="220" height="18" />
      </ContentLoader>
    );
  
};

export default Skeleton;
