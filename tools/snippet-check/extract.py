#!/usr/bin/env python3
"""Pull every GDScript snippet on the site into one directory of .gd files.

The site's example code lives in four places -- static/scripts/*.gd, the `usage`
arrays in src/data/*.json, ```gdscript fences in docs/, and <CodeBlock
language="gdscript"> in src/**/*.tsx. Nothing type-checks any of it, so a
snippet can sit there for a year calling a method that never existed. Extract
them, then run check.gd / run.gd from a Godot project that has the addons
installed.
"""
import json, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "build-snippets"

def write(name: str, code: str) -> None:
    (OUT / name).write_text(code.rstrip() + "\n", encoding="utf-8")

def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    n = 0

    for gd in sorted((ROOT / "static/scripts").glob("*.gd")):
        write(gd.name, gd.read_text(encoding="utf-8")); n += 1

    for jf in sorted((ROOT / "src/data").glob("*.json")):
        for key, entry in json.loads(jf.read_text(encoding="utf-8")).items():
            for i, u in enumerate(entry.get("usage", [])):
                if "code" in u:
                    write(f"{jf.stem}__{key}__{i}.gd", u["code"]); n += 1

    for md in sorted((ROOT / "docs").rglob("*.md*")):
        for i, m in enumerate(re.finditer(r"```gdscript\n(.*?)```", md.read_text(encoding="utf-8"), re.S)):
            write(f"{md.stem}__{i}.gd", m.group(1)); n += 1

    for tsx in sorted((ROOT / "src").rglob("*.tsx")):
        src = tsx.read_text(encoding="utf-8")
        for i, m in enumerate(re.finditer(r'<CodeBlock language="gdscript">\{`(.*?)`\}</CodeBlock>', src, re.S)):
            write(f"{tsx.stem}__{i}.gd", m.group(1).replace("\\`", "`").replace("\\$", "$")); n += 1

    print(f"{n} snippet(s) -> {OUT}")

if __name__ == "__main__":
    main()
