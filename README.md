# Books REST API

This is a REST API built with the SlimPHP framework and uses MySQL for storage.
The Frontend uses Javasript

### Version
1.0.0

### Usage

### Demo

URL: 

### Installation

Create database

Edit db/config params under src

Install SlimPHP and dependencies

```sh
$ composer
```
### API Endpints
```sh
$ GET /api/books
$ GET /api/book/{id}
$ POST /api/book/add
$ PUT /api/book/update/{id}
$ DELETE /api/book/delete/{id}
$ GET /api/books/reset
```