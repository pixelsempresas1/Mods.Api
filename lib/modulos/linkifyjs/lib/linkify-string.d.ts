export = linkifyStr;
/**
 * Convert a plan text string to an HTML string with links. Expects that the
 * given strings does not contain any HTML entities. Use the linkify-html
 * interface if you need to parse HTML entities.
 *
 * @param {string} str string to linkify
 * @param {object} [opts] overridable options
 * @returns {string}
 */
declare function linkifyStr(str: string, ...args: any[]): string;
