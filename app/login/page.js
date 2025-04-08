"use client";
import { useFormik } from 'formik';
import { Button, Input, Footer } from '../components/utils/Input';
import Image from 'next/image';
import { LOGO_AFTIM } from '../components/utils/const';
import { loginSchema } from '../components/schemas/loginSchema';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log('Login values:', values);
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center px-4">
          <div className="flex flex-col items-center mt-4 mb-6">
            <Image src={LOGO_AFTIM} alt="APP LOGO" width={64} height={64} />
            <h1 className="text-xl font-bold text-[#1e377c] mt-2">AFTIM</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
            <h2 className="text-xl font-semibold text-center text-black mb-6">Iniciar Sesión</h2>
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
                        <p className="text-red-500 text-sm">{formik.errors.username}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                        required
                      />
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      type="submit" 
                      variant="primary"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
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
