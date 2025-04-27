# Setup application

### Env setup
Run the following with conda, to create env: 
```
conda env create -f environment.yml
pip install -r requirements.txt
```

### Mongo cred setup. 
Create a `.env` file within the `/backend` folder. Then write your username and password as indicated: 

```
MONGO_URI = mongodb+srv://`YOURUSER`:`YOURPASS`@db.xtn5b1o.mongodb.net/?retryWrites=true&w=majority&appName=db
HUME_API_KEY = `YOURAPI`
HUME_SECRET = `YOURSECRET`
WEBSOCKETURL = `YOURURL`
```
