import { MdMarkEmailRead } from "react-icons/md";

const ThanksPage = () => {
  return (
    <div className="px-2 md:px-10 pt-16 text-center w-[60vw] m-auto" >
        <header>
        <h2 className="text-5xl font-semibold mb-3">Gracias por preferirnos</h2>
        <p className="text-xl tracking-wider font-medium">Tu orden ha sido completada con exito.</p>
        </header>

        <div className="flex gap-3 items-center mt-10 text-left">
          <MdMarkEmailRead className="text-[5rem] text-blue-600" />
          <p>Un correo con los detalles de tu orden ha sido enviado a tu correo electronico, por favor, guardalo ante cualquier incoveniente.</p>
        </div>
    </div>
  )
}

export default ThanksPage