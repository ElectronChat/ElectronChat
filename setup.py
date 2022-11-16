import os

u = input("are you a local developer y/n: (select 'y' if you want to build and run locally, 'n' if you want to deploy) ")
if u == "y":
    ip = "localhost"
    port = "3000"
    File = open("./back-end-main/.env", "w")
    File.write("host=localhost\nport=3000")
    File.close()
    File = open("./front-end-main/.env", "w")
    File.write("host=localhost\nport=3000")
    File.close()
    os.environ["host"] = "localhost"
    os.environ["port"] = "3000"
else:
    ip = input("what is your remote ip?: ")
    port = input( "what is your port your server will listen to?" )
    File = open("./back-end-main/.env", "w")
    File.write("host=" + ip + "\nport=" + port) 
    File.close()
    File = open("./front-end-main/.env", "w")
    File.write("host=" + ip + "\nport=" + port)
    File.close()
    os.environ["host"] = ip
    os.environ["port"] = port
os.chdir("./back-end-main")
os.system("npm install")
os.chdir("../front-end-main")
os.system("npm install")
os.system("npm install -g @angular/cli")
os.system("npm i --save-dev @types/crypto-js")
os.system("ng build")
os.chdir("../back-end-main")
print("Enter in your browser " + ip + ":" + port + " to access built website.")
os.system("node index.js")

