# Sample Markdown

This is a *sample* **Markdown** document with `inline code` and a [link](https://example.com).

Setext Header Level 1
=====================

Setext Header Level 2
---------------------

---

> A blockquote line demonstrating quote syntax

- Unordered list item 1
- Unordered list item 2
1. Ordered list item 1
2. Ordered list item 2

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [X] Another completed task

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Data     | More     | Values   |

## Reference Links

This is a [reference link][ref1] and another [link][ref2].

[ref1]: https://example.com "Example Site"
[ref2]: https://github.com

## Autolinks and Email

Visit <https://example.com> or email <user@example.com>.

## Footnotes

This text has a footnote[^1] and another[^note].

[^1]: This is the first footnote.
[^note]: This is a named footnote.

## Code Blocks

Indented code block:

    // This is an indented code block
    function example() {
        return "hello world";
    }

Fenced code block:

```javascript
// fenced code with language hint for nested highlighting
function demo(x) { return x * 2; }
```

```
plain fenced code block (no language) to test generic code fence handling
```

## Text Formatting

~~strikethrough text~~, ***bold and italic***, **bold**, *italic*

Hard line break:  
New line after two spaces.

![Alt text](img.png)

<!-- comment -->
