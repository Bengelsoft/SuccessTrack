# SuccessTracker Domain

Below is a schema of the SuccessTracker domain, which forms the foundation for all user content within the application. The structure outlined below is generated from the TypeScript class "SuccessTracker."

All domain objects can be found in source code in the directory `./src/app/domain/`.

## Import / Export
The import/export functionality of the application allows loading a JSON file with content that adheres to the SuccessTracker schema.


## SuccessTracker JSON Schema

```json
{
  "$ref": "#/definitions/SuccessTracker",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Chat": {
      "type": "object"
    },
    "Settings": {
      "type": "object"
    },
    "Success": {
      "type": "object"
    },
    "SuccessTracker": {
      "properties": {
        "chats": {
          "items": {
            "$ref": "#/definitions/Chat"
          },
          "type": "array"
        },
        "settings": {
          "$ref": "#/definitions/Settings"
        },
        "successes": {
          "items": {
            "$ref": "#/definitions/Success"
          },
          "type": "array"
        },
        "user": {
          "$ref": "#/definitions/User"
        },
        "version": {
          "type": "number"
        }
      },
      "required": [
        "chats",
        "settings",
        "successes",
        "user",
        "version"
      ],
      "type": "object"
    },
    "User": {
      "type": "object"
    }
  }
}
```
