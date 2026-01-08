import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, QrCode, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-black">MenuFacil</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black">
              Características
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black">
              Precios
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button>Empezar Gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-48">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    Tu Menú Digital en <span className="text-green-600">5 minutos</span>.
                  </h1>
                  <p className="max-w-[600px] text-lg text-gray-600 md:text-xl leading-relaxed">
                    Sin comisiones. Directo a tu WhatsApp. Escanea, pide y recibe.
                    Digitaliza tu restaurante hoy mismo.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="w-full min-[400px]:w-auto gap-2">
                      Empezar Gratis <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/tacos-demo">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Ver Demo
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Sin tarjeta de crédito</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Plan gratuito disponible</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto relative">
                <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 p-6 max-w-sm mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="space-y-4">
                      <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-50 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-50 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="h-32 bg-gray-100 rounded-lg"></div>
                        <div className="h-32 bg-gray-100 rounded-lg"></div>
                      </div>
                      <div className="h-10 w-full bg-black rounded-md mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid (Optional but good for filling space) */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Todo lo que necesitas</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Diseñado para que te enfoques en lo que mejor sabes hacer: cocinar.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <Smartphone className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                    Pedidos por WhatsApp
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Recibe los pedidos directamente en tu chat. Sin intermediarios ni comisiones por venta.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <QrCode className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                    Códigos QR
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Genera y descarga códigos QR para tus mesas. Tus clientes escanean y piden al instante.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <ArrowRight className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                    Fácil de actualizar
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Cambia precios, fotos y descripciones en tiempo real desde tu panel de administrador.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © 2024 MenuFacil. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Términos</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
