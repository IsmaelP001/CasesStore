"use server";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { cookies } from "next/headers";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

export const auth = (rol = "customer") => {
  const permitions = { isTokenValid: false, isAuthorized: null, message: null };

  //get token
  const token = cookies().get("jwt")?.value;
  if (!token) {
    permitions.message = "Token no existe";
    return permitions;
  }

  const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      permitions.message = "Error al validar el token";

      return permitions;
      
    }
    permitions.isTokenValid = true;
    return decoded;
  });

  if (user.rol && user.rol !== rol) {
    permitions.message = "No tienes permisos para realizar esta accion";
    permitions.isAuthorized = false;
    return permitions;
  } else {
    permitions.isAuthorized = true;
  }

  return { user,...permitions };
};