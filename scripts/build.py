#!/usr/bin/env python3
"""Create the deployable dist/ directory from the canonical src/ tree."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src"
OUTPUT = ROOT / "dist"


def main() -> int:
    validation = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "validate.py")],
        cwd=ROOT,
        check=False,
    )
    if validation.returncode:
        return validation.returncode

    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    shutil.copytree(SOURCE, OUTPUT)
    (OUTPUT / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Built {OUTPUT.relative_to(ROOT)}/ from {SOURCE.relative_to(ROOT)}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
