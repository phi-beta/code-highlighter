export interface AutoRegisterOptions {
    /** If true, logs each language registration */
    verbose?: boolean;
    /** Explicit directory override (defaults to ./generated/antlr relative to this file) */
    dir?: string;
    /** Provide an explicit token map override per language */
    tokenMaps?: Record<string, Record<string, string>>;
}
export declare function registerGeneratedAntlrLanguages(opts?: AutoRegisterOptions): Promise<void>;
/**
 * Attempts to auto-register generated lexers but never throws; returns the list
 * of languages registered before & after for diagnostic use.
 */
export declare function attemptAutoRegisterGeneratedAntlrLanguages(opts?: AutoRegisterOptions): Promise<{
    before: string[];
    after: string[];
}>;
declare const _default: {
    registerGeneratedAntlrLanguages: typeof registerGeneratedAntlrLanguages;
};
export default _default;
