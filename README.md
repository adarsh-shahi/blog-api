# Blog-API Reference Documentation

Documented by [Dubem Obinna-Esiowu](https://github.com/Dubemobinna) - [LinkedIn](https://www.linkedin.com/in/dubemobinnaesiowu/) - [Twitter](https://twitter.com/thedocswriter)


## API reference

## Getting started

Contains information about the signup and signin, /signup API helps you create an account to get started and the /login endpoint signs the user in.

### **Endpoints**

`POST` /signup
/signup endpoint helps you create an account to get started.

`POST` /login
/login endpoint signs the user in.

### **/signup**

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "s********@gmail.com",
"username": "****",
"password": "*******"
}' 
```

**Response format**

Placing an API call to the signup endpoint returns a response that contains your set username, email, and token.

```json
{
    "status": "success",
    "message": {
        "username": "xxxx",
        "email": "xxxxxxxxxxxx@gmail.com",
        "token": "ey***********G8w"
    }
}
```

**Response schema**

| Item | Description | Data type | Required/Optional |
| ------ | ------ | ------ | ------ |
| username | an identification used by a person with access to an online service | string | required |
| email | messages distributed by electronic means | string | required |
| token | an object which represents the right to perform some operation | string | required |

### **/login**

**Request format (CURL)**

```curl --location 'https://blog-api-dcha.onrender.com/v1/login' \
--header 'Content-Type: application/json' \
--data '{
"username": "****",
"password": "*********"
}'
```

**Response format**

```json
{
    "status": "success",
    "message": {
        "username": "xxxx",
        "email": "xxxxxxxxxxxxx@gmail.com",
        "token": "ey*********1E"
    }
}
```

**Response schema**

| Item | Description | Data type | Required/Optional |
| ------ | ------ | ------ | ------ |
| username | an identification used by a person with access to an online service | string | required |
| email | messages distributed by electronic means | string | required |
| token | an object which represents the right to perform some operation | string | required |

## User

To fetch, delete and update information about a specific user using their “id”. You can track information on the user by entering the unique user id, as it returns all basic information such as the user’s email, name, bio, avatar, and password.
  
### **Endpoints**

`GET`	/users/:id
`DELETE`	/users/:id
`PATCH`	/users/:id

### **Parameters**

**Header parameter**

Authorization: Bearer ey**************G8w

**Path parameter**

| Path parameter | Description |
| ------ | ------ |
| :id | abbreviation for a specific user identification |

- ### Retrieve specific user data

### **/users/:id**

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/users/12' \
--header 'Authorization: Bearer ey**************G8w'
```

**Response format**

```json
{
    "status": "success",
    "user": {
        "id": 12,
        "username": "xxxxxxxxxxx",
        "email": "xxxxxxxxxx@wayne.com",
        "bio": null,
        "avatar": null,
        "password": "******"
    }
}
```

**Response schema

| Item | Description | Data type | Required/Optional |
| ------ | ------ | ------ | ------ |
| id | abbreviation for identification| integer| required |
| username | an identification used by a person with access to an online service | string | required |
| email | messages distributed by electronic means | string | required |
| bio | a biography or short profile of someone | string | optional |
| avatar | an icon or figure representing a perticular person on internet forum | string | optional |
| password | a string of characters,allows access to a computer system | string | required |


- ### Delete user
### **/users/:id**

**Request format (CURL)**

```
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/users/12' \
--header 'Authorization: Bearer ey*************G8w'
```

**Response format**

```json
{
    "status": "success",
    "message": {
        "id: 2,
        "username": "Duby"
        "email": "**********@gmail.com",
        "bio": null,
        "avatar": null,
        }
  }
  ```
  
**Response schema

| Item | Description | Data type | Required/Optional |
| ------ | ------ | ------ | ------ |
| id | abbreviation for identification| integer| required |
| username | an identification used by a person with access to an online service | string | required |
| email | messages distributed by electronic means | string | required |
| bio | a biography or short profile of someone | string | optional |
| avatar | an icon or figure representing a perticular person on internet forum | string | optional |


- ### **Update user**

**/users/:id**


**Request format (CURL)**

```
curl --location --request PATCH 'https://blog-api-dcha.onrender.com/v1/users/12' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer ey*********G8w' \
--data '{
    "username": "****",
    "bio": ****,
    "avatar": ****
}'
```

**Response format**

```json
{
    "status": "success",
    "message": {
        "id: 2,
        "username": "Duby"
        "email": "**********@gmail.com",
        "bio": null,
        "avatar": null,
        }
  }
  ```
  
**Response schema
  
| Item | Description | Data type | Required/Optional |
| ------ | ------ | ------ | ------ |
| id | abbreviation for identification| integer| required |
| username | an identification used by a person with access to an online service | string | required |
| email | messages distributed by electronic means | string | required |
| bio | a biography or short profile of someone | string | optional |
| avatar | an icon or figure representing a perticular person on internet forum | string | optional |

## Post statuses

To get and fetch all post data. The response you receive can be further filtered through the query parameter.

### **Endpoints**
  
`GET` /posts
`POST` /posts
`GET` /posts/:id
`PATCH` /posts/:id |

### **Parameters**

**Header parameter**

Authorization: Bearer ey**************G8w

**Path parameter**

| Path parameter | Description |
| ------ | ------ |
| :id | abbreviation for a specific user identification |

- ### **Fetch all posts**

**/posts**


**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts' \
--header 'Authorization: Bearer ey*******G8w'

```

**Response format**

```json
{
    "status": "success",
    "message": {
        "postLength": 2,
        "posts": [
            {
                "username": "batman",
                "user_id": 11,
                "id": 4,
                "title": "The batman",
                "content": "about movie review",
                "thumbnail_url": "https://*********",
                "updated_at": "2023-******"
            },
            {
                "username": "batman",
                "user_id": 11,
                "id": 3,
                "title": "The batman",
                "content": "about movie review",
                "thumbnail_url": "https://********",
                "updated_at": "2023-*******Z"
            }
        ]
    }
}
```


- ### **Add posts**

**/posts**

Use the API to add a new post to the list of posts. The add posts endpoint uses the POST request method in this format.

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer ey*************G8w' \
--data '{
    "title": "newman",
    "content": "great movie",
    "url": "https://*************fecb"
}'
```


**Response format**

```json
{
    "status": "success",
    "message": "posted"
}
```

- ### **Fetch posts by post ID**

**/posts/:id**

This endpoint lets you filter posts by adding a specific post ID to the endpoint in this format. 

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/10' \
--header 'Authorization: Bearer ey******G8w'

**Response format**

```json
{
               "username": "batman",
               "user_id": 11,
               "id": 3,
               "title": "The batman",
               "content": "about movie review",
               "thumbnail_url": "https://*******",
               "updated_at": "2023-******"
           }
           
```

- ### **Update post by post id**

**/posts/:id**

Use this endpoint to update your posts by the post’s id. There are various options when it comes to updating posts. You can edit the post title, post content, or thumbnail.

**Request format (CURL)**

```
curl --location --request PATCH 'https://blog-api-dcha.onrender.com/v1/posts/5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer ey**********G8w' \
--data '{
    "content": "the batman first blog"
}'
```

**Response format**

```json
{
    "status": "success",
    "message": "post updated"
}
```

## Post likes

To get a collection of usernames of those who have liked a post and to fetch number of likes on a post

### **Endpoints**

`GET` /posts/:id/like/usernames
`GET` /posts/:id/like/count
`GET` /posts/:id/like/user/:uid
      /posts/:id/like/user/:uid
`DELETE` /posts/:id/like/user/:uid

### **Parameters**

**Header parameter**

Authorization: Bearer ey**************G8w

**Path parameter**

| Path parameter | Description |
| ------ | ------ |
| :id | abbreviation for a specific user identification |
| :uid | a unique identifier is a numeric or alphanumeric integer, associated with a single entity within a given system |

- ### **All usernames that have liked a post**

**/posts/:id/like/usernames** 

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/3/like/usernames' \
--header 'Authorization: Bearer ey***********G8w'
```

**Response format**

```json
{
    "status": "success",
    "message": []
}
```

- ### **Like counts on a post**

**posts/:id/like/count**

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/3/like/count' \
--header 'Authorization: Bearer eyJ************G8w'
```


**Response format**

```json
{
    "status": "success",
    "message": "0"
}
```

- ### **Check whether a user liked a post**

**posts/:id/like/user/:uid**


Use this endpoint to find out if a user has liked a post or not. The likes endpoint requires two IDs: one if the post `<id>` and the other is the user id `<uid>`. The two IDs are integers and to make a successful call to the endpoint, you must replace them with the appropriate integer in the URL.

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/5/like/user/20' \
--header 'Authorization: Bearer ey**********Vy1E'
```

**Response format**

```json
{
    "status": "success",
    "message": false
}
```

- ### **Like a post

**posts/:id/like/user/:uid**

- ### **Delete like on a post**

**posts/:id/like/user/:uid**


This endpoint deletes a like for the user in the post with the given id. To place an API call to this endpoint, you need to replace `<id>`, and `<uid>` with the integer for the post identifier and user identifier respectively. 

**Request format (CURL)**

```
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/posts/5/like/user/20' \
--header 'Authorization: Bearer ey***********G8w'
```

**Response format**

```json
{
    "status": "success",
    "message": "like deleted"
}
```

## Comments 

### **Endpoints**

`GET` /posts/:id/comment
`PATCH` /posts/:id/comment/user/:uid
`DELETE` /posts/:id/comment/user/:uid

### **Parameters**

**Header parameter**

Authorization: Bearer ey**************G8w

**Path parameter**

| Path parameter | Description |
| ------ | ------ |
| :id | abbreviation for a specific user identification |
| :uid | a unique identifier is a numeric or alphanumeric integer, associated with a single entity within a given system |

- ### **All comments on a post**

**/posts/:id/comment**

Use this endpoint to retrieve comments on a specific post. The identifier required in the endpoint is the post identifier specific to the post you need data on. 

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/5/comment' \
--header 'Authorization: Bearer ey**********Vy1E'
```

**Response format**

```json
{
    "status": "success",
    "message": []
}
```

- ### **Update comments on a post**

**/posts/:id/comment/user/:uid**

Querying this endpoint allows update or make changes to a comment on a post. To make an update on a specific post, you have to filter using resource parameters. In this case, the resource parameters are the user identifier `<id>` and the post identifier `<uid>`.  

**Request format**

```
curl --location --request PATCH 'https://blog-api-dcha.onrender.com/v1/posts/5/comment/user/20' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJ***********G8w' \
--data '{
    "comment": "updated comment"
}'
```

**Response format**

```json
{
    "status": "success",
    "message": "comment updated."
}
```


- ### **Delete a comment**

**/posts/:id/comment/user/:uid**


This endpoint deletes comments on a specific post. To determine the actual post where you want to delete a comment, you need to use the resource parameters, `<id>` and `<uid>`.

**Request format (CURL)**

```json
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/posts/5/comment/user/20' \
--header 'Authorization: Bearer ey*************G8w'
```

**Response format**

```json
{
    "status": "success",
    "message": "comment done"
}
```

## Sample responses

| Error codes | description |
| ------ | ------ |
| 200 | OK |
| 400 | BAD REQUEST |
| 401 | UNAUTHORIZED |
| 403 | FORBIDDEN | 
| 404 | NOT FOUND |

### **200 OK**

Everything worked as expected.
```json
{
    "status": "success",
    "user": {
        "id": 12,
        "username": "xxxxxxxxxxx",
        "email": "xxxxxxxxxx@wayne.com",
        "bio": null,
        "avatar": null,
        "password": "*****************************************************************r3lqO"
    }
}
```


### **400 BAD REQUEST**

The request was unsuccessful, this is mostly as a result of missing parameters. It could be a query parameter or a resource parameter. 

```json
{
    "status": {
        "error": true,
        "code": 400,
        "type": "bad request",
        "message": {
            "description": "status has an incorrect data type. It should be -> integer",
            "attribute": "status"
        }
 }
}
```


### **401 UNAUTHORIZED**

You get this error when the token you passed is invalid or you didn’t pass an authorization token at all 

```json
{
    "status": "fail",
    "message": "you are not logged in"
}
```


### **403 FORBIDDEN**

The bearer token passed doesn't have permissions to perform the request.

```json
{
    "status": {
        "error": true,
        "code": 403,
        "type": "forbidden",
        "message": "user is not authorized to access this User"
 }
}
```

### **404 NOT FOUND**

This means that the resource you are trying to call does not exist

```json
{
    "status": {
        "error": true,
        "code": 404,
        "type": "not found",
        "message": "User for id 11111111 was not found"
 }
}
```

