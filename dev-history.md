# Notes on Our Past Development of This App

## Lessons learned:

It looks like I don't need Axios installed in both the client & the root folders. It may only need to be in the root folder. That's how we had it for Job Init.

We had to uninstall Axios from the front end to get the first FE Axios.post we wrote to go the backend for the information we were sending.

## Core programming tasks:

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

## Bugs Fixed

- DONE: Run NPM audit fix for vulnerabilities
- FIXED Live site time delay / timing out -- The problem was that we had changed the models, but hadn't had the live site's DB reset. We pushed a force:true, ran some searches, then pushed the code with the force:true out.
- FIXED: Since adding the delete button to the end of each input field, pressing enter no longer runs compare games. This may be fixed by changing that button to be a span. But I doubt that would fix it, because we already had multiple buttons when we changed enter to only activate compare games.
- DONE: Figure out how to delete the text from the input field when the delete button is pressed for that input field, and there are following input fields.
- FIXED: Fix formating for input rows now that delete button is implemented & working.
- FIXED: Loading wheel runs infinitely if all users entered are invalid. We don't have a test for compare games if it's run with all invalid users.
- FIXED: Remove users not found from SharedGamesTable header
- DONE Turn off loading wheel if all Vanity URLs are invalid
- FIXED Games table shows up with no games in the list, but the user name(s) listed at the top. This means if 1 user is private, and all others are public, then the list comes back empty.
- FIXED Repeated games happened for the first time I've ever seen: [./games-repeated.jpg] -- Possible solution: build some logic that determines if names or gameBanner's match. If they do, display only one of those games. This does NOT remove the duplicates (if they are indeed duplicates, and not slightly different versions or editions of the same game) in our database.
- FIXED: Also discuss the lodash security warning I'm getting on GitHub
- FIXED: Add user button re-runs the search without anything else being clicked

- FIXED How are we displaying to the user that a user's games list is private? We likely aren't doing this yet. Our warning is only if we didn't find the user. The loading wheel takes a long time to disappear if we search one user and his/her games list is private. Then the network tab said that sharedGames failed, in red text.
    - When hitting Steam's API, GetPlayerSummaries will return communityvisibilitystate. However, "there are only two possible values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile is "Public", and the data is visible." So if a profile is public, but the games list is private, we'll have to catch that a different way. That said, we could us this to initially note private profiles.
    - SOLUTION: We ultimately simply filtered out users who returned zero games in their list.

- MAYBE DONE - 8/18/2020 found possible bug: First time we searched MrMuscles3000 since changing models & doing force:true. For the first time in a really long time, we ended up getting this console.log("Could not load user information") from line 38 of other-controller.js. We aren't sure why. His games list may have still be used to compare games with the other 3 users.
    - Follow up on the previous comment. Same error happened in the same way when we searched ichinyan for the first time since clearing the DB.
    - More follow up: Sometimes user names don't appear in the table head even if they are still factored in to the logic that determines the shared games table. This is more likely to happen when the user is pulled into the DB the first time, but we've seen it happen at least 1 other time when a user was already in the database. That happened once with pita82, the 2nd day we used him as an example.
    - 9/15/2020 Even more follow up: We strongly assume that this has to do with the underlying syncronicty issues that caused us to write the setTimeout block of code in other-controller.js (about line 64 at this point). That res.json gets sent back to the front end before the table header is written to the DOM. We will need to figure out how to fix this.
    - March 2021 update: We moved the profile names in the table header to a new JSX file, ProfileDisplay. We also changed & simplified how we passed that info in props. These changes seem to have solved this.

## Features Added

- DONE Add option to remove a username input line, down to only 1 user
- DONE Display loading wheel similar to what David added to the handlebars version of the app.
- DONE Show the number of games shared (suggestion from pita82, Sam's brother-in-law) -- we also now show the count of games owned by an individual user, when only 1 user is entered
- DONE Give users the option to go to the Steam store page for each game.
- DONE Delete button now works fully as intended.

## Refactoring Done

### UI Refactoring

- DONE When rendering warnings to the website user about invalid Vanity URLs & private profiles, take into account whether there are 1 or multiple users that the warning is about
- DONE Make username in the gamesTable a URL to the user's profile, instead of just plain text
- DONE Image of profile picture displayed next to the user's name
- Is there any more we want to do with this username a tag?
    - GOOD FOR NOW: The table header formating on mobile needs improvement after we changed the usernames to a tags - This can maybe be helped with edits to the profile-display class.
    - DONE Display personaName & vanityUrl if those 2 are different for that user

### Code & Performance Refactoring

- DONE Combine SharedGamesTable & UserGamesTable into one component. 
1) DONE make a ternary statement in SharedGamesTable that handles whether there is 1 or more users
2) DONE Rename SharedGamesTable to GamesTable, delete UserGamesTable, then change all references to this in MainPage & SharedGamesTable
- DONE Refactor the compareGames function in MainPage.jsx. We may be able to remove the if/else surrounding it, especially once the SharedGamesTable & UserGamesTable are combined.

- DONE Look into using findOrCreate instead of create in CreateJoinRow in user-games-api. 
- DONE Implement findOrCreate anywhere else we can use. -- * Particular note here: big performance gains from what we changed in the user-games-api.js controller. We were able to drop 3 awaits while also combining 2 blocks of code into 1.

## Style Changes

- DONE Border around games table