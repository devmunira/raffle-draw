
# Raffle Draw API

It's an rest api for raffle draw microservice with express js


## Features

- Create new ticket
- Find all tickets [sorting , pagination , count , filter]
- Sold tickets find [sorting , pagination , count , filter]
- Find single ticket
- Delete single ticket
- Bulk delete by Id
- Update ticket by id
- Bulk update by id only status
- Sell ticket
- Ticket qnty management
- Find tickets by username [sorting , pagination , count , filter]
- Raffle draw for count 3 winners


## Tech Stack

**Server:** Node, Express


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`ANOTHER_API_KEY`

    
## Run Locally

Clone the project

```bash
  git clone https://github.com/devmunira/raffle-draw
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm init
```

Start the server

```bash
  npm run dev
```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Authors

- [@devmunira](https://www.github.com/devmunira)

