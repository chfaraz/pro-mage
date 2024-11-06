# NestJS Application Setup with PostgreSQL

This repository contains a **NestJS** application that is configured to work with **PostgreSQL** as the database. Follow the instructions below to get started.

## Prerequisites

Before running the application, make sure you have the following installed on your local machine:

1. **Node.js** 
2. **npm** or **yarn** 
3. **PostgreSQL** 
4. **Postman** 

### Install Node.js & npm

To install Node.js, visit the official [Node.js website](https://nodejs.org/).

## Steps to Start the Application

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/nestjs-postgres-app.git
cd nestjs-postgres-app
```

mention port and database connection in .env file

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


# The architecture adopted to solve the challenges:

In order to address the core challenges of this application—scalability, reliability, and simplicity—I adopted a NestJS backend, PostgreSQL as the database, and an event-driven architecture using webhooks. Each of these technologies was selected for its specific strengths in solving the unique requirements of this project.

### Nestjs

NestJS was chosen as the backend framework due to its powerful and flexible architecture. It is built with TypeScript, offering a highly maintainable and scalable development environment. 

### Postgres

PostgreSQL was selected as the relational database management system (RDBMS) for its robust features and excellent support for complex queries, transactions, and data integrity.

### Webhooks

The decision to implement an event-driven architecture (EDA) using webhooks was made to address the need for loose coupling between services, real-time updates, and scalability.

Webhooks are simple, lightweight HTTP callbacks that allow one system to notify another system about events or updates in real-time.

# Any other decisions on tradeoffs I decided to make while solving the project:

While considering the architecture for this app, I initially thought about using Kafka or Socket.IO for real-time communication. However, both options would have introduced unnecessary complexity:

### Kafka
Kafka is powerful for handling high-throughput, distributed systems, but it felt like overkill for a small-scale app, as it would add significant infrastructure overhead.

### Socket.IO 
Sockets offers real-time communication but would require managing persistent connections, which seemed excessive for this application.

Ultimately, I chose webhooks because they provide a simple, efficient solution for event-driven communication. Webhooks are lightweight, easy to implement, and perfect for sending asynchronous notifications without the complexity of maintaining open connections or managing a message broker.
