"use client";
import { useFormik } from 'formik';
import { Button, Input, Footer } from '../components/utils/Input';
import Image from 'next/image';
import { LOGO_AFTIM } from '../components/utils/const';
import { loginSchema } from '../components/schemas/loginSchema';
import { useRouter } from 'next/navigation';
import { useLogin } from '../components/hooks/auth/useLogin';
import { useEffect } from 'react';
import { useAuthStore } from '../components/hooks/auth/useAuthStore';
import { IconError } from '../components/utils/IconError';

export default function Login() {
  const router = useRouter()
  const { login, loading, error } = useLogin();
  const { isAuthenticated} = useAuthStore()

  const formik = useFormik({
    initialValues: {
      username: '',
      hashed_password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await login(values);
      } catch (err) {
        /*const errorMessage = err.response?.data?.message || 'Error de autenticación';
        setFieldError('hashed_password', errorMessage);*/
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) { 
      router.push('/dashboard/home');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center px-4">
          <div className="flex flex-col items-center mt-4 mb-6">
            <Image src={LOGO_AFTIM} alt="APP LOGO" width={64} height={64} />
            <h1 className="text-xl font-bold text-[#1e377c] mt-2">AFTIM</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
            <h2 className="text-xl font-semibold text-center text-black mb-6">Iniciar sesión</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-[80%] h-[300px] m-auto pt-2 flex flex-col justify-between text-gray-950">
                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <Input
                      label="Usuario"
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.username && formik.errors.username}
                      required
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div className="text-red-500 text-sm flex items-start">
                          <IconError></IconError>
                          {formik.errors.username}
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Contraseña"
                      type="password"
                      name="hashed_password"
                      value={formik.values.hashed_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.hashed_password && formik.errors.hashed_password}
                      required
                    />
                    {formik.touched.hashed_password && formik.errors.hashed_password && (
                      <div className="text-red-500 text-sm flex items-start">
                          <IconError></IconError>
                          {formik.errors.hashed_password}
                      </div>
                    )}
                  </div>
                </div>
                {error && (
                  <p className="text-red-600 text-sm text-center mt-2">{error}</p>
                )}
                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={formik.isSubmitting || loading}
                  >
                    {loading ? 'Cargando...' : 'Enviar'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
