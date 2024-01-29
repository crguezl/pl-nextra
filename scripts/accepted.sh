#!/bin/bash
CLASSROOMPATTERN=$1
CLASSROOM=$(gh classroom list --per-page 200 | grep $(gh pwd) | awk '{print $1}')
if [ -z "$CLASSROOM" ]; then
    echo "No classroom \"$(gh pwd)\" found"
    exit 1
fi
ASSIGNMENTID=$(gh classroom assignments --per-page 200  -c $CLASSROOM | grep -i $CLASSROOMPATTERN | awk '{print $1}')
if [ -z "$ASSIGNMENTID" ]; then
    echo "No assignment \"$CLASSROOMPATTERN\" found"
    exit 1
fi
gh classroom accepted-assignments -a $ASSIGNMENTID


