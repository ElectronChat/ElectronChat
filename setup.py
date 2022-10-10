import os
os.chdir("./back-end-main")
os.system("npm install")
os.chdir("../front-end-main")
os.system("npm install")
os.system("ng build")
