import { MdMarkEmailRead } from "react-icons/md";

const ThanksPage = () => {
  return (
    <div className="px-2 md:px-10 pt-16 text-center md:w-[60vw] m-auto" >
        <header>
        <h2 className="text-3xl md:text-5xl font-semibold mb-3">Gracias por preferirnos</h2>
        <p className="md:text-xl tracking-wider font-light">Tu orden ha sido completada con exito.</p>
        </header>

        <div className="flex flex-col text-center gap-3 items-center mt-10 ">
          <MdMarkEmailRead className="text-[5rem] text-blue-600" />
          <p>Un correo con los detalles de tu orden ha sido enviado a tu correo electronico, por favor, guardalo ante cualquier incoveniente.</p>
        </div>
    </div>
  )
}

export default ThanksPage