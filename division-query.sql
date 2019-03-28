-- for the division query:
-- artist id 117(lana del ray) has four songs with song ids:101,104,111,112
-- user with userid 111 likes all of her songs. 
--user id 113 likes all songs of artist id 118(B.B King)who has song ids: 102,103,115,116

-- i think you mentioned that you changed certain user ids. could you see your user ids match with these examples ?


insert into Likes values(111,101);

insert into Likes values(111,104);

insert into Likes values(111,111);

insert into Likes values(111,112);

insert into Likes values(113,102);

insert into Likes values(113,103);

insert into Likes values(113,115);

insert into Likes values(113,116);