/* personal/src/lib/sound.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

function play(file: string) {
  const sound = new Audio(file);
  sound.play().catch(() => {});
}

const lastPlayedAt = new Map<string, number>();

function playThrottled(file: string, throttleMs: number) {
  const now = Date.now();
  const last = lastPlayedAt.get(file) ?? 0;
  if (now - last < throttleMs) return;
  lastPlayedAt.set(file, now);
  play(file);
}

export function playClickSound() {
  play("https://m.doughmination.gay/sfx/click.mp3");
}

export function playHoverSound() {
  playThrottled("https://m.doughmination.gay/sfx/hover.mp3", 150);
}

export function playOpenSound() {
  play("https://m.doughmination.gay/sfx/toggle.mp3");
}

export function playCloseSound() {
  play("https://m.doughmination.gay/sfx/toggle.mp3");
}
