'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from '../utils/phoneUtils';
import apiUser from '@/app/api-service/apiUser';
import { setToken } from '@/utils/tokenHandler';
import router from 'next/router';
import { signIn } from 'next-auth/react';

const Login: React.FC = () => {
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Phone number: ', phoneNumber.trim());
    const response = await apiUser.getOTP(phoneNumber.trim());
    console.log(response)
    setIsLoading(false);
    setStage('otp');
  };


  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiUser.login({ phone_number: phoneNumber.trim(), otp: otp });
      setToken(response.access_token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        phone_number: phoneNumber.trim(),
        code: otp,
        redirect: true,
        callbackUrl: "/dashboard",
      });
      if (res) {
        console.log('Inicio de sesión exitoso');
      } else {
        console.error('Error en el inicio de sesión: Token no recibido');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 6) {
      setOtp(input);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          {stage === 'phone' 
            ? 'Ingresa tu número de teléfono para recibir un código OTP.' 
            : 'Ingresa el código OTP que recibiste.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stage === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="phoneNumber" className="self-center">Número de teléfono</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="09XX XXX XXX"
                  required
                  className="text-center"
                />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-4">
              <Button onClick={handlePhoneSubmit} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar OTP'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="otp" className="self-center">Código de verificación</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Ingrese el código OTP"
                  required
                  className="text-center"
                />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-4">
              <Button type="submit" className="mr-2" disabled={otp.length !== 6} onClick={handleLogin}>Verificar Código</Button>
              <Button variant="outline" onClick={handleOtpSubmit} disabled={isLoading}>
                {isLoading ? 'Reenviando...' : 'Reenviar OTP'}
              </Button>
            </CardFooter>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default Login;