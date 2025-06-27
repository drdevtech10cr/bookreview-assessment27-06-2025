# 📚 Book Review API

A backend RESTful API built using **NestJS**, **TypeORM**, **PostgreSQL**, and **Jest** for managing Books and their Reviews with Users.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) operations for:
  - Users
  - Books
  - Book Reviews
- Book Reviews linked to Books and Users
- Role-safe structure
- Unit & Integration tests using **Jest**
- PostgreSQL DB integration with TypeORM
- DTO validations

---

## 🔧 Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/) for testing
- [class-validator](https://github.com/typestack/class-validator)

---

## 📦 Project Setup

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/drdevtech10cr/bookreview-assessment27-06-2025.git
cd book-review-api

API Endpoints
| Method | Route                  | Description              |
| ------ | ------------------     | ------------------------ |
| GET    | /books                 | Get all books            |
| POST   | /books                 | Create a new book        |
| GET    | /books/:id             | Get book by ID           |
| POST   | /books/:bookId/review  | Create review for a book |
| GET    | /books/:bookId/review  | Get reviews for a book   |
| GET    | /books-reviews         | Get all reviews          |
| GET    | /books-reviews/:id     | Get review by ID         |
