Speech Repo

Requirements
1. nodejs - latest LTS
2. npm
3. vue cli

To install vue cli
1. `npm install -g @vue/cli`

To Serve locally:
1. `npm install`
2. `npm run serve`


To Build a Distributable:
1. `npm run build`

Files will be located in 'dist' folder and can be served from a webserver

Features Implemented
1. View all speeches
2. View My Speeches, Search by any author name
3. Add Speech, Edit, Delete
4. Field Validations
5. Implemented using HTML/CSS/JS
6. Used Vue.js framework
7. Local storage and IndexedDB (Via PouchDb) for data storage on the client
8. Component Architecture and Webpack Bundling
9. Save button will be enabled when all fields have value


Features not Implemented due to lack of time
1. Full text search and tags
2. Searching in All Speaches tab
3. Define My user
4. Proper responsive components (Semi-responsive using media queries)

Given the wireframe of the My Speeches page,  
1. How would you decomose this page into components?  
    a. The following are the list of components and their purpose.  
        1. Editor ("Speech content shown here") - This should be a different component as it has lots of functionalities and styles which should be encapsulated into a component. The parent component only needs to interact with the editor component by passing attributes and receiving events.
        2.  Buttons (Speech 1, 2 and delete,save,share) - This should be components as well as you would be reusing these components throughout the application. Having a single component for common elements will help in maintaining that component. From bug fixes to style changes later on, it will be much easier to modify it once rather than multiple times.
2. How would you design this page to be responsive in nature?
    b. Application should be split into two different views(The list of speeches and the speech editor). On desktop both views would be displayed side by side. On mobile the views can be nested. The editor can be displayed once the user selects a speech.
