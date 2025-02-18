import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    ShoppingCart,
    User,
    Heart,
    Box,
    UserPlus,
    Mail,
    Phone,
    CreditCard,
    DollarSign,
  } from "lucide-react";
  
  const Footer = () => {
    return (
      <footer className="relative bg-gray-900 text-gray-300 py-12 !z-[99]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Enlaces principales */}
            <div className="text-center">
              <h3 className="text-white text-lg mb-4">Enlaces</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="/colecciones" className="hover:text-white flex flex-col items-center">
                  <Box className="h-6 w-6 mb-2" />
                  Colecciones
                </a>
                <a href="/crea-tu-funda" className="hover:text-white flex flex-col items-center">
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  Crea tu propia funda
                </a>
                <a href="/favoritos" className="hover:text-white flex flex-col items-center">
                  <Heart className="h-6 w-6 mb-2" />
                  Favoritos
                </a>
                <a href="/iniciar-sesion" className="hover:text-white flex flex-col items-center">
                  <User className="h-6 w-6 mb-2" />
                  Iniciar sesión
                </a>
                <a href="/registrarte" className="hover:text-white flex flex-col items-center">
                  <UserPlus className="h-6 w-6 mb-2" />
                  Registrarte
                </a>
              </div>
            </div>
  
            {/* Información de Contacto */}
            <div className="text-center">
              <h3 className="text-white text-lg mb-4">Contacto</h3>
              <div className="flex flex-col items-center">
                <a href="mailto:info@tucompania.com" className="hover:text-white flex items-center">
                  <Mail className="h-6 w-6 mr-2" />
                  info@tucompania.com
                </a>
                <a href="tel:+123456789" className="hover:text-white flex items-center mt-2">
                  <Phone className="h-6 w-6 mr-2" />
                  +123 456 789
                </a>
              </div>
            </div>
  
            {/* Suscripción al Boletín */}
            <div className="text-center">
              <h3 className="text-white text-lg mb-4">Suscríbete al Boletín</h3>
              <p className="text-sm mb-4">
                Recibe nuestras últimas noticias y ofertas directamente en tu bandeja de entrada.
              </p>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="px-4 py-2 rounded bg-gray-800 text-gray-300 mb-2"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Suscribirse
              </button>
            </div>
  
            {/* Métodos de Pago */}
            <div className="text-center">
              <h3 className="text-white text-lg mb-4">Métodos de Pago</h3>
              <div className="flex justify-center space-x-4">
                <CreditCard className="h-8 w-8 text-gray-500" />
                <DollarSign className="h-8 w-8 text-gray-500" />
                <CreditCard className="h-8 w-8 text-gray-500" />
                {/* Aquí puedes añadir íconos de otros métodos de pago */}
              </div>
            </div>
          </div>
  
          {/* Iconos de redes sociales */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://facebook.com" className="hover:text-blue-500">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" className="hover:text-pink-500">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-700">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
  
          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} TuCompañía. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  