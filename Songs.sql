
drop table User_1
cascade;

drop table Playlist
cascade;

drop table Follows
cascade;

drop table Album
cascade;

drop table Song
cascade;

drop table Artist
cascade;

drop table User_2
cascade;

drop table Likes
cascade;

drop table InPlaylist
cascade;

drop table Genre
cascade;

commit;


create table Genre
(
	Genre_Name text primary key
);


create table User_2
(
	user_id serial PRIMARY KEY,
	username text NOT NULL UNIQUE,
	profile_picture_URL text
);


create table User_1
(
	user_id int primary key,
	name text,
	password text,
	foreign key(user_id) references User_2(user_id) on delete cascade
);


create table Artist
(
	user_id int PRIMARY KEY,
	bio text,
	num_followers int,
	FOREIGN KEY(user_id) REFERENCES User_2(user_id) ON DELETE CASCADE
);


create table Playlist
(
	user_id int,
	playlist_name text,
	no_of_songs int,
	isPrivate boolean default true,
	genre text,
	PRIMARY KEY(playlist_name, user_id),
	FOREIGN KEY(user_id) REFERENCES User_2(user_id) ,
	FOREIGN KEY(genre) REFERENCES Genre(genre_name)
);


create table Follows
(
	user_id_1 int,
	user_id_2 int,
	PRIMARY KEY(user_id_1, user_id_2),
	FOREIGN KEY(user_id_1) REFERENCES User_2(user_id) ON DELETE CASCADE,
	FOREIGN KEY(user_id_2) REFERENCES User_2(user_id) ON DELETE CASCADE
);


create table Album
(
	artist_user_id int,
	album_name text,
	cover_url text,
	no_of_songs int,
	release_date date,
	PRIMARY KEY(artist_user_id, album_name),
	FOREIGN KEY(artist_user_id) REFERENCES Artist(user_id)
);


create table Song
(
	song_id serial primary key,
	song_name text not null,
	album_name text not null,
	genre_name text,
	artist_id int not null,
	duration_seconds int not null,
	no_of_plays int default 0,
	lyrics text,
	FOREIGN KEY(album_name, artist_id) REFERENCES Album(album_name, artist_user_id) on delete cascade,
	FOREIGN KEY(genre_name) REFERENCES Genre(Genre_Name) ON DELETE SET NULL
);


create table Likes
(
	user_id int,
	song_id int,
	primary key (user_id, song_id),
	foreign key (user_id) references user_2(user_id) on delete cascade,
	foreign key (song_id) references song(song_id) on delete cascade
);

create table InPlaylist
(
	user_id int,
	song_id int,
	playlist_name text,
	primary key (user_id, song_id, playlist_name),
	foreign key (user_id) references user_2(user_id) on delete cascade,
	foreign key (song_id) references song(song_id) on delete cascade,
	foreign key (user_id, playlist_name) references playlist(user_id, playlist_name) on delete cascade
);

commit;


Insert into Genre
values('Blues');

Insert into Genre
values('Country');

Insert into Genre
values('Hip Hop');

Insert into Genre
values('Jazz');

Insert into Genre
values('Rock');

commit;


insert into User_2
values(111, 'howdy123', 'https://newevolutiondesigns.com/images/freebies/carwallpaper-1.jpg');

insert into User_2
values(112, 'vendetta', NULL);

insert into User_2
values(113, 'riverburger', NULL);

insert into User_2
values(117, 'BrotherHood', NULL);

insert into User_2
values(118, 'DreamsofCarla', NULL);

insert into User_2
values(114, 'nexusbeat123', 'https://newevolutiondesigns.com/images/freebies/carwallpaper-2.jpg');

insert into User_2
values(115, 'pacificrim', NULL);

insert into User_2
values(116, 'FullmetalPanic', NULL);

insert into User_2
values(119, 'Inayusha', NULL);

insert into User_2
values(120, 'Nightcore', 'https://wallpapercave.com/w/wp2277315');

commit;


insert into User_1
values(111, 'Oliver', 'qwerty');

insert into User_1
values(112, 'Noah', 'abcdefgh');

insert into User_1
values(113, 'Jack', '123456');

insert into User_1
values(114, 'Harry', 'abcdef');

insert into User_1
values(115, 'George', 'abcdefgh');

insert into User_1
values(116, 'Becky G', 'pafhje');

insert into User_1
values(117, 'Lana Del Ray', 'lana@123');

insert into User_1
values(118, 'B.B King', 'bbforlife');

insert into User_1
values(119, 'Chris Stapleton', 'CS@halos');

insert into User_1
values(120, 'Herbie Hancock', 'hencock');

commit;


insert into Artist
values(116, 'Becky G incorporates rap and pop', 1765596);

insert into Artist
values(117, 'Lana Del Rey (Elizabeth Woolridge Grant) makes pop music .', 17658696);

insert into Artist
values(118, NULL, 14857658);

insert into Artist
values(119, NULL, 12345678);

insert into Artist
values(120, NULL, 56345678);

commit;


insert into Playlist
values(111, 'Bluezify', 30, true, 'Blues');

insert into Playlist
values(112, 'HipHopEVO', 30, false, 'Hip Hop');

insert into Playlist
values(112, 'JazzEVOL', 50, true, 'Jazz');

insert into Playlist
values(113, 'CountryCoach', 50, true, 'Country');

insert into Playlist
values(114, 'HipHop', 50, false, 'Hip Hop');

commit;

insert into Follows
values(111, 116);

insert into Follows
values(111, 118);

insert into Follows
values(111, 120);

insert into Follows
values(113, 117);

insert into Follows
values(114, 112);

insert into Follows
values(114, 118);

insert into Follows
values(115, 118);

insert into Follows
values(115, 113);

insert into Follows
values(116, 117);

commit;


insert into Album
values(116, 'Play It Again', NULL, 5, '7-13-2013');

insert into Album
values(117, 'Born to Die', NULL, 15, '8-26-2008');

insert into Album
values(118, 'One Kind Favour', NULL, 14, '5-5-2015');

insert into Album
values(119, 'Traveller', NULL, 4, '10-26-1973');

insert into Album
values(120, 'Head Hunters', NULL, 16, '5-31-2011');

commit;


insert into Song
values(100, 'Cant Get Enough', 'Play It Again', 'Hip Hop', 116, 286, 742617374, NULL);

insert into Song
values(101, 'Born to Die', 'Born to Die', 'Hip Hop', 117, 286, 742617374, NULL);

insert into Song
values(102, 'Tomorrow Night', 'One Kind Favour', 'Blues', 118, 286, 742617374, NULL);

insert into Song
values(103, 'My Love is Down', 'One Kind Favour', 'Blues', 118, 286, 742617374, NULL);

insert into Song
values(104, 'Dark Paradise', 'Born to Die', 'Hip Hop', 117, 386, 42617374, NULL);

insert into Song
values(105, 'Fire Away', 'Traveller', 'Country', 119, 380, 43756498, NULL);

insert into Song
values(106, 'Tenessee Whiskey', 'Traveller', 'Country', 119, 420, 76937548, NULL);

insert into Song
values(107, 'Traveller', 'Traveller', 'Country', 119, 340, 4756463, NULL);

insert into Song
values(108, 'Sly', 'Head Hunters', 'Jazz', 120, 780, 3857642, NULL);

insert into Song
values(109, 'Watermelon Man', 'Head Hunters', 'Jazz', 120, 690, 1725647, NULL);

insert into Song
values(110, 'Chameleon', 'Head Hunters', 'Jazz', 120, 760, 2234721, NULL);

insert into Song
values(111, 'Off to the Races', 'Born to Die', 'Hip Hop', 117, 340, 8574711, NULL);

insert into Song
values(112, 'Blue Jeans', 'Born to Die', 'Hip Hop', 117, 341, 4837242, NULL);

insert into Song
values(113, 'Play It Again', 'Play It Again', 'Hip Hop', 116, 239, 8273484, NULL);

insert into Song
values(114, 'Built For This', 'Play It Again', 'Hip Hop', 116, 283, 3743724, NULL);

insert into Song
values(115, 'The World Is Gone Wrong', 'One Kind Favour', 'Blues', 118, 573, 2837468, NULL);

insert into Song
values(116, 'Waiting For Your Call', 'One Kind Favour', 'Blues', 118, 573, 2374234, NULL);
-- add more songs of more artists


insert into Likes
values(111, 116);

insert into Likes
values(111, 107);

insert into Likes
values(111, 108);

insert into Likes
values(112, 106);

insert into Likes
values(112, 107);

insert into Likes
values(112, 108);

insert into Likes
values(112, 109);

insert into Likes
values(112, 100);

insert into Likes
values(113, 108);

insert into Likes
values(113, 109);

insert into Likes
values(113, 116);

insert into Likes
values(113, 115);

insert into Likes
values(113, 114);

insert into Likes
values(113, 113);

insert into Likes
values(114, 100);

insert into Likes
values(115, 109);

commit;

insert into InPlaylist
values(111, 102, 'Bluezify');

insert into InPlaylist
values(111, 103, 'Bluezify');

insert into InPlaylist
values(111, 105, 'Bluezify');

insert into InPlaylist
values(111, 106, 'Bluezify');

insert into InPlaylist
values(112, 100, 'HipHopEVO');

insert into InPlaylist
values(112, 101, 'HipHopEVO');

insert into InPlaylist
values(112, 104, 'HipHopEVO');

insert into InPlaylist
values(112, 112, 'HipHopEVO');

insert into InPlaylist
values(113, 105, 'CountryCoach');

insert into InPlaylist
values(113, 106, 'CountryCoach');

insert into InPlaylist
values(113, 107, 'CountryCoach');

insert into InPlaylist
values(114, 100, 'HipHop');

insert into InPlaylist
values(114, 101, 'HipHop');

insert into InPlaylist
values(114, 104, 'HipHop');

insert into InPlaylist
values(114, 111, 'HipHop');

insert into InPlaylist
values(114, 112, 'HipHop');

commit;




