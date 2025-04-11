#!/bin/bash

# Find all HTML files in the current folder and subfolders
find . -name "*.html" | while read file; do
  # Use awk to safely lowercase src= and href= values
  awk '{
    while (match($0, /(src|href)="[^"]+"/)) {
      prefix = substr($0, 1, RSTART - 1)
      match_str = substr($0, RSTART, RLENGTH)
      suffix = substr($0, RSTART + RLENGTH)
      gsub(/(src|href)="|"/, "", match_str)
      lower = tolower(match_str)
      gsub(match_str, lower)
      $0 = prefix match_str suffix
    }
    print
  }' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done
