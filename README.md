# Barber API

## Project Overview

This project is the backend API for a barber shop management platform. It provides a set of endpoints to manage clients, services, and appointments. The API is built with ElysiaJS, a modern web framework for Bun, and uses Drizzle ORM for database interaction. Authentication is handled by the `better-auth` library.

## Features

-   **Client Management**: CRUD operations for clients.
-   **Service Management**: CRUD operations for services.
-   **Appointment Management**: CRUD operations for appointments.
-   **Authentication**: Secure authentication using `better-auth`.
-   **API Documentation**: OpenAPI (Swagger) documentation for all endpoints.

## Technologies Used

-   **Framework**: [ElysiaJS](https://elysiajs.com/)
-   **Runtime**: [Bun](https://bun.sh/)
-   **Database**: [SQLite](https://www.sqlite.org/index.html)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Authentication**: [Better Auth](https://github.com/pilcrowonpaper/better-auth)
-   **Validation**: [Zod](https://zod.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/docs/installation) installed on your machine.
-   A `.env` file with the following content:

```
DB_FILE_NAME=./db.sqlite
```

### Installation

1.  Clone the repository:

```bash
git clone https://github.com/your-username/barber-api.git
```

2.  Install the dependencies:

```bash
bun install
```

### Running the Application

To start the development server, run the following command:

```bash
bun run dev
```

The application will be available at `https://localhost:3000`.

## API Endpoints

### Client Endpoints

-   `GET /api/clients`: Get all clients.
-   `GET /api/clients/:id`: Get a client by ID.
-   `GET /api/clients/email/:email`: Get a client by email.
-   `POST /api/clients`: Create a new client.
-   `PUT /api/clients/:id`: Update a client.
-   `DELETE /api/clients/:id`: Delete a client.

### Service Endpoints

-   `GET /api/services`: Get all services.
-   `GET /api/services/:id`: Get a service by ID.
-   `POST /api/services`: Create a new service.
-   `PUT /api/services/:id`: Update a service.
-   `DELETE /api/services/:id`: Delete a service.

### Appointment Endpoints

-   `GET /api/appointments`: Get all appointments.
-   `GET /api/appointments/:id`: Get an appointment by ID.
-   `GET /api/appointments/client/:id`: Get all appointments for a specific client.
-   `POST /api/appointments`: Create a new appointment.
-   `PUT /api/appointments/:id`: Update an appointment's status.
-   `DELETE /api/appointments/:id`: Delete an appointment.

## Database Schema

### `clients` Table

| Column     | Type    | Constraints                |
| :--------- | :------ | :------------------------- |
| `id`       | `TEXT`  | `PRIMARY KEY`              |
| `name`     | `TEXT`  | `NOT NULL`                 |
| `phone`    | `TEXT`  | `NOT NULL`, `UNIQUE`       |
| `email`    | `TEXT`  | `UNIQUE`                   |
| `created_at` | `TEXT`  | `NOT NULL`, `DEFAULT NOW`  |

### `services` Table

| Column  | Type   | Constraints         |
| :------ | :----- | :------------------ |
| `id`    | `TEXT` | `PRIMARY KEY`       |
| `name`  | `TEXT` | `NOT NULL`          |
| `price` | `REAL` | `NOT NULL`          |

### `appointments` Table

| Column       | Type      | Constraints                |
| :----------- | :-------- | :------------------------- |
| `id`         | `TEXT`    | `PRIMARY KEY`              |
| `date`       | `TEXT`    | `NOT NULL`                 |
| `time`       | `TEXT`    | `NOT NULL`                 |
| `client_id`  | `TEXT`    | `NOT NULL`                 |
| `service_id` | `TEXT`    | `NOT NULL`                 |
| `status`     | `INTEGER` | `NOT NULL`, `DEFAULT 0`    |
| `notes`      | `TEXT`    |                            |
| `created_at` | `TEXT`    | `NOT NULL`, `DEFAULT NOW`  |

### Authentication Schema

The authentication schema is based on the `better-auth` library and includes the following tables:

-   `user`
-   `session`
-   `account`
-   `verification`

## Project Structure

```
/home/andrelzinn/.projects/barber-api/
├───.gitignore
├───bun.lock
├───drizzle.config.ts
├───package.json
├───README.md
├───tsconfig.json
├───.git/...
├───drizzle/...
├───node_modules/...
└───src/
    ├───index.ts
    ├───init.ts
    ├───auth/
    │   ├───auth.ts
    │   └───getUserIdPlugin.ts
    ├───db/
    │   ├───auth-schema.ts
    │   ├───index.ts
    │   ├───schema.ts
    │   └───seed.ts
    ├───plugins/
    │   └───better-auth.ts
    ├───routes/
    │   ├───appointments.ts
    │   ├───auth.ts
    │   ├───clients.ts
    │   └───services.ts
    ├───services/
    │   ├───appointments.ts
    │   ├───auth.ts
    │   ├───client.ts
    │   └───service.ts
    └───types/
        ├───Appointments.ts
        ├───Client.ts
        ├───HandleApiError.ts
        ├───Response.ts
        └───service.ts
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.