"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

type FormData = { email: string };
type CodigoFormData = { code: string };
type NuevaContrasenaForm = { password: string; confirmPassword: string };

export default function RestablecerCuenta() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    watch: watchCode,
  } = useForm<CodigoFormData>();
  const {
    register: registerNewPass,
    handleSubmit: handleSubmitNewPass,
    watch: watchNewPass,
  } = useForm<NuevaContrasenaForm>();

  const router = useRouter();

  const [emailEnviado, setEmailEnviado] = useState(false);
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  const [mostrarCampoCodigo, setMostrarCampoCodigo] = useState(false);
  const [contador, setContador] = useState(120);
  const [reenvioHabilitado, setReenvioHabilitado] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [passwordCambiada, setPasswordCambiada] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const email = watch("email");
  const codigoIngresado = watchCode("code");
  const password = watchNewPass("password");
  const confirmPassword = watchNewPass("confirmPassword");

  const enviarCorreo = async (data: FormData) => {
    setLoadingBtn(true);
    const sendResetPassword = (await import("@/lib/hook")).sendResetPassword;
    const DATA = await sendResetPassword({ email: data.email });
    if (DATA.success) {
      setEmailEnviado(true);
      setMostrarCampoCodigo(true);
      setContador(120);
      setReenvioHabilitado(false);
    } else {
      setErrorMsg(DATA.message || "Ocurrió un error al enviar el correo.");
    }
    setLoadingBtn(false);
  };

  const reenviarCodigo = async () => {
    if (!reenvioHabilitado) return;
    setContador(120);
    const sendResetPassword = (await import("@/lib/hook")).sendResetPassword;
    const DATA = await sendResetPassword({ email: email });
    if (DATA.success) {
      setReenvioHabilitado(false);
      setErrorMsg("");
    } else {
      setErrorMsg(DATA.message || "Ocurrió un error al enviar el correo.");
    }
  };

  const verificarCodigo = async (data: CodigoFormData) => {
    setLoadingBtn(true);
    const validationResetPassword = (await import("@/lib/hook")).validationResetPassword;
    const DATA = await validationResetPassword({ email: email, code: data.code });
    if (DATA.success) {
      setCodigoVerificado(true);
      setErrorMsg("");
    } else {
      setErrorMsg(DATA.message || "Código incorrecto.");
    }
    setLoadingBtn(false);
  };

  const cambiarContrasena = async (data: NuevaContrasenaForm) => {
    setLoadingBtn(true);
    const resetPassword = (await import("@/lib/hook")).resetPassword;
    if (data.password !== data.confirmPassword) return setErrorMsg("La contraseña no coinciden");
    const DATA = await resetPassword({ email: email, password: data.password });
    if (DATA.success) {
      setErrorMsg("");
      setPasswordCambiada(true);
    } else {
      setErrorMsg(DATA.message || "No se pudo cambiar la contraseña.");
    }
    setLoadingBtn(false);
  };

  useEffect(() => {
    if (!mostrarCampoCodigo || contador <= 0) {
      setReenvioHabilitado(true);
      return;
    }

    const interval = setInterval(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [contador, mostrarCampoCodigo]);

  const formatoTiempo = (segundos: number) => {
    const m = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const s = (segundos % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className='w-full max-w-md mx-auto mt-10 p-6 bg-white dark:bg-darkComponet rounded-2xl shadow space-y-6'>
      <h1 className='text-xl font-semibold'>Restablecer Contraseña</h1>
      {errorMsg && (
        <div className='text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-sm'>
          {errorMsg}
        </div>
      )}

      {!emailEnviado && (
        <form onSubmit={handleSubmit(enviarCorreo)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Correo electrónico</label>
            <input
              required
              type='email'
              {...register("email", { required: true })}
              className='mt-1 w-full text-secundary border rounded-xl px-4 py-2'
              placeholder='bruno_am_22@hotmail.com'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-light text-white py-2 rounded-xl hover:opacity-90 flex justify-center items-center gap-2 disabled:opacity-50'
            disabled={loadingBtn}
          >
            {loadingBtn ? (
              <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            ) : (
              "Enviar código"
            )}
          </button>
        </form>
      )}

      {emailEnviado && !codigoVerificado && (
        <div className='space-y-4'>
          <p className='text-sm text-green-600'>Se ha enviado un código a tu correo electrónico.</p>

          <form onSubmit={handleSubmitCode(verificarCodigo)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Código de verificación</label>
              <input
                required
                type='text'
                maxLength={6}
                {...registerCode("code", {
                  required: true,
                  pattern: /^[0-9]{6}$/,
                })}
                className='mt-1 w-full text-center tracking-widest text-xl border rounded-xl px-4 py-3 text-secundary'
                placeholder='••••••'
              />
            </div>

            <button
              type='submit'
              disabled={codigoIngresado?.length !== 6 || loadingBtn}
              className='w-full bg-light text-white py-2 rounded-xl hover:opacity-90 flex justify-center items-center gap-2 disabled:opacity-50'
            >
              {loadingBtn ? (
                <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
              ) : (
                "Verificar código"
              )}
            </button>

            <p className='text-sm text-center text-gray-600'>
              {reenvioHabilitado ? (
                <button
                  onClick={reenviarCodigo}
                  type='button'
                  className='text-blue-600 hover:underline'
                >
                  Reenviar código
                </button>
              ) : (
                <>
                  Puedes reenviar el código en:{" "}
                  <span className='font-semibold'>{formatoTiempo(contador)}</span>
                </>
              )}
            </p>
          </form>
        </div>
      )}

      {codigoVerificado && !passwordCambiada && (
        <form onSubmit={handleSubmitNewPass(cambiarContrasena)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Nueva contraseña</label>
            <input
              type='password'
              required
              {...registerNewPass("password", { required: true, minLength: 6 })}
              className='mt-1 w-full border rounded-xl px-4 py-2 text-secundary'
              placeholder='••••••••'
            />
          </div>

          <div>
            <label className='block text-sm font-medium'>Confirmar contraseña</label>
            <input
              type='password'
              required
              {...registerNewPass("confirmPassword", {
                required: true,
                validate: (val) => val === password || "Las contraseñas no coinciden",
              })}
              className='mt-1 w-full border rounded-xl px-4 py-2 text-secundary'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            disabled={loadingBtn || password !== confirmPassword}
            className='w-full bg-light text-white py-2 rounded-xl hover:opacity-90 flex justify-center items-center gap-2 disabled:opacity-50'
          >
            {loadingBtn ? (
              <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            ) : (
              "Cambiar contraseña"
            )}
          </button>
        </form>
      )}

      {passwordCambiada && (
        <div className='space-y-4 text-center'>
          <FaCheckCircle className='text-green-500 text-4xl mx-auto' />
          <p className='text-green-600 font-semibold'>¡Contraseña cambiada exitosamente!</p>
          <button
            onClick={() => router.push("/iniciarSesion")}
            className='mt-2 bg-light text-white px-4 py-2 rounded-xl hover:opacity-90'
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
