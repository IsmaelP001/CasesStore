import FormInput from "./FormInput"

const NewPaymentCart=()=>{

    const closeModal=()=>{
        document.getElementById('modalAddCard').close()

    }

    return (
      <dialog id="modalAddCard" className="modal ">
        <div className="modal-box flex flex-col gap-7">
        <h2 className="self-center font-bold text-3xl">Nueva tarjeta</h2>
        <div className="flex gap-5">
          <FormInput  type='text' label='Numero de tarjeta' name='cardNumber' defaultValue='' size='input-sm' />
          <div>
            <FormInput type='text' label='CVC' name='CVC' defaultValue='' size='input-sm' />
          </div>
        </div>
        <div className="flex gap-4">
          <FormInput type='text' label='Expiracion' name='expiration' defaultValue='' size='input-sm' />
          <FormInput type='text' label='Zip code' name='zipCode' defaultValue='' size='input-sm' />
        </div>
        <div className="flex items-center gap-2">
           <input type="checkbox" className="checkbox"></input>
           <label className="label">Targeta por defecto en tus compras</label>
        </div>
        <div className="flex gap-2">
            <button className="btn btn-base-400 btn-sm flex-1 rounded-3xl" onClick={closeModal}>Atras</button>
            <button className="btn btn-primary btn-sm flex-1 rounded-3xl">Guardar</button>
        </div>           

        </div>
        
      </dialog>
    )
}

export default NewPaymentCart