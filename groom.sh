#!/bin/bash

# This script will delete all local branches that are merged into the target branch and prune remote referrences.
# If you renamed your remote to something other than origin you'll need to update line 32

TARGET_BRANCH=development
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
EMPTY_LINE=""
TOTAL_BRANCHES_TO_DELETE=$(git branch --merged | egrep -v "(^\*|master|development|release)" | wc -l )

echo "----------------------------------------"

echo "This action will delete all branches merged into your current branch."
echo "To work correctly, make sure you're on '$TARGET_BRANCH' branch"

echo $EMPTY_LINE

echo "Your current branch is: $CURRENT_BRANCH"

echo $EMPTY_LINE

echo "Total branches to delete: $TOTAL_BRANCHES_TO_DELETE"
echo -n "Proceed? [y/n] -> "
read -n 1 ans

echo $EMPTY_LINE

if [ "$ans" == "y" ]
then
  echo " Working..."
  git branch --merged | egrep -v "(^\*|master|development|release)" | xargs git branch -d
  git remote prune origin
else
  echo "Cancelled action"
fi