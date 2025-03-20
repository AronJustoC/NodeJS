import { IncomingMessage, type ServerResponse } from 'http';
import { authenticateToken, type AuthenticatedRequest } from '../middleware/authentication';
import { addCharacter, characterSchema, deleteCharacter, getAllCharacters, HttpMethod, Role, updateCharacter, type Character } from '../models';
import { authorizeRoles } from '../middleware/authorization';
import { parseBody } from '../utils/parseBody';
import { safeParse } from 'valibot';


export const characterRouter = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const { method, url } = req;

  if (!await authenticateToken(req as AuthenticatedRequest, res)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return;
  };

  if (url === '/characters' && method === HttpMethod.GET) {
    const characters = getAllCharacters();

    res.statusCode = 200;
    res.end(JSON.stringify(characters));
    return;
  }

  if (url === '/characters/' && method === HttpMethod.GET) {
    const id = parseInt(url.split('/').pop() as string, 10);
    const character = getAllCharacters().find((character) => character.id === id);

    if (!character) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Character not found' }));
      return;
    };

    res.statusCode = 200;
    res.end(JSON.stringify(character));
    return;
  };

  if (url === '/characters/' && method === HttpMethod.POST) {
    if (!authorizeRoles(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res)) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: 'Forbidden' }));
      return;
    }

    const body = await parseBody(req);
    const result = safeParse(characterSchema, body);

    if (result.issues) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: result.issues }));
      return;
    }

    const character: Character = body;

    addCharacter(character);
    res.statusCode = 201;
    res.end(JSON.stringify(character));
    return;
  };

  if (url?.startsWith('/characters/') && method === HttpMethod.PATCH) {
    if (!authorizeRoles(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res)) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: 'Forbidden' }));
      return;
    };

    const body = await parseBody(req);
    const result = safeParse(characterSchema, body);
    if (result.issues) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: result.issues }));
      return;
    }

    const id = parseInt(url.split('/').pop() as string, 10);
    const character: Character = body;
    const updatedCharacter = updateCharacter(id, character);

    if (!updatedCharacter) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Character not found' }));
      return;
    };
    res.statusCode = 200;
    res.end(JSON.stringify(updatedCharacter));
    return;
  };

  if (url?.startsWith('/characters/') && method === HttpMethod.DELETE) {

    if (!authorizeRoles(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res)) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: 'Forbidden' }));
      return;
    };

    const id = parseInt(url.split('/').pop() as string, 10);
    const deleted = deleteCharacter(id);

    if (!deleted) {
      res.statusCode = 404; // Not found
      res.end(JSON.stringify({ message: 'Character not found' }));
      return;
    };

    res.statusCode = 204; // No content
    res.end(JSON.stringify({ message: 'Character deleted' }));
    return;
  };

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};


