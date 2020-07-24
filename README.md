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

### Core programming tasks:

1) DONE Get the compare user button to dispaly a table of games for one user
1a) DONE Games list componenet 
1b) DONE Getting the data in correctly from backend (this is where we're stuck EOS 7/
1c) DONE Games component to display when (and only when) game data is loaded after the API call is made

2) Add user button needs to give us an option to compare additional users
2a) The FE API requests we're doing need to be able to make requests for multiple users
2b) Get all old API features brought into this newer version of the app
2c) Add user button needs to add a new field to the DOM (cut off 10 unique users at once)
2d) * (Maybe do late) Make sure the tables of games of each user displays correctly & aesthically well; Check for responsiveness. We may want to have the tables cut off at 20 games, with an option to display more. Also may want to display the games in order of play time. However, I think that players may have their "hours played" stats set to private, even if the games list is visible.
2e) Bring it full cirlce & compare the users accurately, the move to (3) for displaying those shared games
2f) Probably move the API requests to a separate file or files, then import them to MainPage

3) Repeat multiple tables of games, one for eah user

4) Display table of games that all users share

#### Programming tasks after core functionality is achieved:

- For multiple users, show games that all users except 1 have. For example, if 4 users are entered, and 3 have Bannerlord, we can show that 3 of 4 own that game, in case the 4th wants to buy it to play with the rest.
- May move showing individual games lists to a later task. When we do that, we may want to initially hide those lists on mobile because that's not the main info someone comes to the site to look at.

### Styling to do:

- Use baseSCSS file for: color variables, margin/padding variables, etc.
- Username input boxes to separate into 2 columns. Maybe we start with 2 boxes, 1 in each column. This would have to be developed with responsiveness in minde.
- Fix the lines between table rows
- Consider rounding the corners of the table slightly

## Notes for future refactoring:

## Lessons learned:

It looks like I don't need Axios installed in both the client & the root folders. It may only need to be in the root folder. That's how we had it for Job Init.

We had to uninstall Axios from the front end to get the first FE Axios.post we wrote to go the backend for the information we were sending.