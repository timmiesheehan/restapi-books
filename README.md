# Books REST API

This is a REST API built with the SlimPHP framework and uses MySQL for storage.
The frontend uses Vanilla Javascript

### Version
1.0.0

### Demo

URL: https://timmys.dev/books

### Installation

Create database

Edit db/config params under src

Install SlimPHP and dependencies

```sh
$ composer
```

### API Endpoints
```sh
$ GET /api/books
$ GET /api/book/{id}
$ POST /api/book/add
$ PUT /api/book/update/{id}
$ DELETE /api/book/delete/{id}
$ GET /api/books/reset
```