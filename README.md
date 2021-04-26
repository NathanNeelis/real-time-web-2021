# Real-Time Web @cmda-minor-web · 2020/21

### View the app
:earth_americas:  [live website](https://dnd-playground.herokuapp.com/)  

## Description
DnD Playground  
This app is made for Dungeon and Dragons groups that have use for an online tool.
Since Corona we are limited in playing DnD in groups, so often groups go online to continue their quests online.
In this app you can upload your own map and your friends can join you. Everyone gets their character on screen with a collored dot.
You can move around in the map by clicking on the grid. There is also a chat function that lets you share your notes and roll the dice using a dice API.

## Table of Contents  

## Assignment
This is a readme driven project. Which means that I first figure out what I want to make and document this in my readme. The application I am making is based on user interaction and works real time for multiple users. 

## Concepts
Before starting with this assignment I though of 3 concepts.  
I will start on concept three because when creating the sketches for these three concepts I got really excited about the last one.  
And projects always go alot smoother when you're having fun making them. 

### Concept One: Mapping the photo's
In the previous course I created a online photo album, and wanted to expand this into a real time application. Below you can see my sketches of what my Idea is for this concept. I wanted to fetch alot of photographs and display this in an overview, simalar to my previous project. Apart from only an overview of the photographs I wanted to add a map with a realtime view of all the photo's and locations those photo's where taken at. Also users can upload their own photo's and they will get added to the overview and map. The nut to crack, as Lucas called it, is if I'm able to get access to the location the photo's are taken.
  
![Concept1](https://user-images.githubusercontent.com/55492381/114394333-6021dc00-9b9b-11eb-9388-f6630ea226f2.jpg)  
  
### Concept Two: Liking and commenting on photo's
Same as the previous concept, this concept adds a realtime function to a previous project. In this concept you have to login using an Oauth authentication because of how the unsplash API works. When you have logged in you are able to view the photo's and go to their detailpage. On the detail page you can like the photo and leave a comment behind. If I have time over I could combine this with concept one.  
  
![Concept2](https://user-images.githubusercontent.com/55492381/114394346-62843600-9b9b-11eb-8c37-329ca027ea4f.jpg)  
  
### Concept Three: DnD playground
This is a totally other concept then the previous two. I got inspired by Stan O in my squad, he uses a dice API for some dice game. And I got thinking about how me and my friends play DnD online these days because of Corona. And it got me thinking if I would be able to create an app that allows you to show an map, add players to it and can move your own character real time around. Also I would like to add a chat function to share notes and roll the dice using this dice API. The nut to crack here is if I'm able to move a player around in a grid. Once I got that working, I just have to send it real time.  
  
![Concept3](https://user-images.githubusercontent.com/55492381/114394350-631ccc80-9b9b-11eb-9124-d0906f2408f6.jpg)  
  


## Getting started

### Cloning the repo
1. Create your git repo  
    ```bash
    mkdir foldername  
    cd "/foldername"  
    git init  
    ```  

2. Clone this repo  
    ```bash
    git clone https://github.com/NathanNeelis/real-time-web-2021.git
    ```   

3. install packages  
    ```bash
    npm install
    ```  

4. Start the app on localhost:8080 
    ```bash
    npm start
    ```  
5. Here is an example of the dotenv variables
    ```bash
    FB_TYPE= TYPE  
    FB_project_id= PROJECT ID  
    FB_private_key_id= PRIVATE KEY ID  
    FB_private_key= -----BEGIN PRIVATE KEY----------END PRIVATE KEY-----  
    FB_client_email= CLIENT EMAIL  
    FB_client_id= __CLIENT ID__  
    FB_auth_uri= AUTH URI  
    FB_token_uri= TOKEN URI  
    FB_auth_provider_x509_cert_url= SOME URL  
    FB_client_x509_cert_url= SOME URL  
    ``` 


## Packages
[dontenv](https://www.npmjs.com/package/dotenv)  
[ejs](https://www.npmjs.com/package/ejs)  
[express](https://www.npmjs.com/package/express)  
[firebase-admin](https://www.npmjs.com/package/firebase-admin)  
[socket.io](https://www.npmjs.com/package/socket.io)  
[node-fetch](https://www.npmjs.com/package/node-fetch)  


## Data lifecycle
Not yet done... but something like this. 

<details>
  <summary>DLC Versie 1</summary

![data-lifecycle](https://user-images.githubusercontent.com/55492381/114989155-7085cf80-9e97-11eb-914f-3cb6f717a63b.jpg)  

</details>
  

<details>
  <summary>DLC Versie 2</summary

![data-lifecycle(v2)](https://user-images.githubusercontent.com/55492381/115287237-50cd0080-a150-11eb-9f9f-198e9bf12288.jpg)

</details>

Version 3 


## Realtime events
### Create/join a room
Create a room with your own made up key. Others can join this room by entering this key as well.

### Moving on the map
By clicking in the grid, your location (shown with a collered dot) moves to the box you selected. Others in the room will see this change real time as well.

### Messages
You can share your messages and notes in the chatroom. The messages are shown realtime.

### Roll the dice
Select your dice and the amount of them, roll them and see the result real time in the chatbox. Others will see your result as well, so there is no cheating!


## Features
### Rooms
Enter a room to use this application with just your friends. 

### Choose realtime position
You can click on the grid map to change your position realtime. This way the other players know of your movements.

### Chat 
Share your notes in the chat

### Dice
Use the dice function to throw the dice and calculate the result

## Login
To use this application you have to login. You can login with your google credentials. For this login process I used the firebase authentication method that easily lets me use the Google authentication. Others as well, but I choose to only use google for this prototype.

## Database - Firestore
Before I used the firestore database, the data was lost on a disconnect. But with the firestore database you can continue where you left. If you enter a room, the firestore database will look through all my databases if there is one matching your room name. If there is, it will add the last player locations in the map. So if you refresh or close your windows by accident you can always reconnect with the same room and you can continue the game.  
  
If there isn't a matching database for this room, it will create one on the first player location move. Every move gets updated in the database. Then every move the sockets fetches this data from the database again and updates the dom via the client socket.  
  
The database looks like this:  
![Schermafbeelding 2021-04-26 om 21 15 29](https://user-images.githubusercontent.com/55492381/116138016-994a6800-a6d4-11eb-89e6-363728edb8f9.png)  


## API
### Which API did I use?
In the chatbox you are able to throw some dice.  
For this functionality I used the [Dice API](http://roll.diceapi.com/), It was just a litle bit easier then coding it myself. And I wanted to see if I could implement an API to learn from this progress.

### Fetching the API
Based on the dice and amount of dices it changes the fetch url.   
So for example, I would choose the d20 die and I want to throw 3 of them. The endpoint results in /3d20.  
  
> Endpoint: http://roll.diceapi.com/json/  
> Parameter 1: amount of dice  
> Parameter 2: sort dice  


```javascript

socket.on("dice", (dice) => {
            // FETCH DICE API ON SERVER INSTEAD OF CLIENT
            const endpoint = "http://roll.diceapi.com/json/"
            const username = dice.username

            // fetch dice api
            const url = endpoint + dice.amount + dice.dice


            getData(url, username)
                .then(data => {
                    // result in const dice
                    const dice = {
                        result: data.dice,
                        username: username
                    };

                    // Add message real time
                    io.to(roomID).emit("dice", dice);
                })
    }

```

### API HTTP Troubles
On the server I had some troubles with fetching this API live. Because the API runs on HTTP and my live application on HTTPS. This gave some issues, and I got the feedback to try fetching the API on server side. Thats what ive done now.

### API Response
The api response with a succes and the thrown dices like this:  
```json
{   
    "success":true,
    "dice":[
        {
            "value":12,
            "type":"d20"
        },
        {
            "value":16,
            "type":"d20"},
        {
            "value":6,
            "type":"d20"
        }
    ]
}

```

## Project status 
Must have  
* [x] Render hello world server side   
* [x] Decide on concept
* [x] Work out data lifecycle
* [x] **Nut to crack:** user in grid-layout choosing different position 
* [x] Create a grid layout 
* [x] Add users -- how to multiple?
* [x] Online rooms?
* [ ] Upload a map
* [x] Add real time choosing a position on map
* [x] Chat room
* [x] [Dice API](http://roll.diceapi.com/)
* [x] Dice function in chatroom
  
Nice to have  
* [ ]  Camera function?
* [ ]  SHow all users online
* [ ]  ..  
  
## planning
Today 19-04  
* [x] Chatfunction
* [x] Dice function
* [x] Update DLC diagram  
  
Tommorow 20-04  
* [x] Login with database (mongo or firebase?)
* [ ] set background image
* [ ] Admin per room?  
* [x] Update DLC diagram 
  
Friday 23-04  
* [ ] Finish readme
* [ ] Read rubric
* [ ] Prepare exam  
  


## License
[MIT](https://github.com/NathanNeelis/real-time-web-2021/blob/main/LICENSE)    

## Resources
[course materials](https://github.com/cmda-minor-web/real-time-web-2021)  
[firebase](https://www.youtube.com/watch?v=Dbq6yr9XKX8)  
[firebase auth users](https://firebase.google.com/docs/auth/web/manage-users)  
[firebase libraries](https://firebase.google.com/docs/web/setup?authuser=1#available-libraries)  
[dotenv firebase admin sdk](https://stackoverflow.com/questions/56277661/is-it-possible-to-store-a-json-file-to-an-env-variable-with-dotenv)  
[firestore node](https://www.youtube.com/watch?v=Z87OZtIYC_0)  
[firebase client](https://www.youtube.com/watch?v=UZqXcoqC95E&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=5) Net Ninja   
[firestore id to heroku](https://stackoverflow.com/questions/39492587/escaping-issue-with-firebase-privatekey-as-a-heroku-config-variable)  
