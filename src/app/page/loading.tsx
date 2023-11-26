import Image from 'next/image';
import React from 'react';

export default function PageLoading() {
  return (
    <Image
      src="/icons/loading-loader.gif"
      alt="loading..."
      width={491}
      height={341}
    />
  );
}
