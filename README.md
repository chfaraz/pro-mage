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

### you may view the swagger docs at localhost:3000/docs

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




# Event-driven Architecture

This application supports event-driven communication, allowing third-party applications to subscribe to specific events and respond to changes happening in the system. The following events are exposed for external services to listen to, enabling them to take action based on updates in the system.


## Project Events
- **`project.created`**: Triggered when a project is created.
- **`project.updated`**: Triggered when a project is updated.
- **`project.deleted`**: Triggered when a project is deleted.
- **`project.projectManagerAssigned`**: Triggered when a project manager is assigned to a project.
- **`project.end`**: Triggered when a project ends.
- **`project.endSummary`**: Triggered when a project's end summary is generated.

## Task Events
- **`task.created`**: Triggered when a task is created.
- **`task.updated`**: Triggered when a task is updated.
- **`task.deleted`**: Triggered when a task is deleted.
- **`task.completed`**: Triggered when a task is completed.
- **`task.rejected`**: Triggered when a task is rejected.
- **`task.started`**: Triggered when a task is started.
- **`task.not started`**: Triggered when a task is not started.

## How to Subscribe
To subscribe to any of the events listed above, you can make a **POST request** to the `api_url/subscriptions` endpoint with the following request body:

### Request Body:
```json
{
  "callbackUrl": "https://your-application-url.com/callback",  // The URL that will receive the event notifications
  "event": "event_name"  // The event you want to subscribe to (e.g., 'project.created', 'task.updated')
}