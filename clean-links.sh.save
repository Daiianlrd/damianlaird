#!/bin/bash

# This script updates all HTML files: it lowercases only local file paths in src and href,
# skipping external URLs (http, https, mailto)

find . -name "*.html" | while read file; do
  awk '{
    while (match($0, /(src|href)="[^"]+"/)) {
      pre = substr($0, 1, RSTART - 1)
      match_str = substr($0, RSTART, RLENGTH)
      attr = substr(match_str, 1, index(match_str, "=") - 1)
      path = substr(match_str, index(match_str, "=") + 2, length(match_str) - index(match_str, "=") - 2)

      # Only lowercase if path is relative and points to image or doc (not http links)
      if (path ~ /^(http|https|mailto):/) {
        $0 = pre match_str substr($0, RSTART + RLENGTH)
        continue
      }

      # Also strip starting L if it exists (fixing earlier mistake)
      if (substr(path, 1, 1) == "L") {
        path = substr(path, 2)
      }

      lower_path = tolower(path)
      new_attr = attr "=\"" lower_path "\""
      $0 = pre new_attr substr($0, RSTART + RLENGTH)
    }
    print
  }' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done
