# Games Library Comparison App

## Development Description

This app is a work in progress. It's purpose will be to allow gamers, like myself, to compare their games lists with their friends. The MVP will be for Steam only, but I'll work to expand that to other platforms at some point post-MVP.

## Development Plan / Tasks To Do:

### Core programming tasks:

1) DONE Get the compare user button to dispaly a table of games for one user
- 1a) DONE Games list componenet 
- 1b) DONE Getting the data in correctly from backend (this is where we're stuck EOS 7/
- 1c) DONE Games component to display when (and only when) game data is loaded after the API call is made

2) Add user button needs to give us an option to compare additional users
- 2a) DONE The FE API requests we're doing need to be able to make requests for multiple users
- 2b) DONE Get all old API features brought into this newer version of the app
- 2c) DONE Add user button needs to add a new field to the DOM (cut off 10 unique users at once)
- 2d) DONE Need to make a state for the shared games, and pass that down in props to the SharedGamesTable.jsx
- 2e) DONE Bring it full cirlce & compare the users accurately

3) DONE Display table of games that all users share

4) DONE Pressing Enter should fire the search, same as if "Compare Games" is clicked with the mouse. Warning rendered on page if one of the users can't be found.

### Items that need to be addressed ASAP:

- Remove users not found from SharedGamesTable header
- FIXED Live site time delay / timing out -- The problem was that we had changed the models, but hadn't had the live site's DB reset. We pushed a force:true, ran some searches, then pushed the code with the force:true out.
- Should we write some tests to make sure functionality continues to work, without us having to manually test? I got thinking about this a lot from what we discussed during the Software Crafters meetings Thursday evening.
- Discuss Sequelize ".sync({ alter: true })" from [https://sequelize.org/master/manual/model-basics.html#:~:text=Models%20are%20the%20essence%20of,(and%20their%20data%20types)]

### Programming tasks after core functionality is achieved:

- Playtime is hard coded to the game for the first related user, not related to each user who owns the game
- Add the game's picture / icon next to it's name in the table(s) -- Model
- PARTIALLY CHANGED Consider showing a list of users compared. Showing their Steam username, profile pics, and/or Vanity URLs in a list of compared users might be best. 
- Checkout out what is returned by our calls to Steam's API, and see if we get more back that we want to use
- Checkout what else we can get from the Steam API, and see if we want to expand the site's function

- Don't list games such as "SMITE - Public Test" and "Dota 2 Test"
- Consider finding a way to have software not show up in the tables
- How to use page - explain the need for public Steam games list, how to find / create Vanity URL, etc.
- About Us page, or something similar, where we can intro ourselves & explain why we made this.
- Allow user to search using something other than their Vanity URL. Some don't have a Vanity URL. At the minimum we should explain how to find or create their Vanity URL.
- Let's make sure it's obvious to the user that they found the Steam users they were looking for. Showing their Steam username, profile pics, and/or Vanity URLs in a list of compared users might be best.
- For multiple users, show games that all users except 1 have. For example, if 4 users are entered, and 3 have Bannerlord, we can show that 3 of 4 own that game, in case the 4th wants to buy it to play with the rest.
- May move showing individual games lists to a later task. When we do that, we may want to initially hide those lists on mobile because that's not the main info someone comes to the site to look at.
- (More detials on the the previous bullet, copied & pasted from a different section.) Repeat multiple tables of games, one for each user. Make sure the tables of games of each user displays correctly & aesthically well; Check for responsiveness. We may want to have the tables cut off at 20 games, with an option to display more. Also may want to display the games in order of play time. However, I think that players may have their "hours played" stats set to private, even if the games list is visible.
- DONE Give users the option to go to the Steam store page for each game.
- Following the bullet above: Consider linking to the user's desktop Steam app & opening up the game in their game library. We would have to determine how to do that first.

#### More things we can do with Steam's API:

- Get the friends list for any user that has that set to public: https://developer.valvesoftware.com/wiki/Steam_Web_API#GetFriendList_.28v0001.29 --- We could use this to pull their friends, and allow them to select which ones they want to compare games with.


### Styling to do:

- DONE Display loading wheel similar to what David added to the handlebars version of the app.
- Use baseSCSS file for: DONE color variables, margin/padding variables, etc.
- Username input boxes to separate into 2 columns. Maybe we start with 2 boxes, 1 in each column. This would have to be developed with responsiveness in mind.
- Add option to remove a username input line, down to only 1 user
- Consider moving the buttons to the top. Each time "Add User" is clicked, that button moves down. So if you try to double click the button, the button has moved away from your cursor before you hit it the second time. We can also consider moving the cursor with the button.
- Deal with the left shift that happens with the margins when the Shared Games table loads. --- We realized that this is actually happening because the scroll bar comes in. It would be interesting if we could figure out how to compensate for that.
- favicon

#### Table Styling:

- Figure how to get the text to wrap responsively, and still be centered with the image.
- Consider if we need the image to scale more than it does.
- Fix the lines between table rows -- We're mostly okay with the table lines between the rows, but the top line on the <th> bugs us a little.
- Consider rounding the corners of the table slightly
- When we enable users to look at the individual games list of each entered Steam user, we would want to make the styling a universal variable so it can be used by multiple table components. That, or we combine both table components into 1 component.

### Notes for future refactoring:

- Live site warning: "Mixed Content: The page at 'https://comparegameslibrary.herokuapp.com/' was loaded over HTTPS, but requested an insecure image 'http://media.steampowered.com/steamcommunity/public/images/apps/4700/fcd1abd6380998e473b92690e28a9fe0a1a27b8d.jpg'. This content should also be served over HTTPS."
- If any of the user states are blank strings, the search will run as a Shared Games search. -- Maybe we solve this by deleting that index position in the array when the string is deleted by the user.
- FIXED: Add user button re-runs the search without anything else being clicked
- Add err handling. Need to tell user why certain things didn't work.
- Resolve all warnings in the browser console.
- See if we can resolve the depracation warning in the BE console. This one: (node:31268) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
- Currently all FE API calls happen in MainPage.jsx. We should probably move the API requests to a separate file or files, then import them to MainPage.
- Clean up any unused code, packages, etc.
- Clean up the FE & BE console logs.
- Improve code comments
- Consider combing SharedGamesTable & UserGamesTable into 1 component.
- Currently we're using createJoinRow() in our controller to create the many to many relationship between users & games, but also to just give us an error if we try to duplicate an existing relationship. This is intentional, because it prevents us from having to first check if the relationship already exists. This makes a 2 step process (checking, then creating if it doesn't exist) into a 1 step process (just letting Sequelize do both). However, this may not be best practice. Consider & research if it needs to changes.
- In other-contoller, towards the end, we have this: app.post("/sharedGames", function (req, res) { getUsers(res, req.body.usersArray, (usersArray).... etc. This bigger block of code has a lot of loops inside loops. How can we refactor this?
- DONE: Discuss NPM audit fix with David
- FIXED: Also discuss the lodash security warning I'm getting on GitHub
- Let's also revisit server.js

**Think about how users could use & misuse this app.** We probably have a lot more refactoring that we can do besides what is noted above.

### Models:

#### Changes that need to happen to models:

headerImage could be changed to just gameBanner or gameIcon
delete windows, mac, linux because we have no use for that
capture playtime from the Steam API


### Notes About Controllers:

Notes to self 7/20/2020:

I pulled the routes from the old handlebars version of the app. Some of this for sure needs to change, because we're not server side rendering in this updated, react version of the app. So I have commented out the res.render lines of code, an replaced most of them with res.json.

A big observation we had was that these controllers are intertwined. We may want to separate the exported functions to their own files to "separate concerns". Then it'll be more readable, I'd hope.

### Notes About Frontend API Calls:

I setup a utils folder with an api js file (named frontend-api.js). However, we're not using that yet. I'll leave it there as a reminder for now. I will proceed with the writing the axios functions inside the react containers / components first, and may export those later. I'll have to research what is best practice for these kind of things.

## Lessons learned:

It looks like I don't need Axios installed in both the client & the root folders. It may only need to be in the root folder. That's how we had it for Job Init.

We had to uninstall Axios from the front end to get the first FE Axios.post we wrote to go the backend for the information we were sending.