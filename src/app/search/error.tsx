'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import '../../styles/globals.scss';

export default function SearchError() {
  const router = useRouter();

  return (
    <>
      <p>Oops! Pokemon not found.</p>
      <button className="btn" onClick={() => router.push('/')}>
        Go to Home
      </button>
    </>
  );
}
