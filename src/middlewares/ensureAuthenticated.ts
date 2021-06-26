import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload{
  sub: string;
}
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se Token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // função split passa expressão para que ela divida nossa string
  // " , " para por dentro da variavel token e dividir  do nome Bearer
  const [, token] = authToken.split(" ");

  try {
    // Validar se token é valido
    const {sub} = verify(token, "5fd8cdb1f3eab35bcb796f92d35b3817") as Ipayload;
    
    // Recuperar informação do usuario
    request.user_id = sub;

    return next();
} catch (err) {
    return response.status(401).end();
  }

  //recuperar informações do usuário

}
