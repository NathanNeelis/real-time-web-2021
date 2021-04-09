# Individual chat app
### Description
This is a chat app where you can send people in the same room a message.
I recreated this from our team chat app, and it is basicly the same. But looking over the code we wrote together, I had some trouble to figure out the way it worked again. So I decided to recreate what we did there as a group to fully understand the progress. In our team chat app however, we saved all the chat history in a json file, I decided to skip this step for this chat app. 


### send messages
Because I use websockets the message are send realtime and are updated realtime. This means when I send a message, the other connected users will see this message real time. In the image below I opened the app in two browsers to show this progress.

![Schermafbeelding 2021-04-09 om 13 57 34](https://user-images.githubusercontent.com/55492381/114176575-9e20c500-993b-11eb-894d-463ad770ac0a.png)


### Connected users
You can see how many users are connected. This is done by saving the amount of connected users in a variable server side. When a user connects, the vallue is incremented and when someone leaves, the amount is decremented. This value gets passed to the client through a socket so its updated real time.

![Schermafbeelding 2021-04-09 om 13 58 50](https://user-images.githubusercontent.com/55492381/114176627-b7c20c80-993b-11eb-9a5f-cdfbbfea4543.png)

### User is typing
When a user starts typing a message is displayed for everyone that stays put for about 4 seconds to let the rest know he is currently typing.

![Schermafbeelding 2021-04-09 om 13 59 50](https://user-images.githubusercontent.com/55492381/114176730-db855280-993b-11eb-80c2-7505d5e39192.png)

### Templating
In our team challange we just used one HTML file without using the get requests in express. I wanted to see how this worked when I was going to use the get requests and add a templating engine to it. So I created a ejs templated html file to see whether the sockets would still work. And they did!

```javascript
app.set('view engine', 'ejs') // templating engine = ejs
    .set('views', 'views') // find the views in views(route)
    .get("/", home)


function home(req, res) {
    res.render("home.ejs");
}

// WEB SOCKETS
io.on("connection", (socket) => {
    ..
}

```


### resources
[Live example Justus](https://github.com/cmda-minor-web/real-time-web-2021/blob/main/course/college%201%20-%20live%20code%20voorbeeld.md)  

### License 
[MIT](https://github.com/NathanNeelis/real-time-web-2021/blob/iChatApp/LICENSE)   