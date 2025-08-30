import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type { DOMWindow } from "jsdom";

const windowForServer: DOMWindow = new JSDOM("").window;
const domPurify = DOMPurify(windowForServer);

export function stripHtml(html: string) {
  return domPurify.sanitize(html, { ALLOWED_TAGS: [] });
}
