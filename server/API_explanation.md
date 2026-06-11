# Users API

## Create Account ~ POST /api/users/register

Creates a new user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**

```json
{
    "user_id": 42,
    "email": "user@example.com"
}
```

**Status Codes:**

* `201` Account created successfully
* `409` Email already in use
* `500` Internal Server Error

<br>

## Login ~ POST /api/users/login

Login with an existing user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**

```json
{
    "user_id": 42,
    "email": "user@example.com"
}
```

**Status Codes:**

* `200` Login successful
* `400` Invalid credentials
* `500` Internal Server Error

<br>

## Logout ~ POST /api/users/logout

Logout for an already logged-in account.

**Status Codes:**

* `200` Logout successful
* `401` Unauthorized
* `500` Internal Server Error

<br><br>

# Events API

## Get Events ~ GET /api/events?steps=n

Returns a list of `n` events.

**Query Parameters:**

| Parameter | Type    | Description                 |
| --------- | ------- | --------------------------- |
| steps     | integer | Number of events to return  |

**Response:**

```json
[
    {
        "event_id": 1,
        "description": "The metro is delayed by 5 minutes.",
        "score": 0,
    },
    {
        "event_id": 2,
        "description": "Bus strike",
        "score": -4,
    }
]
```

**Status Codes:**

* `200` Events retrieved successfully
* `400` Invalid value for `steps`
* `401` Unauthorized
* `500` Internal Server Error

<br>

# Games API

## Get Game Results ~ GET /api/games

Returns the list of games played by the authenticated user.

**Request Body:** None

**Response:**

```json
[
    {
        "game_id": 1,
        "start_station": "Porta Nuova",
        "destination_station": "Vinzaglio",
        "score": 16,
        "won": true,
        "played_at" : "01/06/2026"
    },
    {
        "game_id": 2,
        "start_station": "Porta Nuova",
        "destination_station": "Porta Susa",
        "score": 0,
        "won": false,
        "played_at" : "01/06/2026"
    }
]
```

**Status Codes:**

* `200` Game results retrieved successfully
* `401` Unauthorized
* `500` Internal Server Error

<br>

## Add Game Result ~ POST /api/games/result

Stores the result of a completed game.

**Request Body:**

```json
{
    "start_station_id": 1,
    "destination_station_id": 4,
    "score": 15,
    "won": true,
    "played_at" : "01/06/2026"
}
```

**Response:**

```json
{
    "game_id": 7,
    "start_station": "Porta Nuova",
    "destination_station": "Porta Susa",
    "score": 15,
    "won": true,
    "played_at": "01/06/2026"
}
```

**Status Codes:**

* `201` Game result stored successfully
* `400` Invalid request data
* `401` Unauthorized
* `500` Internal Server Error

<br>

# Map API


## Get Complete Map ~ GET /api/map

Returns the complete transportation map as a graph.

**Request Body:** None

**Response:**

```json
{
    "stations": [
        {
            "station_id": 55,
            "name": "Nizza Sud",
            "is_interchange": false
        },
        ...
    ],
    "connections": [
        {
            "connection_id": 4,
            "line": {
                "line_id": 5,
                "name": "10",
            },
            "station_u": {
                "station_id": 54,
                "name": "Nizza",
                "is_interchange": true
            },
            "station_v": {
                "station_id": 55,
                "name": "Nizza Sud",
                "is_interchange": false
            },

        },
        ...
    ]
}
```

**Status Codes:**

* `200` Map retrieved successfully
* `500` Internal Server Error

<br>
