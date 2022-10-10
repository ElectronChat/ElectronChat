import os
os.chdir("./back-end-main")
os.system("npm install")
os.chdir("../front-end-main")
os.system("npm install")
os.system("npm install -g @angular/cli")
os.system("ng build")
