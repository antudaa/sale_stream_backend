# Sale Stream Backend

This is an E-commerce API built with `TypeScript`, `Express`, `Mongoose`, and `Zod` for data validation. The API allows for managing products and orders, including creating, retrieving, updating, and deleting products, as well as creating and retrieving orders.

## Table of Contents

- [Sale Stream Backend](#sale-stream-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Set up environment variables](#set-up-environment-variables)
    - [Start the server](#start-the-server)
  - [Contributing](#contributing)

## Features

- **Product Management**
  - Create a new product
  - Retrieve all products
  - Retrieve a product by ID
  - Update product information
  - Delete a product
  - Search products by term

- **Order Management**
  - Create a new order (with inventory update)
  - Retrieve all orders
  - Retrieve orders by user email

## Requirements

- Node.js (v14 or later)
- MongoDB
- ExpressJS

## Getting Started

### Clone the repository

```bash
git clone https://github.com/antudaa/sale_stream_backend.git
cd sale_stream_backend
```

### Install dependencies
```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```bash
MONGO_URI=mongodb+srv://<admin>:<password>@cluster0.txtczm4.mongodb.net/<project-name>?retryWrites=true&w=majority&appName=Cluster0

PORT=5000
```


### Start the server
```bash
npm run start:dev
```

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Open a pull request