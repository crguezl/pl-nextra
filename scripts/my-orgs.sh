#!/bin/bash
# Description: List all organizations that the user is a member of
MEMBERS=$(gh api --paginate /user/memberships/orgs --jq '
  [ 
    .[].organization 
    | { name: .login, url: .url  } 
  ]')
echo $MEMBERS 