import fs from "node:fs";
const src = fs.readFileSync("user-flow-sv3.mmd", "utf8");
const b64 = Buffer.from(JSON.stringify({ code: src, mermaid: { theme: "default" } }), "utf8").toString("base64url");
const svg = await fetch(`https://mermaid.ink/svg/${b64}`);
console.log("svg:", svg.status);
if (svg.ok) fs.writeFileSync("user-flow-sv3.svg", await svg.text());
for (const q of ["", "?type=png", "?type=png&width=2400", "?type=png&scale=2"]) {
  const r = await fetch(`https://mermaid.ink/img/${b64}${q}`);
  console.log("png", q || "(none)", "→", r.status);
  if (r.ok) { fs.writeFileSync("user-flow-sv3.png", Buffer.from(await r.arrayBuffer())); break; }
}
