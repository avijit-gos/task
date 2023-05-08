
# Basic user CRED operations

Assi

## Documentation
To start the project clone the github repo
```
https://github.com/avijit-gos/task.git
```
To install all dependency
```
npm install
```
To start the project
```
npm start
```
or you can run the development server by running
```
npm run dev
```
## API Reference

#### Register new user

```http
  POST http://localhost:8080/api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `string` | **Required**. user name, email, username, password |

#### Login user

```http
  POST http://localhost:8080/api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `string` | **Required**. user logUser(email/username),password |


#### Fetch all users

```http
  GET http://localhost:8080/api?page=0&limit=2
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. x-access-token |
| `page`  | `number` | **Required** |
| `limit`  | `number` | **Required** |

#### Fetch single user

```http
  GET http://localhost:8080/api/single/USER_ID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. x-access-token |
| `User_ID` | `string` | **Required**. |


#### Update single user name

```http
  PUT http://localhost:8080/api/update/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. x-access-token |
| `updated user_name`  | `string` | **Required** |


#### Delete user

```http
  DEL http://localhost:8080/api/delete/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. x-access-token |
