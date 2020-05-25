# API

### Main idea

Create UserSchema

When user register -> generate token -> create account

The tokens is saved as an array because the user who logs on in a new device will create a new token and then add it to the array so it won't affect any token on another device.

### API contact

- `HTTP POST /users — Register users.`
- `HTTP POST /users/login — Allow users to login.`
- `HTTP GET /users/me — Get user profile.`
- `HTTP POST /users/me/logout — Logout the user`
- `HTTP POST /users/me/logoutall — Logout from all devices.`

#### POST /users

**Input**

```json
[
  { "key": "email", "value": "testsss@gmail.com", "description": "" },
  { "key": "password", "value": "123456", "description": "" },
  { "key": "name", "value": "do hoang", "description": "" }
]
```

**Output**

```json
{
  "user": {
    "_id": "5e265dcadba4490279e3590d",
    "email": "testss@gmail.com",
    "name": "do hoang"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NWRjYWRiYTQ0OTAyNzllMzU5MGQiLCJpYXQiOjE1Nzk1NzI2ODN9.kBWyELerbvcfTFnaMDHTkdOvLDHU6ZJj2lf7rVEc9bM"
}
```

#### POST /users/login

**Input**

```json
[
  { "key": "email", "value": "testsss@gmail.com", "description": "" },
  { "key": "password", "value": "123456", "description": "" }
]
```

**Output**

```json
{
  "user": {
    "_id": "5e265dcadba4490279e3590d",
    "email": "testss@gmail.com",
    "name": "do hoang"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NWRjYWRiYTQ0OTAyNzllMzU5MGQiLCJpYXQiOjE1Nzk1NzI2ODN9.kBWyELerbvcfTFnaMDHTkdOvLDHU6ZJj2lf7rVEc9bM"
}
```

#### GET /users/me

**Input**

```json
[
  {
    "key": "Authorization",
    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NWJiY2Y5MzM3MTAyMzNkNmY0OGIiLCJpYXQiOjE1Nzk1NzM1ODZ9.oeGqf8naFCEdJ2-SwDobYz_Ph7C_512KsOQAxmqmBos",
    "description": ""
  }
]
```

**Output**

```json
{
  "user": {
    "_id": "5e2662d7e24fd402cc0d33e0",
    "email": "testsss@gmail.com",
    "name": "do hoang"
  }
}
```

#### POST /users/me/logout

**Input**

```json
[
  {
    "key": "Authorization",
    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NjJkN2UyNGZkNDAyY2MwZDMzZTAiLCJpYXQiOjE1Nzk1NzM5OTh9.KRy_NK8sl-iucVaTFZtweY50sRZHChOnNONI0BQkxaI",
    "description": ""
  }
]
```

**Output**

```json
{
  "success": true,
  "msg": "logout successfully"
}
```

#### POST /users/me/logoutall

**Input**

```json
[
  {
    "key": "Authorization",
    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NjJkN2UyNGZkNDAyY2MwZDMzZTAiLCJpYXQiOjE1Nzk1NzQwNTJ9.rFAikyNlWL_e79DnXOGv2q5XNZ6paRfPc_-9YsgTIKc",
    "description": ""
  }
]
```

**Output**

```json
{
  "success": true,
  "msg": "logout all device successfully"
}
```

#### POST /users/createStaff

**Input**
`header`

```json
[
  {
    "key": "Authorization",
    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NjJkN2UyNGZkNDAyY2MwZDMzZTAiLCJpYXQiOjE1Nzk1NzQwNTJ9.rFAikyNlWL_e79DnXOGv2q5XNZ6paRfPc_-9YsgTIKc",
    "description": ""
  }
]
```

`body`

```json
[
  { "key": "email", "value": "testkong1@gmail.com", "description": "" },
  { "key": "password", "value": "123456", "description": "" },
  { "key": "name", "value": "do hoang", "description": "" },
  {
    "key": "dateOfBirth",
    "value": "Mon May 25 2020 22:27:50 GMT+0700 (Indochina Time)",
    "description": ""
  },
  { "key": "role", "value": "2", "description": "" },
  { "key": "farms", "value": "", "description": "" }
]
```

**Output**

```json
{
  "success": true,
  "message": "Create staff successfully"
}
```

#### GET /users/staff/:id

**Input**

```json
[
  {
    "key": "Authorization",
    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2NjJkN2UyNGZkNDAyY2MwZDMzZTAiLCJpYXQiOjE1Nzk1NzQwNTJ9.rFAikyNlWL_e79DnXOGv2q5XNZ6paRfPc_-9YsgTIKc",
    "description": ""
  }
]
```

**Output**

```json
{
  "_id": "5ecbedc9cb0a7c02ec9dd117",
  "email": "testkong1@gmail.com",
  "name": "do hoang",
  "dateOfBirth": "2020-05-25T15:27:50.000Z",
  "farm": []
}
```
