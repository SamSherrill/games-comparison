# Games Library Comparison App

## Development Description

This app is a work in progress. It's purpose will be to allow gamers, like myself, to compare their games lists with their friends. The MVP will be for Steam only, but I'll work to expand that to other platforms at some point post-MVP.

## Initial Pseudo Code

- Need to create Heroku app

## Controllers

Notes to self 7/20/2020:

I pulled the routes from the old handlebars version of the app. Some of this for sure needs to change, because we're not server side rendering in this updated, react version of the app. So I have commented out the res.render lines of code, an replaced most of them with res.json.

A big observation we had was that these controllers are intertwined. We may want to separate the exported functions to their own files to "separate concerns". Then it'll be more readable, I'd hope.

## Frontend API calls

I setup a utils folder with an api js file (named frontend-api.js). However, we're not using that yet. I'll leave it there as a reminder for now. I will proceed with the writing the axios functions inside the react containers / components first, and may export those later. I'll have to research what is best practice for these kind of things.

## Tasks to do:

Add user button needs to give us an option to compare additional users