#ps -ef | grep "make start" | awk '{print $2}' | head -1 | xargs kill -9

# commande make start :
## Download node_module + package front
###  Download node_module + package back
#### Start nodemon backend in background
##### Start front 
start:
	npm install 
	cd backend && npm install && nodemon server &> /dev/null &
	npm start 

stop:
	pkill node
