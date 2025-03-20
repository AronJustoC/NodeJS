import { minLength, object, pipe, string, type InferInput } from "valibot";

const nameSchema = pipe(string(), minLength(6));
const ageSchema = pipe(string(), minLength(1));

export const characterSchema = object({
  name: nameSchema,
  age: ageSchema,
});

export type Character = InferInput<typeof characterSchema> & {
  id: number;
};

const characters: Map<number, Character> = new Map();

/**
 * Retrieves all characters.
 * @returns {Character[]} An array of all characters.
 */
export const getAllCharacters = (): Character[] => {
  return Array.from(characters.values());
};

/**
 * Retrieves a character by its ID.
 * @param {number} id - The ID of the character.
 * @returns {Character | undefined} The character with the given ID, or undefined if not found.
 */
export const getCharacterById = (id: number): Character | undefined => {
  return characters.get(id);
};

/**
 * Adds a new character.
 * @param {Character} character - The character to add.
 * @returns {Character} The newly added character with a generated ID.
 */
export const addCharacter = (character: Character): Character => {

  if (character.id && characters.has(character.id)) {
    console.error('character with id', character.id, 'already exists');
    return character;
  };

  const newCharacter = {
    ...character,
    id: new Date().getTime()
  };

  characters.set(newCharacter.id, newCharacter);
  return newCharacter;
};

/**
 * Updates an existing character.
 * @param {number} id - The ID of the character to update.
 * @param {Character} updatedCharacter - The updated character data.
 * @returns {Character | null} The updated character, or null if the character was not found.
 */
export const updateCharacter = (id: number, updatedCharacter: Character): Character | null => {
  if (!characters.has(id)) {
    console.error('characters with id', id, 'not found');
    return null;
  };

  characters.set(id, updatedCharacter);
  // if it doesn't exist, create it; if it exists, update it
  return updatedCharacter;
};

/**
 * Deletes a character by its ID.
 * @param {number} id - The ID of the character to delete.
 * @returns {boolean} True if the character was deleted, false if the character was not found.
 */
export const deleteCharacter = (id: number): boolean => {
  if (!characters.has(id)) {
    console.error('characters with id', id, 'not found');
    return false;
  };
  characters.delete(id);
  return true;
};
