# Fancy ToDo API
Create fancy to do app, using express, jquery, ajax

### INTRODUCTION
The Fancy ToDo is a RESTful web service to make to do list.
If you find this service useful, please consider making a one-time donation or become a patron.

## API URL ```<root>```
The API should always be accessed over HTTP.

```http://localhost:<port>```

## Verbs
The API uses restful verbs.

Verb	| Description
------|------------
GET |	Select one or more items. Success returns 200 status code.
POST |	Create a new item. Success returns 201 status code.
PUT	| Update an item. Success returns 200 status code.
PATCH	| Update an item status. Success returns 200 status code.
DELETE |	Delete an item. Success returns 200 or 204 status code.

## Status Codes
The API will respond with one of the following HTTP status codes.

Code	| Description
------|------------
200	| Success
201	| Success - new resource created (POST)
204 |	Success - no content to return (DELETE)
400	| Bad Request - request couldn't be parsed
401 |	Unauthorized - OAuth must be provided
403 |	Forbidden - invalid API key or unapproved app
404	|	Not Found - method exists, but no record found
500	|	Server Error - please open a support issue

## Required Headers
You'll need to send some headers when making API calls to identify your application and set the content type to JSON.
Header |	Value
-------|--------
Content-type |	application/json
access_token |	You can find how to get your access_token below

## Create an App
To use the Fancy ToDo API, you'll need to create a new API app (access_token). But before that you must register / make new account.

## Create a new account
### POST `<root-URL>`/register
_Request Header_
```
Content-Type: application/json
```

_Request Body_
```
{
	"first_name": "Eko",
	"last_name": "pamung",
	"email": "sadads@asgd.com",
	"password": "12345"
}
```

_Response(201)_
```
{
  "id": 7,
  "email": "sadads@asgd.com",
  "password": "$2b$04$cw9OnI5PPewp.Vl.KlDddOdTL0J2VQzQa/sbIOxQW9K8ksCF4Pm0q"
}
```

## Get a new API app / access_token
### POST `<root-URL>`/login
_Request Header_
```
Content-Type: application/json
```

_Request Body_
```
{
	"email": "sadads@asgd.com",
	"password": "12345"
}
```

_Response(201)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
}
```

## Create a new todo item
### POST `<root-URL>`/todos
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
{
	"title": "Some short title",
	"description": "Long sentence about your to do",
	"status": "active",
	"due_date": "2020-10-29"
}
```

## Get all todo items
### GET `<root-URL>`/todos
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
none
```

_Response(200)_
```
[
  {
    "id": 19,
    "title": "Some short title",
    "description": "Long sentence about your to do",
    "status": "active",
    "due_date": "2020-10-29",
    "UserId": 1,
    "updatedAt": "2020-05-02T15:24:19.893Z",
    "createdAt": "2020-05-01T15:24:19.893Z",
    "deletedAt": null
  },
  {
    "id": 20,
    "title": "Some short title",
    "description": "Long sentence about your to do",
    "status": "active",
    "due_date": "2020-10-27",
    "UserId": 1,
    "updatedAt": "2020-05-04T15:24:19.893Z",
    "createdAt": "2020-05-02T15:24:19.893Z",
    "deletedAt": null
  },
  {
    "id": 21,
    "title": "Some short title",
    "description": "Long sentence about your to do",
    "status": "active",
    "due_date": "2020-10-28",
    "UserId": 1,
    "updatedAt": "2020-05-04T15:24:19.893Z",
    "createdAt": "2020-05-03T15:24:19.893Z",
    "deletedAt": null
  }
]
```

## Get one todo item
### GET `<root-URL>`/todos/`<id>`
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
none
```

_Response(200)_
```
{
  "id": 19,
  "title": "Some short title",
  "description": "Long sentence about your to do",
  "status": "active",
  "due_date": "2020-10-29",
  "UserId": 1,
  "updatedAt": "2020-05-02T15:24:19.893Z",
  "createdAt": "2020-05-01T15:24:19.893Z",
  "deletedAt": null
}
```

## Edit todo item
### PUT `<root-URL>`/todos/`<id>`
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
{
	"title": "Some edited short title",
	"description": "Edited Long sentence about your to do",
	"status": "completed",
	"due_date": "2020-10-29"
}
```

_Response(200)_
```
{
  "id": 19,
  "title": "Some edited short title",
  "description": "Edited long sentence about your to do",
  "status": "completed",
	"due_date": "2020-10-29",
  "UserId": 1,
  "updatedAt": "2020-06-01T15:24:19.893Z",
  "createdAt": "2020-05-01T15:24:19.893Z",
  "deletedAt": null
}
```


## Update todo item status
### PATCH `<root-URL>`/todos/`<id>`
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
{
	"status": "active",
}
```

_Response(200)_
```
{
  "id": 19,
  "title": "Some edited short title",
  "description": "Edited long sentence about your to do",
  "status": "active",
	"due_date": "2020-10-29",
  "UserId": 1,
  "updatedAt": "2020-06-01T15:24:19.893Z",
  "createdAt": "2020-05-01T15:24:19.893Z",
  "deletedAt": null
}
```

## Delete todo item
### DELETE `<root-URL>`/todos/`<id>`
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Body_
```
none
```

_Response(204)_
```
{
  {
    "id": 19,
    "title": "Some edited short title",
    "description": "Edited long sentence about your to do",
    "status": "completed",
    "due_date": "2020-10-29",
    "UserId": 1,
    "updatedAt": "2020-06-01T15:24:19.893Z",
    "createdAt": "2020-05-01T15:24:19.893Z",
    "deletedAt": "2020-07-01T15:24:19.893Z"
  },
  "message": "Todo with ID `<id>` successfully deleted"
}

```

# Seach Movie Feature
## Search trending movies
### GET `<root-URL>`/movies
_Request Header_
```
Content-Type: "application/json"
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbGVrbzJAZWtvLmNvbSIsImlhdCI6MTU4ODIxOTE0Nn0.CYuDUjM-TeZm-ZdR_2QDDHLVVRIyrE1ow8Z5xL9BknQ"
```

_Request Parameter_
```
{
  "query": "movie title keyword"
}
```

_Response(200)_
```
[
  {
    "watchers": 4,
    "movie": {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "year": 2001,
      "ids": {
        "trakt": 88,
        "slug": "the-lord-of-the-rings-the-fellowship-of-the-ring-2001",
        "imdb": "tt0120737",
        "tmdb": 120
      },
      "tagline": "One ring to rule them all",
      "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
      "released": "2001-12-19",
      "runtime": 178,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=V75dMMIW2B4",
      "homepage": "http://www.lordoftherings.net/",
      "status": "released",
      "rating": 8.74752,
      "votes": 39761,
      "comment_count": 55,
      "updated_at": "2020-05-01T08:08:07.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cn",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "eo",
        "es",
        "fa",
        "fi",
        "fr",
        "he",
        "hr",
        "hu",
        "id",
        "is",
        "it",
        "ja",
        "ko",
        "lt",
        "nb",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "th",
        "tr",
        "uk",
        "uz",
        "zh"
      ],
      "genres": [
        "action",
        "adventure",
        "fantasy"
      ],
      "certification": "PG-13"
    }
  },
  {
    "watchers": 3,
    "movie": {
      "title": "The Lord of the Rings: The Two Towers",
      "year": 2002,
      "ids": {
        "trakt": 89,
        "slug": "the-lord-of-the-rings-the-two-towers-2002",
        "imdb": "tt0167261",
        "tmdb": 121
      },
      "tagline": "A New Power Is Rising.",
      "overview": "Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
      "released": "2002-12-18",
      "runtime": 179,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=cvCktPUwkW0",
      "homepage": "http://www.lordoftherings.net/",
      "status": "released",
      "rating": 8.74794,
      "votes": 33940,
      "comment_count": 30,
      "updated_at": "2020-05-02T08:06:59.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fa",
        "fi",
        "fr",
        "he",
        "hr",
        "hu",
        "id",
        "is",
        "it",
        "ja",
        "ko",
        "la",
        "lt",
        "nb",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "th",
        "tr",
        "uk",
        "zh"
      ],
      "genres": [
        "action",
        "adventure",
        "fantasy"
      ],
      "certification": "PG-13"
    }
  },
  {
    "watchers": 1,
    "movie": {
      "title": "The Lord of the Rings: The Return of the King",
      "year": 2003,
      "ids": {
        "trakt": 90,
        "slug": "the-lord-of-the-rings-the-return-of-the-king-2003",
        "imdb": "tt0167260",
        "tmdb": 122
      },
      "tagline": "The eye of the enemy is moving.",
      "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
      "released": "2003-12-17",
      "runtime": 201,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=r5X-hFf6Bwo",
      "homepage": "http://www.lordoftherings.net",
      "status": "released",
      "rating": 8.87435,
      "votes": 34890,
      "comment_count": 39,
      "updated_at": "2020-05-01T08:06:45.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fa",
        "fi",
        "fr",
        "he",
        "hr",
        "hu",
        "id",
        "is",
        "it",
        "ja",
        "ko",
        "lt",
        "nb",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "th",
        "tr",
        "uk",
        "uz",
        "zh"
      ],
      "genres": [
        "action",
        "adventure",
        "fantasy"
      ],
      "certification": "PG-13"
    }
  },
  {
    "watchers": 1,
    "movie": {
      "title": "The Hobbit: The Desolation of Smaug",
      "year": 2013,
      "ids": {
        "trakt": 40808,
        "slug": "the-hobbit-the-desolation-of-smaug-2013",
        "imdb": "tt1170358",
        "tmdb": 57158
      },
      "tagline": "Beyond darkness... beyond desolation... lies the greatest danger of all.",
      "overview": "The Dwarves, Bilbo and Gandalf have successfully escaped the Misty Mountains, and Bilbo has gained the One Ring. They all continue their journey to get their gold back from the Dragon, Smaug.",
      "released": "2013-12-13",
      "runtime": 161,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=lfflhfn1W-o",
      "homepage": "http://www.thehobbit.com/",
      "status": "released",
      "rating": 7.92367,
      "votes": 24892,
      "comment_count": 58,
      "updated_at": "2020-04-29T08:06:15.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fi",
        "fr",
        "he",
        "hr",
        "hu",
        "it",
        "ja",
        "ko",
        "lt",
        "lv",
        "nb",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "th",
        "tr",
        "uk",
        "zh"
      ],
      "genres": [
        "fantasy",
        "adventure",
        "action"
      ],
      "certification": "PG-13"
    }
  },
  {
    "watchers": 1,
    "movie": {
      "title": "Ghostbusters",
      "year": 1984,
      "ids": {
        "trakt": 496,
        "slug": "ghostbusters-1984",
        "imdb": "tt0087332",
        "tmdb": 620
      },
      "tagline": "They ain't afraid of no ghost.",
      "overview": "After losing their academic posts at a prestigious university, a team of parapsychologists goes into business as proton-pack-toting \"ghostbusters\" who exterminate ghouls, hobgoblins and supernatural pests of all stripes. An ad campaign pays off when a knockout cellist hires the squad to purge her swanky digs of demons that appear to be living in her refrigerator.",
      "released": "1984-06-08",
      "runtime": 107,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=9u4FHmId-Y0",
      "homepage": "http://www.ghostbusters.com/",
      "status": "released",
      "rating": 8.03115,
      "votes": 15922,
      "comment_count": 38,
      "updated_at": "2020-04-26T08:09:47.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fi",
        "fr",
        "he",
        "hu",
        "it",
        "ja",
        "ko",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "tr",
        "uk",
        "zh"
      ],
      "genres": [
        "comedy",
        "fantasy"
      ],
      "certification": "PG"
    }
  },
  {
    "watchers": 1,
    "movie": {
      "title": "Green Lantern",
      "year": 2011,
      "ids": {
        "trakt": 30549,
        "slug": "green-lantern-2011",
        "imdb": "tt1133985",
        "tmdb": 44912
      },
      "tagline": "In our darkest hour, there will be light.",
      "overview": "For centuries, a small but powerful force of warriors called the Green Lantern Corps has sworn to keep intergalactic order. Each Green Lantern wears a ring that grants him superpowers. But when a new enemy called Parallax threatens to destroy the balance of power in the Universe, their fate and the fate of Earth lie in the hands of the first human ever recruited.",
      "released": "2011-06-17",
      "runtime": 114,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=W7w07MLhhb4",
      "homepage": "http://greenlanternmovie.warnerbros.com/",
      "status": "released",
      "rating": 5.71288,
      "votes": 11361,
      "comment_count": 27,
      "updated_at": "2020-04-25T08:04:24.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fi",
        "fr",
        "he",
        "hu",
        "id",
        "it",
        "ja",
        "ka",
        "ko",
        "lt",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sr",
        "sv",
        "th",
        "tr",
        "uk",
        "vi",
        "zh"
      ],
      "genres": [
        "action",
        "adventure",
        "science-fiction",
        "thriller",
        "superhero"
      ],
      "certification": "PG-13"
    }
  },
  {
    "watchers": 1,
    "movie": {
      "title": "The Wrestler",
      "year": 2008,
      "ids": {
        "trakt": 7078,
        "slug": "the-wrestler-2008",
        "imdb": "tt1125849",
        "tmdb": 12163
      },
      "tagline": "Love. Pain. Glory.",
      "overview": "Aging wrestler Randy \"The Ram\" Robinson is long past his prime but still ready and rarin' to go on the pro-wrestling circuit. After a particularly brutal beating, however, Randy hangs up his tights, pursues a serious relationship with a long-in-the-tooth stripper, and tries to reconnect with his estranged daughter. But he can't resist the lure of the ring and readies himself for a comeback.",
      "released": "2008-10-12",
      "runtime": 109,
      "country": "us",
      "trailer": "http://youtube.com/watch?v=p_TDzemiYu4",
      "homepage": "http://www.thewrestlermovie.com/",
      "status": "released",
      "rating": 7.68643,
      "votes": 3980,
      "comment_count": 8,
      "updated_at": "2020-04-14T08:17:19.000Z",
      "language": "en",
      "available_translations": [
        "bg",
        "ca",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "fi",
        "fr",
        "he",
        "hu",
        "it",
        "ja",
        "ko",
        "lv",
        "nl",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sv",
        "tr",
        "uk",
        "zh"
      ],
      "genres": [
        "drama",
        "romance"
      ],
      "certification": "R"
    }
  }
]

```