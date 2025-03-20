import type { IncomingMessage } from "node:http";
import { StringDecoder } from "node:string_decoder";

/**
 * Parses the body of an incoming HTTP request and returns it as a JSON object.
 * 
 * @param {IncomingMessage} req - The incoming HTTP request.
 * @returns {Promise<any>} A promise that resolves to the parsed JSON object.
 * @throws {Error} If the body cannot be parsed as JSON.
 */
export const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on('data', (chunk) => {
      buffer += decoder.write(chunk);
    });

    req.on('end', () => {
      buffer += decoder.end();

      try {
        resolve(JSON.parse(buffer));
      } catch (err) {
        reject(err);
      }
    });
  });
};
