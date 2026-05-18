sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Writes and saves note
    activate Browser
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Note right of Server: Server creates a new note object and adds it to the notes array
    Server-->>Browser: HTTP status code 302 (URL redirect)
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: main.js
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: data.json
    deactivate Server

    Browser-->>User: Updated Page
    deactivate Browser