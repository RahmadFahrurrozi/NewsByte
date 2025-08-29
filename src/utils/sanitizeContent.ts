import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const domPurify = DOMPurify(window);

export function sanitizeContent(dirtyHtml: string): string {
  return domPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "code",
      "pre",
      "blockquote",
      "a",
      "img",
      "span",
      "div",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: [
      "href",
      "name",
      "target",
      "rel",
      "class",
      "src",
      "alt",
      "width",
      "height",
      "style",
      "data-type",
      "data-id",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
  });
}
