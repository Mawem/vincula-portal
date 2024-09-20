'use client'
import React from 'react';
import Login from '@/components/login';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-8 p-4">
        {/* Reemplaza '/path-to-your-logo.png' con la ruta real de tu logo */}
        <Image
          src="/circle.png"
          alt="Logo de la empresa"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
      <Login />
    </div>
  );
}
