## Setup

1. install packages - npm install
2. Connect to MongoDB server, can connect through localhost or provide username, password, host and database name in environment variables(.env).
   To start application - npm run start:dev
3. Use POSTMAN or any service to hit api endpoints,

   1. `GET /movies`: To get all movies , response is array of movies , example :
      "movies": [
      {
      "_id": "65ebefb55c7b099497de8032",
      "title": "Gaami 2",
      "genre": "Drama",
      "rating": "1",
      "link": "www.google.co.in",
      "createdAt": "2024-03-09T05:12:21.697Z",
      "updatedAt": "2024-03-09T05:12:17.317Z",
      "__v": 0
      },
      ]
   2. `GET /search?title=Avatar&genre=DRAMA`: Search using a specific title or genre, any one of these can also be used

   The below api's require "admin" role, so send {user-roles: admin} in request headers attaching screenshot
   ![Image][(/src/data/Untitled.png.jpg)] 3.`POST /movies`: To create a new movie record example :
   {
   "title": "Avatar",
   "genre": "Action",
   "rating": "4",
   "link": "www.google.co.in",
   } 4.`PUT /movies/:id`: To update existing movie by ID example: {
   "title": "Avatar",
   "genre": "Action",
   "rating": "4",
   "link": "www.google.co.in",
   } 5.`DELETE /movies/:id`: To delete movie by ID

4. Unit tests have been written with Jest using Typescript in spec file in tests folder to run tests use - npm test
5. Auto Caching has been done using Cache Manager , you can see the differnece in response times in get /movies call for first time and later calls.
   Example , for first call response time is 40 ms, for furthur calls it is 5ms
6. RoleGuard ahs been implemented to allow only admin, for certain api calls, use request headers with key `user-roles` and value `admin,user` to access them.
7. ES-Lint has been implemented for code quality and some eslint rules for Jest are enabled.
