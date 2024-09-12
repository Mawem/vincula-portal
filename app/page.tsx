'use client'
import { redirect } from 'next/navigation'
import { getToken } from '@/utils/tokenHandler'
export default function Home() {
  if (!getToken()) {
    redirect('/login')
   
  }
  redirect('/dashboard')
}
