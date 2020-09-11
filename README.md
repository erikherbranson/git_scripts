# git_scripts

A collection of Git scripts to handle common tasks during development

# Groom script

## Description

This script is used for when you need to clean up your local git repository. It will delete all local branches merged into the target branch that you set. It will also delete references to remote branches that don't exist anymore.

## Configuration

```
TARGET_BRANCH=development
```

Make sure to set your target branch if you're using a different branch other than development. (While it's not necessary to run the script, it helps the prompt stay consistent and keep you from accidentally deleting valuable branches)

```
git remote prune origin
```

This script assumes that you didn't rename your git remote. If you did, you'll need to update this line to match the renamed remote.

## Usage

![groom-1 image](https://res.cloudinary.com/dtryqekz1/image/upload/v1599865024/groom-1_wxr4t4.png)

![groom-2 image](https://res.cloudinary.com/dtryqekz1/image/upload/v1599865024/groom-2_rpgtnz.png)
