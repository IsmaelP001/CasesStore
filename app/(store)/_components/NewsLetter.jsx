import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';


const NewsLetter = () => {
  return (
    <div className="h-[200px] rounded-lg grid place-items-center p-10 md:flex  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l">
      <div className='flex-1'>
        <h2 className='text-2xl md:text-4xl font-medium mb-2'>Suscríbete a nuestro boletín </h2>
        <p className='text-xs md:text-base'>Obtén descuentos exclusivos y avisos de nuestras ofertas</p>
      </div>
      <form className='form flex flex-1' >
        <Input placeholder='tuCorreo@correo.com' name='newsLetter'></Input>
        <Button className=''>Suscribete</Button>
      </form>
    </div>
  );
};

export default NewsLetter;
