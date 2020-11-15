API available at: https://parkmanager-corp.herokuapp.com/

# Park Manager

Api to manage a Parking

Methods:

## Login / Register / Manage Info

Register

/register POST {
body :

- email: str
- name: str
- password: str
- admin: bool

} => JSON

Login

/login POST
{

- name: str
- password: str

} => JSON

Update Info

POST /user?action=X

X = 'modify', 'read', 'delete'

modify {
body: - email: str - new_password: str - name: str
}

read : No Body

Delete: No body

## User Management

SearchForAPark:
/parks?floor=X

X = number of the floor

return avaialble floors and place_numbers

WhereIsMyCar:
/where GET
return floor and place_number

ReservePark:
/reserve POST
body: {
floor: str
place_number: str
}

Park:
/takePark POST
body: {
floor: str
place_number: str
}

QuitPark:
/quitPark POST

body: null

## Admin Management

You have to be Admin to use this section

CreatePark:
/createPark POST
body { - place_number: str - floor: str - available: str
}

ParkStats:
/parkStats?find=X GET
X = 'count', 'free', 'taken'

RemoveCarFromPark:
