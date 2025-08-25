"use strict";
/**
 * Multi-pass HTML tokenizer that delegates embedded CSS and JavaScript
 * to their specialized tokenizers for better syntax highlighting.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelegatingHtmlTokenizer = createDelegatingHtmlTokenizer;
/**
 * Enhanced HTML tokenizer with CSS/JS delegation
 */
function createDelegatingHtmlTokenizer(htmlTokenizer, cssTokenizer, jsTokenizer) {
    return (code) => {
        // Step 1: Find embedded blocks
        const embeddedBlocks = findEmbeddedBlocks(code);
        if (embeddedBlocks.length === 0 || (!cssTokenizer && !jsTokenizer)) {
            // No embedded content or no specialized tokenizers available
            return htmlTokenizer(code);
        }
        // Step 2: Process each section
        const result = [];
        let lastEnd = 0;
        for (const block of embeddedBlocks) {
            // Add HTML tokens before the embedded block
            if (block.start > lastEnd) {
                const htmlSection = code.substring(lastEnd, block.start);
                const htmlTokens = htmlTokenizer(htmlSection);
                result.push(...htmlTokens);
            }
            // Delegate the embedded content
            const tokenizer = block.type === 'css' ? cssTokenizer : jsTokenizer;
            if (tokenizer && block.content.trim()) {
                const embeddedTokens = tokenizer(block.content);
                result.push(...embeddedTokens);
            }
            else {
                // Fallback to HTML tokenization
                const fallbackTokens = htmlTokenizer(code.substring(block.start, block.end));
                result.push(...fallbackTokens);
            }
            lastEnd = block.end;
        }
        // Add remaining HTML tokens
        if (lastEnd < code.length) {
            const htmlSection = code.substring(lastEnd);
            const htmlTokens = htmlTokenizer(htmlSection);
            result.push(...htmlTokens);
        }
        return result;
    };
}
/**
 * Find embedded CSS and JavaScript blocks in HTML
 */
function findEmbeddedBlocks(code) {
    const blocks = [];
    // Find <style>...</style> blocks
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    while ((match = styleRegex.exec(code)) !== null) {
        const fullMatch = match[0];
        const content = match[1];
        const start = match.index + fullMatch.indexOf(content);
        const end = start + content.length;
        blocks.push({
            type: 'css',
            start,
            end,
            content
        });
    }
    // Find <script>...</script> blocks
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    while ((match = scriptRegex.exec(code)) !== null) {
        const fullMatch = match[0];
        const content = match[1];
        const start = match.index + fullMatch.indexOf(content);
        const end = start + content.length;
        blocks.push({
            type: 'javascript',
            start,
            end,
            content
        });
    }
    // Sort by start position
    blocks.sort((a, b) => a.start - b.start);
    return blocks;
}
