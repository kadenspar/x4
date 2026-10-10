#!/usr/bin/env python3
"""Fail if application source or production output reintroduces known tracking or remote assets."""
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
files = [
    root / "src/index.html",
    root / "src/app/app.module.ts",
    root / "src/app/app.component.ts",
    root / "src/app/station/services/layout-service.ts",
    root / "src/environments/environment.production.ts",
    root / "src/environments/environment.prod.ts",
]
dist = root / "dist/x4-new"
if not dist.is_dir():
    print("ERROR: production build missing; run npm run build first")
    sys.exit(1)
files += [p for p in dist.rglob("*") if p.is_file() and p.suffix in {".html",".js",".css"}]
patterns = [
    re.compile(r"googletagmanager\.com|google-analytics\.com|gtag\(|UA-130883167-1", re.I),
    re.compile(r"\bAnalyticsService\b|\bAnalyticsModule\b"),
    re.compile(r"<script[^>]+src=['\"]https?://", re.I),
    re.compile(r"<link[^>]+(?:href)=['\"]https?://", re.I),
    re.compile(r"@import\s+(?:url\()?['\"]?https?://", re.I),
]
errors = []
for path in files:
    data = path.read_text(encoding="utf-8", errors="replace")
    for pattern in patterns:
        if pattern.search(data):
            errors.append(f"{path.relative_to(root)}: {pattern.pattern}")
if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"Privacy check passed ({len(files)} source/output files).")
