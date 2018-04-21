Chatty
=====================

Chatty is a minimalistic chat application.

This was a solo project that served as practice with ReactJS and WebSockets.

### Features

1. Multiple non-authenticated users can connect to the chat room and chat in real time.
2. Users can post as "anonymous" users (default) or change their username as they please.
3. When a user changes their username, the system notifies all connected users.
4. Upon connecting, users are assigned a color in which their username is displayed.
5. When a user posts the URL of an image, the image is displayed instead of the URL.
6. The number of connected users is displayed.

### Final Product

!["screenshot of Chatty with one user connected"](https://github.com/l33loo/chattyApp/blob/master/docs/1_one_user_connected.png?raw=true)
!["screenshot of Chatty with two users connected"](https://github.com/l33loo/chattyApp/blob/master/docs/2_second_user_joins.png?raw=true)
!["screenshot of Chatty with three users connected"](https://github.com/l33loo/chattyApp/blob/master/docs/3_three_users.png?raw=true)
!["screenshot of Chatty after a user has posted the URL of an image"](https://github.com/l33loo/chattyApp/blob/master/docs/4_user_posts_pic_url.png?raw=true)

### Getting Started

1. Clone this repository.
2. Install dependencies using the "npm install" command, in both the root directory and the "chatty_server" directory.
3. Start the main web server using the "npm start" command from the root directory. The app will be served at http://localhost:3000/.
4. Start the WebSocket server by using the "node server.js" command from the "chatty_server" directory.
5. Go to http://localhost:3000/ in your browser, on a many windows/tabs as you wish; each one of them will be connected as a different user!

### Dependencies

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom
* express
* ws
* uuid
