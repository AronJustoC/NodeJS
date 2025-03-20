import type { IncomingMessage, ServerResponse } from "http";
import { parseBody } from "../utils/parseBody";
import { safeParse } from "valibot";
import {
  addRevokeToken,
  authSchema,
  createUser,
  findUserByEmail,
  removeUserToken,
  validatePassword
} from "../models";
import { sign } from "jsonwebtoken";
import config from "../config";
import type { AuthenticatedRequest } from "../middleware/authentication";

export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (url === "/auth/register" && method === "POST") {
    const body = await parseBody(req);
    console.log("Body recibido en /auth/register:", body); // 🔍 Depuración

    const result = safeParse(authSchema, body);
    if (result.issues) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Bad request', issues: result.issues }));
      return;
    }

    const { email, password } = body;

    try {
      const user = await createUser(email, password);
      res.statusCode = 201;
      res.end(JSON.stringify({ message: "User created", user }));
      return;
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error instanceof Error ? error.message : "Internal server error" }));
      return;
    }
  }

  if (url === "/auth/login" && method === "POST") {
    const body = await parseBody(req);
    console.log("Body recibido en /auth/login:", body); // 🔍 Depuración

    const result = safeParse(authSchema, body);
    if (result.issues) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Bad request', issues: result.issues }));
      return;
    }

    const { password, email } = body; // 🔄 Corregido: se usaba email en lugar de username

    try {
      const user = findUserByEmail(email);

      if (!user || !(await validatePassword(user, password))) {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
      }

      const accessToken = sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: "1h" }
      );

      const refreshToken = sign(
        { id: user.id },
        config.jwtSecret,
        { expiresIn: "1h" }
      );

      user.refreshToken = refreshToken;
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Login successful", accessToken, refreshToken }));
      return;

    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error instanceof Error ? error.message : "Internal server error" }));
      return;
    }
  }

  if (url === "/auth/logout" && method === "POST") {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (token) {
      addRevokeToken(token);
      const formattedReq = req as AuthenticatedRequest;

      if (formattedReq.user && typeof formattedReq.user === "object" && "id" in formattedReq.user) {
        const result = removeUserToken(formattedReq.user.email);
        if (!result) {
          res.statusCode = 403;
          res.end(JSON.stringify({ message: "Forbidden" }));
          return;
        }
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Logout successful" }));
      return;
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Endpoint not found" }));
};
