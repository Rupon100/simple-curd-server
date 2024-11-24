/*
------------
MongoDB connection
------------
1. create account
2. Create an user with password
3. whitelist ip address
4. database > connect > driver > node > show all code
5. change the password in the uri


------------
SERVER SIDE (POST)
------------
1. create ---- POST
2. app.post('/users', async(req, res))
3. make the function async to use await inside it
4. go the documentation "node mongodb crud" > uses examples > insert operations 
5. access data from the body: const user = req.body (make sure you use the express.json() middleware)
6. const result = await userCollection.insertOne(user);
7. res.send(result)
------------
CLIENT SIDE (POST)
------------
1. create fetch()
2. add second parameter as an object 
3. provide method: 'POST'
4. add headers: {'content-type': 'application/json'}
5. body: JSON.stringfy(user data)


------------
READ MANY
------------
1. create a cursor = useCollection.find()
2. const result =  await cursor.toArray()
3. 

------------
DELETE
------------
1. create app.delete('/users/:id', async(req,res) => {})
2. get id=rew.params.id
3. const query = { _id: new ObjectId(id) }
4. const result = await userCollection.deleteOne(query)

***Client(delete)
1. create URL with id
2. mention the delete method

*/