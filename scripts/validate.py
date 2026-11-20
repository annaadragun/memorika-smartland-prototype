#!/usr/bin/env python3
"""Validate the static prototype without third-party dependencies."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src"


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.assets: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        values = dict(attrs)
        if tag in {"img", "script"} and values.get("src"):
            self.assets.add(values["src"] or "")
        if tag == "link" and values.get("href"):
            self.assets.add(values["href"] or "")


def local_path(base: Path, reference: str) -> Optional[Path]:
    if not reference or reference.startswith(("http://", "https://", "data:", "#")):
        return None
    return (base / reference.split("?", 1)[0].split("#", 1)[0]).resolve()


def main() -> int:
    errors: list[str] = []
    index = SOURCE / "index.html"
    if not index.exists():
        errors.append("src/index.html is missing")
    else:
        parser = AssetParser()
        parser.feed(index.read_text(encoding="utf-8"))
        for reference in sorted(parser.assets):
            target = local_path(index.parent, reference)
            if target and not target.exists():
                errors.append(f"Missing asset referenced by index.html: {reference}")

    for css in SOURCE.rglob("*.css"):
        content = css.read_text(encoding="utf-8")
        if content.count("{") != content.count("}"):
            errors.append(f"Unbalanced braces: {css.relative_to(ROOT)}")

    import_pattern = re.compile(r'(?:from\s+|import\s*)["\']([^"\']+)["\']')
    for script in SOURCE.rglob("*.js"):
        content = script.read_text(encoding="utf-8")
        for reference in import_pattern.findall(content):
            target = local_path(script.parent, reference)
            if target and not target.exists():
                errors.append(f"Missing JS module from {script.relative_to(ROOT)}: {reference}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Validation passed: HTML assets, JavaScript modules, and CSS structure are consistent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
