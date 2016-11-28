# pubSub
### live sync with mysql

Allow clients to subscribe to changes in a mysql database.
Built using [node](nodejs.org), [express](expressjs.com) ,
[socket.io](socket.io) and [mysql-live-select](https://github.com/numtel/mysql-live-select).

Also included is a simple frontend page built using [angular](angularjs.org) and [skeleton](getskeleton.com).

Running it -

>   Clone from github

>   `npm install`

>   Enable mysql bin log as given [here](https://github.com/numtel/mysql-live-select#installation)

>   Use `pubsub.sql` to intitalize mysql db

>   `npm start`

>   Go to [localhost:3000](localhost:3000) (or the port in your ENV)

Any changes in the table are reflected real time on the frontend.