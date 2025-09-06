"use client";
import { useState, useEffect } from "react";

export default function PWAInstaller() {
  const [init, setInit] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar si la app está instalada
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Detectar si es iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    // Manejar el evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Verificar si ya se ha descartado el prompt
    const dismissed = localStorage.getItem("pwaPromptDismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Para iOS, mostrar instrucciones
      setIsVisible(true);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Usuario aceptó la instalación");
      localStorage.setItem("pwaInstalled", "true");
    } else {
      console.log("Usuario rechazó la instalación");
      localStorage.setItem("pwaPromptDismissed", "true");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setInit(false);
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  if (!init || isStandalone || !isVisible) return null;

  return (
    <div className='fixed bottom-16 right-4 bg-primary dark:bg-darkComponet shadow-lg rounded-lg p-4 max-w-sm dark:text-primary '>
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          <img src='/logo.webp' alt='Unired' className='h-10 w-10' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-semibold '>Instalar Unired</h3>
          <div className='mt-1 text-sm font-thin'>
            <p>Instala nuestra app para una mejor experiencia. Acceso rápido.</p>
          </div>
          <div className='mt-4 flex'>
            <button
              type='button'
              className='bg-blue-600 px-4 py-2 text-sm font-medium rounded-md text-primary'
              onClick={handleInstallClick}
            >
              Instalar
            </button>
            <button
              type='button'
              className='ml-3  px-4 py-2 text-sm font-medium rounded-md'
              onClick={handleDismiss}
            >
              Ahora no
            </button>
          </div>
          {/* {isIOS && (
            <div className='mt-3 text-xs text-gray-400'>
              <p>En iOS: toca el ícono de compartir (⎋) y luego "Agregar a pantalla de inicio"</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
