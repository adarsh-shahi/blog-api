# Blog-API Documentation

## Introduction

The Blog API enables you to integrate the full functionality of a blog with your application by using the REST APIs. Applications can interact with the Blog API by sending and receiving data as JSON. 

Using the Blog API, you can sign up, log in, create new articles, update older articles, fetch user data, update users on the platform, and more. This will create seamless connectivity and automate blogging processes on your application.

## Quickstart

This document is intended for developers building applications that require a blog section and seek to integrate its functionality.  

To get started, you will have to use an authentication token. 

## Authentication

Blog-API uses an authentication mechanism based on basic authentication. Once the authentication is successful, you will be provided with a token that grants you authorized access to the private endpoints. 

## Schema overview 

| id | integer|
---------------
| uid | integer |
----------------
| Username | string |
---------------
| Email | string |
---------------
| Bio | string |
---------------
| Avatar | string |
---------------
| Password | string |
-------------------

## API reference

- ### Getting started 

### **/signup**

The /signup API helps you create an account to get started and also gives you access to the authentication token. The process will allow you access to resources of other endpoints.

You can signup by sending an HTTP `POST` request using the following format

`POST https://blog-api-dcha.onrender.com/v1/signup`


You won’t need the authentication token for this public endpoint. Rather, the API call to the `/signup` endpoint will provide a response containing the authentication key. 

To get you signed in,  include your email, username, and password in the request body. 

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

```
{
    "status": "success",
    "message": {
        "username": "xxxx",
        "email": "xxxxxxxxxxxx@gmail.com",
        "token": "ey***********G8w"
    }
}
```

### **/login**

The login endpoint signs the user in. The first thing it loads up is the login page, followed by an option for authentication. 

Although it doesn’t require any authentication to place the API call, in the body of the /login method, you must include your username and password. 

The login endpoint signs the user in. The first thing it loads up is the login page, followed by an option for authentication. 

Although it doesn’t require any authentication to place the API call, in the body of the /login method, you must include your username and password. 

The /login endpoint also supports the HTTP ```POST``` request method and uses this format 

```POST https://blog-api-dcha.onrender.com/v1/login```

**Request format (CURL)**

```curl --location 'https://blog-api-dcha.onrender.com/v1/login' \
--header 'Content-Type: application/json' \
--data '{
"username": "****",
"password": "*********"
}'
```

**Response format**

```
{
    "status": "success",
    "message": {
        "username": "xxxx",
        "email": "xxxxxxxxxxxxx@gmail.com",
        "token": "ey*********1E"
    }
}
```

  ## User

In order to access this set of endpoints, you are required to pass the authentication token in the header for verifications. 

- ### Retrieve specific user data
  
 ### **/users/:id**

 This is used to fetch information about a specific user using their “id”. You can track information on the user by entering the unique user id, as it returns all basic information such as the user’s email, name, bio, avatar, and password. 

Here, the user id is an integer and should be added to the endpoint in this format:

```GET https://blog-api-dcha.onrender.com/v1/users/<id>```

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/users/12' \
--header 'Authorization: Bearer ey**************G8w'
```

**Response format**

```
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

- ### Delete user
### **/users/:id**

You can use this endpoint to delete a user’s profile by specifying a valid user identifier. Here, the user ID is an integer and should be added to the endpoint in this format. 

```DELETE https://blog-api-dcha.onrender.com/v1/users/<id>```

**Request format (CURL)**

```
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/users/12' \
--header 'Authorization: Bearer ey*************G8w'
```

**Response format**

```
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

- ### **Update user**

**/users/:id**

Set the id of the specific user, and input the new username, bio, and avatar for the profile of the existing user to be updated. 

This request will return the updated details of the specific user, including their username, email, bio, and avatar. 

`PATCH 'https://blog-api-dcha.onrender.com/v1/users/12'`


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

```
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
  ## Post statuses

- ### **Fetch all posts**


**/posts**


This endpoint when triggered is responsible for fetching all post data. The response you receive can be further filtered through the query parameter.

The /posts endpoint also supports the HTTP `GET` request method and uses this format

`GET https://blog-api-dcha.onrender.com/v1/posts`


**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts' \
--header 'Authorization: Bearer ey*******G8w'

```

**Response format**

```
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

Use the API to add a new post to the list of posts. The add posts endpoint uses the POST request method in this format:

`POST https://blog-api-dcha.onrender.com/v1/posts`

To complete the API call, you must include the title, content, and URL of the post you want to add to the collection in the body of your request using JSON format. 

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

```
{
    "status": "success",
    "message": "posted"
}
```


- ### **Fetch posts by post ID**

**/posts/:id**

This endpoint lets you filter posts by adding a specific post ID to the endpoint in this format:

`GET https://blog-api-dcha.onrender.com/v1/posts/<id>`

The response you will get is data retrieved for the post you specified by ID. It will include the username, user id, post id, context, and thumbnail. 

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/10' \
--header 'Authorization: Bearer ey******G8w'

Response format

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

The /posts/:id endpoint supports the HTTP `PATCH` request method and uses this format:

`PATCH https://blog-api-dcha.onrender.com/v1/posts/<id>`

In the body of your request, you must add the details of the post you want to update in JSON format. In this request example, we will be updating the post content. 

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

```
{
    "status": "success",
    "message": "post updated"
}
```

## Post likes

- ### **All usernames that have liked a post**

**/posts/:id/like/usernames**

This is the endpoint to use to enable you to retrieve a collection of usernames of those who have liked a post. 

The /posts/:id/like/usernames endpoint supports the HTTP `PATCH` request method and uses this format:

`GET https://blog-api-dcha.onrender.com/v1/posts/<id>/like/usernames`

Replace `<id>` with the specific post id for the post you want to get information about. 

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/3/like/usernames' \
--header 'Authorization: Bearer ey***********G8w'
```

**Response format**

```
{
    "status": "success",
    "message": []
}
```

- ### **Like counts on a post**

**posts/:id/like/count**


Fetch number of likes on a post using this endpoint. The `/posts/:id/like/count` endpoint supports the HTTP `GET` request method and uses this format:

`GET https://blog-api-dcha.onrender.com/v1/posts/<id>/like/count`

Replace `<id>` with the specific post id to retrieve like counts on that post.

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/3/like/count' \
--header 'Authorization: Bearer eyJ************G8w'
```


**Response format**

```
{
    "status": "success",
    "message": "0"
}
```

- ### **Check whether a user liked a post**

**posts/:id/like/user/:uid**


Use this endpoint to find out if a user has liked a post or not. The likes endpoint requires two IDs: one if the post `<id>` and the other is the user id `<uid>`. The two IDs are integers and to make a successful call to the endpoint, you must replace them with the appropriate integer in the URL

The `/posts/:id/like/user/:uid` endpoint supports the HTTP `GET` request method and uses this format:

`GET https://blog-api-dcha.onrender.com/v1/posts/<:id>/like/user/<:uid>`

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/5/like/user/20' \
--header 'Authorization: Bearer ey**********Vy1E'
```

**Response format**

```
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

The `/posts/:id/like/user/:uid` endpoint supports the HTTP `GET` request method and uses this format:

`DELETE https://blog-api-dcha.onrender.com/v1/posts/<:id>/like/user/<:uid>`

**Request format (CURL)**

```
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/posts/5/like/user/20' \
--header 'Authorization: Bearer ey***********G8w'
```

**Response format**

```
{
    "status": "success",
    "message": "like deleted"
}
```

## Comments 

- ### **All comments on a post**

**/posts/:id/comment**


Use this endpoint to retrieve comments on a specific post. The identifier required in the endpoint is the post identifier specific to the post you need data on. 

The `/posts/:id/comment` endpoint supports the HTTP `GET` request method and uses this format:

`GET https://blog-api-dcha.onrender.com/v1/posts/:id/comment`

**Request format (CURL)**

```
curl --location 'https://blog-api-dcha.onrender.com/v1/posts/5/comment' \
--header 'Authorization: Bearer ey**********Vy1E'
```

**Response format**

```
{
    "status": "success",
    "message": []
}
```

- ### **Update comments on a post**

**/posts/:id/comment/user/:uid**

Querying this endpoint allows update or make changes to a comment on a post. To make an update on a specific post, you have to filter using resource parameters. In this case, the resource parameters are the user identifier `<id>` and the post identifier `<uid>`. 

The `/posts/:id/comment` endpoint supports the HTTP `GET` request method and uses this format:

`PATCH https://blog-api-dcha.onrender.com/v1/posts/<:id>/comment/user/<:uid>`

In the request body, add details of the comment in JSON format in order to successfully make the update. 

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

```
{
    "status": "success",
    "message": "comment updated."
}
```


- ### **Delete a comment**

**/posts/:id/comment/user/:uid**


This endpoint deletes comments on a specific post. To determine the actual post where you want to delete a comment, you need to use the resource parameters, `<id>` and `<uid>`.

The /posts/:id/comment/user/:uid endpoint supports the HTTP GET request method and uses this format:

`DELETE https://blog-api-dcha.onrender.com/v1/posts/<:id>/comment/user/<:uid>`

**Request format (CURL)**

```
curl --location --request DELETE 'https://blog-api-dcha.onrender.com/v1/posts/5/comment/user/20' \
--header 'Authorization: Bearer ey*************G8w'
```

**Response format**

```
{
    "status": "success",
    "message": "comment done"
}
```

## Sample responses
### **200 OK**

Everything worked as expected.
```
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

```
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

```
{
    "status": "fail",
    "message": "you are not logged in"
}
```


### **403 FORBIDDEN**

The bearer token passed doesn't have permissions to perform the request.

```
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

```
{
    "status": {
        "error": true,
        "code": 404,
        "type": "not found",
        "message": "User for id 11111111 was not found"
 }
}
```




