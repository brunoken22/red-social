'use client';

import {DivMain, DivButton} from '@/ui/container';
import {Signin} from '@/components/inicioSesion';
import {Signup} from '@/components/crearSesion';
import {useState} from 'react';
import {Button} from '@/ui/boton';
import {useRef, useEffect} from 'react';
import {Footer} from '@/components/footer';
import Head from 'next/head';
export default function Home() {
  const [inicio, setInicio] = useState(true);
  const boton1: any = useRef();
  const boton2: any = useRef();

  useEffect(() => {
    if (inicio) {
      boton1.current.style.backgroundColor = '#566383';
      boton1.current.style.fontSize = '1.3rem';
      return;
    }
    boton2.current.style.backgroundColor = '#566383';
    boton2.current.style.fontSize = '1.3rem';
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    e.target.style.backgroundColor = '#566383';
    e.target.style.fontSize = '1.3rem';

    if (e.target.id == '1') {
      boton2.current.style.backgroundColor = 'inherit';
      boton2.current.style.fontSize = 'inherit';
      setInicio(true);
      return;
    }
    setInicio(false);

    boton1.current.style.fontSize = 'inherit';
    boton1.current.style.backgroundColor = 'inherit';
  };
  return (
    <>
      <DivMain>
        <DivButton>
          <Button onClick={handleClick} ref={boton1} id='1'>
            Inicio Sesion
          </Button>
          <Button onClick={handleClick} ref={boton2} id='2'>
            Crear Cuenta
          </Button>
        </DivButton>
        {inicio ? <Signin /> : <Signup />}
      </DivMain>
      <Footer />
    </>
  );
}
