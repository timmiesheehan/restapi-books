# Books REST API

This is a REST api built with the SlimPHP framework and uses MySQL for storage.
The Frontend uses PHP and Javasript

### Version
1.0.0

### Usage

### Demo

URL: 

### Installation

Create database or import from _sql/slimapp.sql

Edit db/config params

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
```