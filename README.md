# ElectronChat
<div align="center">
      <img src="electron.png" alt="electron logo" style=width:400px /> <br>
      <a href="https://github.com/ElectronChat/ElectronChat/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/ElectronChat/ElectronChat"></a>
      <a href="https://github.com/ElectronChat/ElectronChat/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/ElectronChat/ElectronChat"></a>
      <a href="https://github.com/ElectronChat/ElectronChat/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/ElectronChat/ElectronChat"></a>
      <a href="https://trello.com/invite/b/ifcvhd1L/207cda6ab0bab5dd25740255f0c22318/electronchat"><img alt ="Trello" src= "https://img.shields.io/badge/Issues-trello-blue"></a>
      
</div>
<div align="left">   

# Dependencies 
<a href="https://nodejs.org/en/"><img alt ="node" src= "https://img.shields.io/badge/Dependency-Node.js-brightgreen"></a>
<a href="https://angular.io/"><img alt ="angular" src= "https://img.shields.io/badge/Dependency-Angular-red"></a>
<br>
Here is a usefull link to install node.js : https://kinsta.com/blog/how-to-install-node-js/
<br>
Here is a usefull link to install angular if running npm install does not install it: https://angular.io/cli 

<br> *** note you most likely will not have to install angular as calling npm install in the project folder should install it for you ***
## Summary
Electronchat is a repository providing the skeleton of a privacy oriented chat website. 
Some of our key features include 
* [x] End to End Encryption
* [x] Creating unique rooms where the room name ts the key to the encryption (even the name encrypts itself before leaving the client!)
* [x] The ability to send messages with given random usernames. 
* [x] Easily expandable codebase

# Getting Started
Usefull commands: 
```sh
python3 setup.py                    # Call this command in the root directory to install all node dependancies and angular dependancies. (need node installed)
                                    # this will also build the frontend and start the backend. 
node back-end-main/index.js         # use this command in the root to start up the server without installing everything or building angular. 
npm install                         # use this in the back and front end directories and it will install dependancies. 

ng build                            # use this in the frontend directory to build the angular application that will be served through the backend.
ng serve                            # use this in the frontend to open up a developer server to see your changed realtime as you change code in the front 
```

This is the source code for an end to end encrypted chatroom webapp. Using this readme, you should be able to
setup your work space to run the server for this webapp and, in your browser, use it.

Before anything, make sure you have all the dependencies installed. Currently the only thing you need installed is node.js; prefferably LTS version 16.17.X.

# setup
## The easy way
If you have Python3 installed then you can run a provided script to install, build, and deploy the service. 
If you do not then you can install it here: https://www.python.org/downloads/
```
python3 setup.py # run this in the root directory of the project
```
This script should ask you if you are developing locally. If you are then it will set the localhost and port and display it for you. So it runs locally.
If you are not then you can say no and it will set the IP you provide and the port you provide. This is for deployment.
## The hard way
Another way to install, build, and deploy is to not use the script. 
You will need to go into the front end and call these commands in order:
```
npm install                         # use this in the back and front end directories and it will install dependancies. 

ng build                            # use this in the frontend directory to build the angular application that will be served through the backend.
```

This installs dependencies and it builds the frontend. You will also have to create a .env file in the format like this:"
```
host=localhost
port=desired-port
```
Now go into the backend and create the same .env file and run:
```
npm install                         # use this in the back and front end directories and it will install dependancies. 

node index.js                       # start the server
```

And thats it! have fun and mess arround.
</div>
