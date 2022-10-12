# Typescript Mongo Express

Node demo app using typescript(class base\*), mongodb cloud and express.

## Appendix

- dynamic script for create module files. (npm run cm)
- user authentication with jwt.
- login, register.
- user crud operation.
- api collection

## API Reference

Token is required for each api

#### Test

```http
  End_point :- /api/test
```

| Parameter | Method | Type     | Description                |
| :-------- | :----- | :------- | :------------------------- |
| -         | GET    | `string` | **Required**. Your API key |
| -         | POST   | `string` | **Required**.              |

#### Auth Module

```http
  End_point :- /api/auth/**
```

| end point            | Method | Description |
| :------------------- | :----- | :---------- |
| `/api/auth/login`    | POST   | -           |
| `/api/auth/register` | POST   | -           |

```REQ_BODY
{
  "username":"",
  "password":""
}

```

#### User Module

```http
  base url :-  /api/user
```

| End_point        | Method | Description |
| :--------------- | :----- | :---------- |
| ` /api/user`     | POST   |             |
| ` /api/user/:id` | GET    |             |
| ` /api/user/:id` | PUT    |             |
| ` /api/user/:id` | DELETE |             |

```req body :
{
  "name": {
    "first_name": "",
    "middle_name": "",
    "last_name": ""
  },
  "email": "",
  "phone_number": "",
  "gender": "",
  "modification_notes": {
    "modified_on": "",
    "modified_by": "",
    "modification_note": ""
  }
}

```

## Tech Stack

**Client:** -

**Language:** Typescript

**Server:** Node, Express

**DB:** MongoDB
