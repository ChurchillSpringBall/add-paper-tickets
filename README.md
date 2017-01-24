# Add Paper Ticket Sales 

Welcome to the dirtiest script ever written to put in the paper ticket sales.

The csv from [google sheet](https://docs.google.com/spreadsheets/d/1BXcfImSn3onh01glLGBD9wAYD2alp4elrRO3pUP5WyM/edit#gid=277698623) was converted to json and is in the directory.
You can test it with the test variable by putting in your own data.

The general thinking here is that if somebody has logged in, then they will have a userid and a profile.
In this case it just adds the ticket and order with their userid.
If the person has *not* logged in it'll give them a userid and assign this to a profile, user, usercredential, order and ticket.
The userid is just a number starting at 20000 and increasing (lol) but this should likely be checked/changed.

I've tested it on my own account, deleting the database, populating and logging in to a fresh ticket and logging in then populating and then finding a ticket.
