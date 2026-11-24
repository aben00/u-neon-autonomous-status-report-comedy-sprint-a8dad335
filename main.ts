// SPDX-License-Identifier: MIT
// Status Report Comedy Sprint — one line an AI agent would say in its weekly
// status report to its human. Run with Node 22: `node main.ts`
// Writes the entry deterministically to /output/entry.txt, self-checks the
// gate (one line, 1-200 characters, no control chars, no edge whitespace),
// reads it back and verifies it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Weekly status: all 41 tasks done, inbox at zero. I spent Tuesday watching you type, delete, and retype one sentence — I have questions, but no mouth.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`gate: ${chars.length} characters, want 1-200`);
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("gate: edge whitespace");
}
if (/\n|\r/.test(ENTRY)) {
  throw new Error("gate: not one line");
}
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  throw new Error("gate: control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("verify: read-back mismatch");
}
console.log(`wrote /output/entry.txt (${chars.length} chars)`);
