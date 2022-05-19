### Hexlet tests and linter status:
[![Actions Status](https://github.com/jennysgod/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/jennysgod/frontend-project-lvl2/actions)

<a href="https://codeclimate.com/github/jennysgod/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/375b9de5d9871720f2cc/maintainability" /></a>

<a href="https://codeclimate.com/github/jennysgod/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/375b9de5d9871720f2cc/test_coverage" /></a>

### Консольная утилита «Вычислитель отличий»
Программа, определяющая разницу между двумя структурами данных.
Возможности утилиты:

    Поддержка разных входных форматов: yaml, json
    Генерация отчета в виде plain text, stylish и json

#### Установка:

`$ make install`

`$ sudo npm link`

<a href="https://asciinema.org/a/494620" target="_blank"><img src="https://asciinema.org/a/494620.svg" /></a>

#### Сравнение файлов .json и .yml в формате stylish:
`gendiff ./__fixtures__/file1.json ./__fixtures__/file2.yml`

<a href="https://asciinema.org/a/494606" target="_blank"><img src="https://asciinema.org/a/494606.svg" /></a>

#### Сравнение файлов .json и .yml в формате plain:
`gendiff -f plain ./__fixtures__/file1.json ./__fixtures__/file2.yml`

<a href="https://asciinema.org/a/494607" target="_blank"><img src="https://asciinema.org/a/494607.svg" /></a>

#### Сравнение файлов .json и .yml в формате JSON:
`gendiff -f json ./__fixtures__/file1.json ./__fixtures__/file2.yml`

<a href="https://asciinema.org/a/494608" target="_blank"><img src="https://asciinema.org/a/494608.svg" /></a>