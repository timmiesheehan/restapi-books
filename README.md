# Books REST API

This is a REST API built with PHP using the SlimPHP framework and uses MySQL for storage.
The frontend uses Vanilla Javascript

### Version
1.0.0

### Demo

URL: https://timmys.dev/books

### Installation

Create database

``` sh
CREATE TABLE books(
  id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  rating int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

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
