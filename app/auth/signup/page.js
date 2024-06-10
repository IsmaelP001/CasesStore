"use server";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { signup } from "./action";

const SignupPage = () => {
  return (
    <div className="min-h-screen grid place-content-center ">
      <form
        action={signup}
        className="form bg-slate-100 p-5 rounded-xl space-y-5 min-w-[400px]"
      >
        <h2 className="text-2xl font-semibold">Registrarse</h2>

        <div className="flex gap-5">
          <div>
            <Label className="label font-semibold">Nombre</Label>
            <Input
              type="text"
              name="firstName"
              required
              className=" w-full"
            ></Input>
          </div>
          <div>
            <Label className="label font-semibold">Apellido</Label>
            <Input
              type="text"
              name="lastName"
              required
              className="w-full"
            ></Input>
          </div>
        </div>
        <div>
          <Label className="label font-semibold">Email</Label>
          <Input type="email" name="email" required className="w-full"></Input>
        </div>
        <div>
          <Label className="label font-semibold">Contraseña</Label>
          <Input type="password" name="password" required className=""></Input>
        </div>

        <div>
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
