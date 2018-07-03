# Botfuel CLI

Botfuel-dialog command line utility.

# Features

# Installation
```shell
npm install -g botfuel-cli
```

# Usage

## Create a new project

```shell
fuel new my-new-bot
````

## Generate files

```shell
fuel generate <command>
```

## Generate view

```shell
fuel generate view <name>
```

## Generate Dialog

```
fuel generate dialog <name> [entities..] [--type=]

Generating dialog <name> of type [type] with [entities]

Options:
  --type     Dialog type (void, base, default, qna,
             confirmation)            [default: "default"]
```

## Example

```shell
fuel generate dialog travel destination:city pilot:forename --type=prompt
```

## Generate Config

```shell
fuel g config <name> [options]

Generate config <name>

Options:
  --adapter  Adapter to use (test, botfuel, shell, messenger ...)
                                                              [default: "shell"]
  --brain    Brain to use (memory, mongo)
  --locale   Locale to use (en, fr, en)
  --logger   Logger to use (debug, info, error)
  --modules  List of modules used (botfuel-module-facetedsearch, ...)
```

### Example
```shell
fuel g c botfuel --adapter=botfuel --brain=mongo --locale=en --logger=info --modules="foo bar"
```
