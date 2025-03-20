const revokedToken: Set<string> = new Set();

/**
 * Adds a token to the set of revoked tokens.
 * @param {string} token - The token to revoke.
 * @returns {void}
 */
export const addRevokeToken = (token: string): void => {
  revokedToken.add(token);
};

/**
 * Checks if a token has been revoked.
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is revoked, false otherwise.
 */
export const isTokenRevoked = (token: string): boolean => {
  return revokedToken.has(token);
};
