'use client';

import {Main} from '@/ui/container';
import {Signin} from '@/components/inicioSesion';
import {Signup} from '@/components/crearSesion';
import {useState} from 'react';
export default function Home() {
  const [inicio, setInicio] = useState(false);
  return <Main>{inicio ? <Signin /> : <Signup />}</Main>;
}
