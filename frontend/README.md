Die Webanwendung ist in React JS geschrieben.

Wie starte ich die Web-Anwendung? 

Es muss eine neue MYSQL-Datenbank "Webmo" mit dem beigefügten SQL-File "Webmo-Fitness-Web-App.sql" angelegt werden: mysql> create database Webmo; mysql>use Webmo; mysql> source ;

Außerdem muss bei mysql der User "admin" angelegt werden: mysql> create user 'admin'@'localhost' identified by 'admin'; grant all on Webmo.* to 'admin'@'localhost';

Anschließend wird das Backend gestartet (cd backend > node index.js) und danach das Frontend (cd frontend > npm start)

Nun sollte sich in einem Browserfenster die Web-Anwendung öffnen. 

Um sich einzuloggen ist bereits der Username "admin" mit dem Passwort "admin" hinterlegt. Aus Testzwecken haben wir die Seite "Sign-in" erstellt, über welche man sich neu registrieren kann. Falls dies nicht für jeden User möglich sein soll, kann diese gelöscht werden. 