#!/bin/bash
# Outputs the commits for a given lab
ROOT="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/.."
LAB=$1
echo "Getting commits for lab $LAB"
# ./scripts/get-team-names.sh | grep -v teachers > $ROOT/pl2223-teams.txt
gh org-commits -o ULL-ESIT-PL-2324 \
     -l $LAB \
     -f ./pl2223-teams.txt -t > $ROOT/src/.vuepress/labs/${LAB}.json
echo "Output is left at: $ROOT/src/.vuepress/labs/${LAB}.json"
