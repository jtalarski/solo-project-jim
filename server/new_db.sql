CREATE TABLE "user" (
	"user_table_id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"auth_level" varchar(80) DEFAULT 'regular',
	CONSTRAINT "user_pk" PRIMARY KEY ("user_table_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "movie" (
	"movie_table_id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"poster_url" varchar(255),
	"imdb_id" TEXT ,
	CONSTRAINT "movie_pk" PRIMARY KEY ("movie_table_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "friend_movie" (
	"fm_table_id" serial NOT NULL,
	"friend_id" int NOT NULL,
	"movie_id" int NOT NULL,
	"status" varchar(255) NOT NULL,
	CONSTRAINT "friend_movie_pk" PRIMARY KEY ("friend_movie")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "friend_movie" ADD CONSTRAINT "friend_movie_fk0" FOREIGN KEY ("friend_id") REFERENCES "user"("user_table_id");
ALTER TABLE "friend_movie" ADD CONSTRAINT "friend_movie_fk1" FOREIGN KEY ("movie_id") REFERENCES "movie"("movie_table_id");

INSERT INTO "movie" ("title", "description", "type")
VALUES
('Knives Out', 'A detective investigates the death of a patriarch of an eccentric, combative family.', 'Movie'),
('Vivarium', 'A young couple looking for the perfect home find themselves trapped in a mysterious labyrinth-like neighborhood of identical houses.', 'Movie'),
('Rocketman', 'A musical fantasy about the fantastical human story of Elton Johns breakthrough years.', 'Movie’'),
('The Birdcage','A gay cabaret owner and his drag queen companion agree to put up a false straight front so that their son can introduce them to his fiancées right-wing moralistic parents.', 'Movie'),
('Midsommer','Christians sister commits suicide. Why? After his 4 friends graduate secondary school, they head off to a Swedish cabin for midsummer as previous years. Strange things happen. Is it his sisters spirit?', 'Movie'),
('The Boys', 'A group of vigilantes sets out to take down corrupt superheroes who abuse their superpowers.', 'Series'),
('The Americans', 'At the height of the Cold War two Russian agents pose as your average American couple, complete with family.', 'Series'),
('Fleabag', 'A comedy series adapted from the award-winning play about a young woman trying to cope with life in London whilst coming to terms with a recent tragedy.','Series'),
('The Expanse', 'A police detective in the asteroid belt, the first officer of an interplanetary ice freighter, and an earth-bound United Nations executive slowly discover a vast conspiracy that threatens the Earths rebellious colony on the asteroid belt.', 'Series'),
('Transparent', 'An L.A. family with serious boundary issues have their past and future unravel when a dramatic admission causes everyones secrets to spill out.', 'Series'),
('Fletch', 'Irwin M. Fletch Fletcher is a newspaper reporter being offered a large sum to off a cancerous millionaire, but is on the run, risking his job and finding clues when its clear the man is healthy.', 'Movie'),
('Fletch Lives', 'After receiving an inheritance in Louisiana, Los Angeles reporter Irvin Fletcher heads to the Belle Isle plantation where he gets himself into hilarious trouble.','Movie')
('Ozark', 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', 'Series');


INSERT INTO "friend_movie" ("friend_id", "movie_id", "status")
VALUES
('1','2','Watched'),
('1','3','In Queue'),
('1','4','Watched'),
('1','5','Watched'),
('1','6','In Queue'),
('1','7','Watching'),
('1','8','Watching'),
('1','9','In Queue'),
('1','10','Watched'),
('1','11','Watched');