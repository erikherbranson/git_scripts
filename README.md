# gitm

Git Manager

A collection of Git scripts to handle common tasks during development

## Setup

```
# Download the gitm file and make it executable
$ chmod +x gitm

# Then move it somewhere in your $PATH. Here is an example:
$ mv gitm ~/bin/
```

## Options

### `-g, --groom`

This option is used for when you need to clean up your local git repo. Remove old git artifacts.

What it does:

- deletes all local branches merged into the current branch that you're on
- deletes references to remote branches that don't exist anymore

### `-h, --help`

Print out the options for usage

### `--version`

Prints out the version number
