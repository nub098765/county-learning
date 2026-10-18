import re, json
html = open("index.html", encoding="utf-8").read()
m = re.search(r'<template id="us-map-template">(.*?)</template>', html, re.S)
svg = m.group(1).strip()
open("us-map.js", "w", encoding="utf-8").write("window.US_MAP_SVG = " + json.dumps(svg) + ";\n")
print(len(svg) // 1024, "KB written to us-map.js")