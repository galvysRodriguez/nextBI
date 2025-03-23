// src/components/Login.js
"use client"
import React, { useState } from 'react';
import { Button, Input, Footer } from '../components/utils/Input';
import Image from 'next/image';
import { LOGO_AFTIM } from '../components/utils/const';

const Login = () => {
  const [formLogin, setFormLogin] = useState({user: "", password: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
       <div className='h-[90vh] w-[100vw] flex flex-col items-center justify-center'>
            <div className='flex flex-col justify-center items-center mt-4 mb-4'>
                <Image src={LOGO_AFTIM} alt="APP LOGO" width={64} height={64} />
                <h1 className='text-xl text-center textfont-bold text-[#1e377c]'>AFTIM</h1>
            </div>
            <div className="bg-white mb-4 p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit}>
            <div>
                <h2 className="text-xl text-center textfont-semibold text-[#000] mb-4">
                    Iniciar Sesión
                </h2>
                <div className="w-[80%] h-[300px] m-auto pt-2 flex flex-col justify-between">
                    <div className="flex flex-col justify-center">
                      <Input
                        label="Usuario"
                        type="text"
                        name="user"
                        value={formLogin.user}
                        onChange={handleChange}
                        required
                      />
                       <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={formLogin.password}
                        onChange={handleChange}
                        required
                      />
                      
                    </div>
                    <div className="mt-8">
                      <Button
                        type="button"
                        variant="primary"
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
              </div>
        </form>
      </div>
       </div>
      
      <Footer></Footer>
    </div>
  );
};

export default Login;