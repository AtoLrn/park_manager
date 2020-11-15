# Park Manager

Api to manage a Parking

Methods:

## Login / Register / Manage Info

Register POST {
body :

- email: str
- name: str
- password: str
- admin: bool

} => JSON

Login POST
{

- name: str
- password: str

} => JSON

## User Management

SearchForAPark:

WhereIsMyCar:

ReservePark:

Park:

QuitPark:

## Admin Management

CreatePark:

ParkStats:

RemoveCarFromPark:
