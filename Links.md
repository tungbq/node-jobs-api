## 1. Mongoose
https://mongoosejs.com/docs/guide.html

## 2. Pre middleware
https://mongoosejs.com/docs/middleware.html#pre

## 3. Instance method
https://mongoosejs.com/docs/guide.html#methods

## 4. To generate a key
https://www.allkeysgenerator.com/

## 5. Queries
https://mongoosejs.com/docs/queries.html

## 6. Password compare
https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

## 7. Reference other
https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose

## 8. Postman tricks (for testing purpose), when user login, we get the token and set is as global variable then reuse in job routes
### 8.1. Register/login route 
```
const jsonData = pm.response.json();
console.log(jsonData)
pm.globals.set('accessToken', jsonData.token);
pm.globals.get("accessToken");
```

### 8.2. Job routes, we update the authorization part to use {{accessToken}} generated before

## 9. Rate limit
https://www.npmjs.com/package/express-rate-limit
