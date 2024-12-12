# IBS-bangkit-cloud-computing
The source code of IBS App API Back-End

# API Description
This is source code of Backend API of Indonesia Bebas Sampah (IBS) App to GET and POST data who consume by our IBS Mobile Application.
Build using Node JS and Express framework. Server deployed at Google Cloud Run.

# API Endpoint
|             Endpoint            | Method |                                         Body Sent (JSON & Form Data)                             |                                          Description                                          |
| :-----------------------------: | :----: | :----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|                /test            |   GET  |                                    Hello World!                                                  |                                        GET REQUEST                                            |
|              /register          |  POST  |                                   email, password                                                |                      POST REQUEST Post data to firestore users database                       |
|               /login            |  POST  |                                   email, password                                                |                              POST REQUEST Login to the application                            |
|              /predict           |  POST  |                                       image                                                      |                         POST REQUEST Predict of waste classification result                   |
|              /articles           |   GET  |                         id, image_url, title, description, content                               |                                    GET REQUEST article data                                   |

# How to run this Node and Express JS App
- Clone this repo
- Open vs code with wsl (Windows Subsystem for Linux) terminal
- Type `npm install/npm i` and enter
- Serve the Express app by typing `npm run start-dev`
- It will run on http://localhost:8080


# Postman Test

### REGISTER

- URL
    
    `/register`
    
- METHOD
    
    `POST`
    
- REQUEST BODY
```json
{
  "email": "user@example.com",
  "password": "user"
}
  ```  
- RESPONSE
    
```json
{
    "message": "User registered successfully"
}
```
    

### LOGIN

- URL
    
   ` /login`
    
- METHOD
    
   ` POST`
    
- REQUEST BODY
    
```json
{
  "email": "user@example.com",
  "password": "user"
}
```
    
- RESPONSE
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJidWRpQGV"
}
```
### PREDICT

- URL
    
    `/predict`
    
- METHOD
    
    `POST`
    
- BODY
    
    `Content-Type: multipart/form-data`
    
- REQUEST BODY
    
    image as file **`Image must be jpg, jpeg, or png format!`**
    
- RESPONSE
    
```json
{
    "status": "success",
    "message": "Model is predicted successfully",
    "data": {
        "id": "393bfc6f-d7e7-4524-b0b3-539de9e4da17",
        "result": "metal",
        "suggestion": "🔩 Wow, ini sampah berbahan logam/metal! Ayo daur ulang!",
        "explanation": "Bahan metal sangat berharga dan bisa didaur ulang tanpa batas.",
        "resource": [
            "https://youtube.com/shorts/AhBsCNTTTPc?si=0_mmjmgpNsIj8ZIg",
            "https://m.youtube.com/watch?v=ajEECRjRQEE&pp=ygUSI2Vrc3BlcmltZW5wZW1hbmFz"
        ],
        "accuracy": 100,
        "createdAt": "2024-12-12T10:00:11.343Z"
    }
}
```
### Article
- URL
    
    `/articles`
    
- METHOD
    
    `GET`
     
- RESPONSE
```json
[
    {
        "id": 1,
        "image_url": "image.jpg",
        "title": "title",
        "description": "test.....",
        "content": "isi content"
    }     
    {
        "id": 2,
        "image_url": "image.jpg",
        "title": "title",
        "description": "test.....",
        "content": "isi content"
    }     
]
```

## CLOUD ARCHITECTURE
![image]()