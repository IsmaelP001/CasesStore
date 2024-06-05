'use server'
import { signup } from "./action"



const SignupPage = () => {
  return (
    <div className="min-h-screen grid place-content-center ">
        <form action={signup} className="form bg-base-300 p-10 rounded-xl space-y-5 min-w-[400px]">
            <div className="flex gap-5">
               <div>
                 <label className="label font-semibold">Nombre</label>
                 <input type="text" name="firstName" required className="input input-primary input-md w-full"></input>
               </div>
               <div>
                 <label className="label font-semibold">Apellido</label>
                 <input type="text" name="lastName" required className="input input-primary input-md w-full"></input>
               </div>
            </div>
            <div>
                <label className="label font-semibold">Email</label>
               <input type="email" name="email" required className="input input-primary input-md w-full"></input>
            </div>
            <div>
                <label className="label font-semibold">Contraseña</label>
               <input type="password" name="password" required className="input input-primary input-md w-full"></input>
            </div>

            <div>
                <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
            </div>
        </form>
    </div>
  )
}

export default SignupPage