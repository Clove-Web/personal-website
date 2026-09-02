/* personal/src/scripts/discordMarkdown.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useState } from "react";
import { playClickSound } from "@lib/sound";

export interface MarkdownOpts {
  emojiUrl?: (e: { id: string; animated: boolean }) => string | null;
  emojiClass?: string;
  spoilerClass?: string;
  linkClass?: string;
  inlineOnly?: boolean;
}

function Spoiler({ cls, children }: { cls?: string; children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  return (
    <span
      className={cls}
      data-revealed={shown ? "true" : "false"}
      role="button"
      tabIndex={0}
      aria-label={shown ? "Spoiler, revealed" : "Spoiler, click to reveal"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        playClickSound();
        setShown(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShown(true);
        }
      }}
    >
      {children}
    </span>
  );
}

const URL_RE = /https?:\/\/[^\s<>()[\]]+/;
const EMOJI_RE = /^<(a)?:(\w+):(\d+)>/;
const MASKED_RE = /^\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/;

const DELIMS: { open: string; tag: "strong" | "em" | "u" | "s" | "spoiler"; both?: boolean }[] = [
  {
    open: "***",
    tag: "strong",
    both: true
  },
  {
    open: "___",
    tag: "u",
    both: true
  },
  {
    open: "**",
    tag: "strong"
  },
  {
    open: "__",
    tag: "u"
  },
  {
    open: "~~",
    tag: "s"
  },
  {
    open: "||",
    tag: "spoiler"
  },
  {
    open: "*",
    tag: "em"
  },
  {
    open: "_",
    tag: "em"
  },
];

function isWordChar(c: string | undefined): boolean {
  return !!c && /[\w]/.test(c);
}

function parseInline(text: string, opts: MarkdownOpts, k: { n: number }): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let buf = "";
  let i = 0;

  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = "";
    }
  };

  while (i < text.length) {
    const c = text[i];

    if (c === "\\" && i + 1 < text.length && /[^a-zA-Z0-9\s]/.test(text[i + 1])) {
      buf += text[i + 1];
      i += 2;
      continue;
    }

    if (c === "`") {
      const fence = text.startsWith("```", i) ? "```" : "`";
      const close = text.indexOf(fence, i + fence.length);
      if (close !== -1) {
        flush();
        let body = text.slice(i + fence.length, close);
        if (fence === "```") {
          body = body.replace(/^[a-zA-Z0-9+#-]*\n/, "").replace(/\n$/, "");
          out.push(<pre key={k.n++}><code>{body}</code></pre>);
        } else {
          out.push(<code key={k.n++}>{body}</code>);
        }
        i = close + fence.length;
        continue;
      }
    }

    if (c === "<") {
      const m = EMOJI_RE.exec(text.slice(i));
      if (m) {
        const url = opts.emojiUrl?.({
          id: m[3],
          animated: m[1] === "a"
        }) ?? null;
        if (url) {
          flush();
          out.push(
            <img
              key={k.n++}
              className={opts.emojiClass}
              src={url}
              alt={":" + m[2] + ":"}
              title={":" + m[2] + ":"}
              loading="lazy"
            />,
          );
          i += m[0].length;
          continue;
        }
      }
    }

    if (c === "[") {
      const m = MASKED_RE.exec(text.slice(i));
      if (m) {
        flush();
        out.push(
          <a key={k.n++} className={opts.linkClass} href={m[2]} target="_blank" rel="noopener noreferrer">
            {parseInline(m[1], opts, k)}
          </a>,
        );
        i += m[0].length;
        continue;
      }
    }

    if ((c === "h" || c === "H") && /^https?:\/\//i.test(text.slice(i))) {
      const m = URL_RE.exec(text.slice(i));
      if (m) {
        const raw = m[0].replace(/[.,;:!?]+$/, "");
        flush();
        out.push(
          <a key={k.n++} className={opts.linkClass} href={raw} target="_blank" rel="noopener noreferrer">
            {raw}
          </a>,
        );
        i += raw.length;
        continue;
      }
    }

    let matched = false;
    for (const d of DELIMS) {
      if (!text.startsWith(d.open, i)) continue;

      if (d.open === "_" || d.open === "___") {
        if (isWordChar(text[i - 1])) continue;
      }

      const close = text.indexOf(d.open, i + d.open.length);
      if (close === -1) continue;
      const body = text.slice(i + d.open.length, close);
      if (!body) continue;
      if ((d.open === "_" || d.open === "___") && isWordChar(text[close + d.open.length])) continue;

      flush();
      const inner = parseInline(body, opts, k);
      if (d.tag === "spoiler") {
        out.push(<Spoiler key={k.n++} cls={opts.spoilerClass}>{inner}</Spoiler>);
      } else if (d.both) {
        out.push(
          d.tag === "strong"
            ? <strong key={k.n++}><em>{inner}</em></strong>
            : <u key={k.n++}><em>{inner}</em></u>,
        );
      } else {
        const Tag = d.tag;
        out.push(<Tag key={k.n++}>{inner}</Tag>);
      }
      i = close + d.open.length;
      matched = true;
      break;
    }
    if (matched) continue;

    buf += c;
    i++;
  }

  flush();
  return out;
}

export function renderDiscordMarkdown(
  raw: string,
  opts: MarkdownOpts = {},
): React.ReactNode[] {
  const text = String(raw ?? "").replace(/\r\n/g, "\n");
  if (!text.trim()) return [];
  const k = { n: 0 };

  if (opts.inlineOnly) return parseInline(text, opts, k);

  const out: React.ReactNode[] = [];
  const segments = text.split(/(```[\s\S]*?```)/g);

  for (const seg of segments) {
    if (!seg) continue;
    if (seg.startsWith("```") && seg.endsWith("```") && seg.length > 5) {
      const body = seg.slice(3, -3).replace(/^[a-zA-Z0-9+#-]*\n/, "").replace(/\n$/, "");
      out.push(<pre key={k.n++}><code>{body}</code></pre>);
      continue;
    }

    const lines = seg.split("\n");
    let quoteAll = false;

    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      let node: React.ReactNode;

      const tripleQuote = /^>>>\s(.*)$/.exec(line);
      const quote = /^>\s(.*)$/.exec(line);
      const heading = /^(#{1,3})\s+(.+)$/.exec(line);
      const subtext = /^-#\s+(.+)$/.exec(line);
      const bullet = /^[-*]\s+(.+)$/.exec(line);

      if (tripleQuote) {
        quoteAll = true;
        node = <blockquote key={k.n++}>{parseInline(tripleQuote[1], opts, k)}</blockquote>;
      } else if (quoteAll) {
        node = <blockquote key={k.n++}>{parseInline(line, opts, k)}</blockquote>;
      } else if (quote) {
        node = <blockquote key={k.n++}>{parseInline(quote[1], opts, k)}</blockquote>;
      } else if (heading) {
        const H = (["h1", "h2", "h3"] as const)[heading[1].length - 1];
        node = <H key={k.n++}>{parseInline(heading[2], opts, k)}</H>;
      } else if (subtext) {
        node = <small key={k.n++}>{parseInline(subtext[1], opts, k)}</small>;
      } else if (bullet) {
        node = <li key={k.n++}>{parseInline(bullet[1], opts, k)}</li>;
      } else {
        node = <span key={k.n++}>{parseInline(line, opts, k)}</span>;
      }

      out.push(node);
      if (li < lines.length - 1) out.push(<br key={k.n++} />);
    }
  }

  return out;
}
