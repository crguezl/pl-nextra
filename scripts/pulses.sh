#!/usr/bin/env bash

# grep -i $1 teams-PL.txt >> PE101.txt
YEAR=2223

function help() {
  echo "Usage:"
  echo "  $0 -l <LAB> -g <GROUP> [-y YEAR] [-d]"

  echo
  echo "Example:"
  echo "pulses.sh -l scope-intro  -g PE101 -d"
  echo
  echo "By default the ORG is obtained using the command gh pwd."
  echo "  For a better experience set these alias:"
  echo "    set alias pwd to:  !gh config get current-org"
  echo "    set alias cd to:   !gh config set current-org "$1" 2>/dev/null"
  exit 1
}

POSITIONAL_ARGS=()
while [[ $# -gt 0 ]]; do
  case $1 in
  -l | --lab)
    LAB=$2
    shift # past argument
    shift # past value
    ;;
  -g | --group)
    GROUP=$2
    shift # past argument
    shift # past value
    ;;
  -y | --year)
    YEAR=$2
    shift # past argument
    shift # past value
    ;;
  -d | --dry)
    DRY=true
    shift # past value
    ;;
  -* | --*)
    help
    ;;
  *)
    POSITIONAL_ARGS+=("$1") # save positional arg
    shift # past argument
    ;;
  esac
done

if [ -z "$LAB" ]; then
  echo "Missing lab"
  help
fi

if [ -z "$GROUP" ]; then
  echo "Missing group"
  help
fi

if [ $DRY ]; then
  gh org-browse-repo -u -S $LAB  -P 10 -f ~/campus-virtual/${YEAR}/pl${YEAR}/pl${YEAR}apuntes-vuepress/${GROUP}.txt -d
else
  gh org-browse-repo -u -S $LAB  -P 10 -f ~/campus-virtual/${YEAR}/pl${YEAR}/pl${YEAR}apuntes-vuepress/${GROUP}.txt
fi