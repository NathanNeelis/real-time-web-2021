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
    git clone https://github.com/NathanNeelis/progressive-web-apps-2021.git
    ```   

3. install packages  
    ```bash
    npm install
    ```  

## Packages
[dontenv]()  
[ejs]()  
[express]()  
[socket.io]()  


## Data lifecycle
Not yet done... but something like this. 

<details>
  <summary>DLC Versie 1</summary

![data-lifecycle](https://user-images.githubusercontent.com/55492381/114989155-7085cf80-9e97-11eb-914f-3cb6f717a63b.jpg)  

</details>
  
Version 2  
![data-lifecycle(v2)](https://user-images.githubusercontent.com/55492381/115287237-50cd0080-a150-11eb-9f9f-198e9bf12288.jpg)

## Features
### Rooms
Enter a room to use this application with just your friends. 

### Choose realtime position
You can click on the grid map to change your position realtime. This way the other players know of your movements.

### Chat 
Share your notes in the chat

### Dice
Use the dice function to throw the dice and calculate the result


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
    // if everything is ok
    else if (selectedDice && amount) {

        const username = localStorage.getItem("username");
        const endpoint = "http://roll.diceapi.com/json/"

        // fetch dice api
        const url = endpoint + amount + selectedDie

        // result in const
        getData(url)
            .then(data => {
                const dice = {
                    dice: selectedDie,
                    amount: amount,
                    result: data.dice,
                    username: username
                };

                socket.emit("dice", dice);
            })

        amount.value = "";
    }

```

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
* [x] Render hello world server side   
* [x] Decide on concept
* [ ] Work out data lifecycle
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
* [ ] Login with database (mongo or firebase?)
* [ ] set background image
* [ ] Admin per room?  
* [ ] Update DLC diagram 
  
Friday 23-04  
* [ ] Finish readme
* [ ] Read rubric
* [ ] Prepare exam  
  


## License
[MIT](https://github.com/NathanNeelis/real-time-web-2021/blob/main/LICENSE)    

## Resources
[course materials](https://github.com/cmda-minor-web/real-time-web-2021)  