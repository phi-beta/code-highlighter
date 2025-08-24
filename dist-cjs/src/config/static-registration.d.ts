/**
 * Static registration of ANTLR languages for pkg executables
 * This avoids runtime file discovery issues in packaged environments
 */
declare function registerAllAntlrLanguages(): Promise<void>;
export { registerAllAntlrLanguages };
