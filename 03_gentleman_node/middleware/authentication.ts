import type { IncomingMessage, ServerResponse } from "http";
import { verify, type JwtPayload } from "jsonwebtoken";
import { isTokenRevoked } from "../models";
import config from "../config.ts";

export interface AuthenticatedRequest extends IncomingMessage {
  user?: JwtPayload | string;
};

/**
 * Middleware to authenticate a token.
 * @param {AuthenticatedRequest} req - The incoming request object.
 * @param {ServerResponse} res - The server response object.
 * @returns {Promise<boolean>} A promise that resolves to true if the token is valid, false otherwise.
 */
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: ServerResponse
): Promise<boolean> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Unauthorized" }));
    return false;
  };

  if (isTokenRevoked(token)) {
    res.statusCode = 403;
    res.end(JSON.stringify({ message: "Forbidden" }));
    return false;
  };

  try {
    const decoded = verify(token, config.jwtSecret);

    req.user = decoded;

    return true;

  } catch (_err) {
    res.statusCode = 403; // Forbidden
    res.end(JSON.stringify({ message: "Forbidden" }));
    return false;
  }
};
