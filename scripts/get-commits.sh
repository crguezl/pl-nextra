#!/bin/bash
set -e
# install gh-org-commits extension
DATE="2024-30-01"
lab="iaas"
ORG=ULL-ESIT-PL-2324
gh org-commits -f _data/team-names.txt -d $DATE -l $lab -o $ORG
