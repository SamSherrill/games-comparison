# Outline of What We Are Currently Working On

## To Do During Next Pairing Session:

- Figure out how to get the buttons on AboutUs to link to the corresponding websites using the Button component we created, instead of Bootstrap buttons.

- *Warnings in VSCode terminal*

**NEW BUG: Glowostent changed their username & maybe profile image. They no longer appear in the header, and might be causing errors in later searches because of the problems caused. For example: The "shared by" & "owned by" label in the header is getting switched. This all might be because we don't have a process for updating user info if it changes after that unique user was originally imported into the db. This may not be the case, because wouldn't the old username & pic load?**

- THIS PROBLEM IS: The persona names don't match in the specific problem case mentioned. This is because the user changed their persona name, but not their vanityUrl. We are trying to figure out how to use UPSERT, or something like it.

- Documentation
    - Partially DONE: Improve ReadMe
        - Needs more thorough instructions (update once site instructions are written)
        - Updated screenshots
        - Anything else we'd like to update in the readme?
    - Give user instructions on the site
    - About the creators page. Include links to our Portfolios & GitHub profiles.

- 1) Update NavBar to support additional pages (which will actually be new containers at the same URL)
    - a) DONE?: Install, import & setup react-router-dom
- 2) DONE Create new containers for the 2 new pages

- Navbar:
    - When in smaller width screens, a button appears. This button looks different from our other buttons.
    - Page names are a darker grey than we want, and different from the main title's white color letters
    - Don't love how the hover works with the text that was recently clicked, or the button.

- User instructions (likely in a separate page / container) regarding:
    - DONE What is a vanity URL & how to find it; mention that if they or their friends don't have a vanity URL, they can learn how to create one in the instructions below)
    - DONE How to create a vanity URL (if needed)
    **Currently working on this. Next session get a screenshot of setting public profile & games list**
    - How to set profile & games list public
    - Explain the site's warnings about private profiles & games lists; direct users to the appropriate help section
    - We decided that instead of a video, we will do screenshots. Screenshots will be easier to change when updates happen to the site.

- About Us
    - DONE Created DevProfile component
    - We will need to pass our profile pictures down as props
- Consider a small i or ? in a box that links to or even generates a small box that opens up in screen when the user hovers over the ? box or the entire warning

## To Do Soon

- Fix when broken or non-existant images come back from steam for the game's banner image. Example: comparing pita82 & sammysticks - sonic all star racing image is broken
- Don't show DLC or Betas - Example: comparing pita82 & sammysticks - sonic all star racing image is broken 

- Our button's stay highlighted. Might be related to the btn class name.

- Discuss usersArray. It is an array pulled from the state usersToSearch, which is an object. The fact that it is an array is legacy code from project 2 in bootcamp when we first created this app. It being an array may be fine. Changing it to an object would likely involve a huge overall of the controllers & a small overall of the compareGames function in MainPage.

- Consider: Pull out functions from compareGames and make them their own independent functions
    - Currently all FE API calls happen in MainPage.jsx. We should probably move the API requests to a separate file or files, then import them to MainPage.
    - 5/3/21 - Follow up note on this: Throughout the logic above render() we set state. To the best of our knowledge, this would involve a huge re-write & migth be impossible to pull out those functions & API calls into another file.

- GOOD FOR NOW - TD element removed from thead: On GamesTable.jsx we likely have unnecessary nesting of elements. For exampes for the table header we have a th inside a tr inside thead. We will likely be able to simplify the CSS as well if we make changes to the HTML nesting structure. -- We decided to keep the td element that separates each game listing in rows. td nested inside tr was necessary to keep the current styling.

- in other-controller, in the app.post /sharedGames we use sharedGamesArray to build the array, but we then simply send back sharedGames in the res.json. Maybe simplify the naming conventions there.

- Could CSS from GamesTable.scss be taken into base.scss file?

- Warnings & minor errors in dev console
    - DONE 1 error states: index.js:1 Warning: validateDOMNesting(...): <p> cannot appear as a descendant of <p>.

- keyCode is deprecated

- Immediately after pressing the "Add User" button, it'd be really cool if the typing cursor defaulted to the first blank line, even if multiple blank user lines are added
    - Partially DONE - the typing cursor now does autoFocus (in TextInput.jsx) to the most recently added line

- Mouse cursor to follow the Add User button each time it's clicked

- Beautify the table
- Beautify the site in general

- Full evaluation of the names & uses of state & vars within our app. Do those names accurately reflect what we're using them for? Can we delete or refactor blocks of code after these evaluations? We almost certainly can make this code more readable, and very likely can shorten it. searchedUsers state & array (on MainPage.jsx) is a prime example of something we have & maybe still can refactor.

- Deal with async issues with removing privateUsers from foundUsers

- Maybe do some async refactoring for performance gains

- MAYBE DONE: Almost certainly an async issue: Sometimes a user's vanityUrl is not displayed on the header of the games table alongside the other users' vanityUrls. We believe this is a timing out of userString being built somewhere along the line. FOLLOW UP: Let's see if this issue persists now that we have this information all contained in an a tag -- **UPDATE 6-15-21: I think I saw this error again on the live site. The new header was already pushed, so there shouldn't be sync issues, because of the way we handle that in state & pass it in props.** 

- Consider if we can refactor how we phrase "foundUser" in MainPage.jsx and similar phrasing throughout the app to have more consistent terms, and be more readable / identifiable

- Got this error right as we were wrapping up last session. I was manually testing invalid Vanity URLs & private users. We had just made changes regarding how we display warnings about those:
TypeError: Cannot read property 'steamId' of null
[0]     at C:\Users\Samue\gt\sams-apps\games-comparison\controllers\user-games-api.js:50:41
[0]     at runMicrotasks (<anonymous>)
[0]     at processTicksAndRejections (internal/process/task_queues.js:97:5)
[0]     at async C:\Users\Samue\gt\sams-apps\games-comparison\controllers\user-games-api.js:44:7

- Heroku specific problem: On the free plan we're hitting the max of 3600 questions when we run comparisons for users with extremely large game libraries (800+). Specific breaking point currently is amusingmouse & sammysticks compared. That doesn't work. However, amusingmouse & dabigcheezey comparison will complete successfully. dabigcheezey owns only 30 games, but sammysticks owns 188. amusingmouse owns 846.

- Are we importing Bootstrap CSS the most ideal way? Current we pull in the CDN on index.html in the public folder

- Deal with all deprecations

## Accessibility

- span className="sr-only" (current) span was somethign that came with bootstrap related to the active class name for the currently selected button in our drop down navbar. We aren't using the active class at this point. We will consider using it. It will take coding the navbar to detect what page we're on. Since we're in react, this is a one page application, and we stay on the same URL the whole time.

## Refactor Plans: 

- Why do our components show up as "Anonymous" in the Components tab of the Dev Console? Is this a problem, or is this ideal (because we don't want our code public to the world)?
- Brian also suggested some specific SQL queries that could be used to eager load information.
- Speaking of eager load, would it be realistic to over-eager load a user's games list? We could first make sure that their profile & games list are public. We could display a warning if their profile is not public. Then we could pull the game's list & hold it in the background somehow, until the user hits Compare Games

- Consider how we can refactor states. Can we combine some of these? Should we reorder them to be more sequential? Are there any other improvements we can make?
- Strongly consider how our code can be best arranged to be readable. Are there blocks of code that execute before the block above? If so, we should probably move them into sequence in the code, to be more readable.
- Analyze all of our async/awaits, setTimeout, and other steps we've taken to deal with the async issues we had in the original version of this project

- Consider renaming and/or reorganizing the controllers.

- Remember to use if we need to change things in the models / BD: Sequelize ".sync({ alter: true })" from [https://sequelize.org/master/manual/model-basics.html#:~:text=Models%20are%20the%20essence%20of,(and%20their%20data%20types)]

- Do we ever update a user's games list? We think so.
- Do we ever update a user's profile? We don't think so. Finding the right way to upsert might be the best. We've never done that.
- Do we use playtime? Not currently. We would likely need to either create a new many to many relationship for this to work, or completely change how our original tables are setup.

- Do we run createJoinRow (to make many to many relationships between games & users) every time a search is run? Is there a way to avoid this for a performance gain? See Line 85 on MainPage.jsx & about line 50 or so on user-games-api.js controller.

- Should appId be the primary key for our games table?
- Should steamId be the primary key for our steamusers table?
- Maybe add in a column for how many games each user owns - integer in steamuser table

- WE'RE GOING TO NEED TO COME BACK TO THIS after doing a tutorial or 2. --- Writing tests to automatically confirm that we haven't broken the program each time we change some code.
1) Figured out how to run tests. Done for FE. We'll have to figure it out for th backend when we get there.
2) Setup some initial FE tests.
Previous note on the need for tests: Should we write some tests to make sure functionality continues to work, without us having to manually test? I got thinking about this a lot from what we discussed during the Software Crafters meetings Thursday evening.

- As usual, review comments to make sure they're correct & useful. Delete commented out code that we no longer need to retain.

### Refactoring Advice from Brian Freeman:

For performance. Some thoughts:

Remember database calls are expensive – like reading files from disk (as compared to in memory operations)

There is findOrCreate that can turn CreateJoinRow into a single step database call instead of find then create if not there. Can user attributes to limit data retrieved (If you only need the steamUserID for a given user use attribute to just get that ID). Think in “sets” for database instead of steps.  For instance you do

For each user – get their games
For each game – check if it’s contained in other user(s) games
Return set of shared games
This can be refactor to “return games shared by all (or at least 2) users” – Possibility is below:

Instead of GetUsers – gets all User data and includes (eager loads) all their games. Can get the aggregate of games that the users jointly own (either all own or at 2 own). In SQL I would use the following query(ies)

Select Game.name, Game.gameBanner, count(*) numUsers

from Game inner join SteamUserGames

on Game.appId=SteamUserGames.gameID

where steamUserID in (ID1, ID2…)

group by Game.name, Game.gameBanner 

having numUsers>1

My system isn’t setup to run the code local to try and refactor and test (I don’t have a steam apiKey), but it might be possible for us to do 1 or more pairing sessions and do some refactoring via zoom.

I hope this helps. Let me if you have questions or might want to try and pair up sometime.

### Things We Like From https://www.lorenzostanco.com/lab/steam/friends
We found this website mid-August when someone we showed our app to brought it to our attention. He does a lot of things that we like. Some we'd already considered, and some things he had implemented before we thought of them. Here are some things we saw that we might want to implement:

- We really like how he shows games that multiple users, but not all, own.

### Things We'd Do Differently From https://www.lorenzostanco.com/lab/steam/friends

- 

## Programming tasks after core functionality is achieved:

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
- Following the bullet above: Consider linking to the user's desktop Steam app & opening up the game in their game library. We would have to determine how to do that first.

### More things we can do with Steam's API:

- Get the friends list for any user that has that set to public: https://developer.valvesoftware.com/wiki/Steam_Web_API#GetFriendList_.28v0001.29 --- We could use this to pull their friends, and allow them to select which ones they want to compare games with.

## Styling to Do:

- Use baseSCSS file for: DONE color variables, margin/padding variables, etc.
- Username input boxes to separate into 2 columns. Maybe we start with 2 boxes, 1 in each column. This would have to be developed with responsiveness in mind.
- Consider moving the buttons to the top. Each time "Add User" is clicked, that button moves down. So if you try to double click the button, the button has moved away from your cursor before you hit it the second time. We can also consider moving the cursor with the button.
- Deal with the left shift that happens with the margins when the Shared Games table loads. --- We realized that this is actually happening because the scroll bar comes in. It would be interesting if we could figure out how to compensate for that.
- favicon
- Consider our margins between elements. We're mostly using 2% top margin, but use 1.5rem at one point because 2% wasn't doing what we wanted.

### Table Styling:

- Figure how to get the text to wrap responsively, and still be centered with the image.
- Consider if we need the image to scale more than it does.
- Fix the lines between table rows -- We're mostly okay with the table lines between the rows, but the top line on the <th> bugs us a little.
- Consider rounding the corners of the table slightly
- When we enable users to look at the individual games list of each entered Steam user, we would want to make the styling a universal variable so it can be used by multiple table components. That, or we combine both table components into 1 component.

## Notes for future refactoring:

- Live site warning: "Mixed Content: The page at 'https://comparegameslibrary.herokuapp.com/' was loaded over HTTPS, but requested an insecure image 'http://media.steampowered.com/steamcommunity/public/images/apps/4700/fcd1abd6380998e473b92690e28a9fe0a1a27b8d.jpg'. This content should also be served over HTTPS."
- Do we need both usersToSearch & searchedUsers as separate states? Or could we refactor this by deleting one of those, and only using the other.
- Is it best practice to setup usersToSearch as an object, then change it to an array to pass it to the backend? Should it be an array throughout, or an object throughout?
- If any of the user states are blank strings, the search will run as a Shared Games search. -- Maybe we solve this by deleting that index position in the array when the string is deleted by the user.
- Check for a user being double entered. That doesn't break the search, but it'd be nice to not have that user double entered in our system
- Add err handling. Need to tell user why certain things didn't work.
- Resolve all warnings in the browser console.
- See if we can resolve the depracation warning in the BE console. This one: (node:31268) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
- Currently we're using createJoinRow() in our controller to create the many to many relationship between users & games, but also to just give us an error if we try to duplicate an existing relationship. This is intentional, because it prevents us from having to first check if the relationship already exists. This makes a 2 step process (checking, then creating if it doesn't exist) into a 1 step process (just letting Sequelize do both). However, this may not be best practice. Consider & research if it needs to changes.
- In other-contoller, towards the end, we have this: app.post("/sharedGames", function (req, res) { getUsers(res, req.body.usersArray, (usersArray).... etc. This bigger block of code has a lot of loops inside loops. How can we refactor this?

- Let's also revisit server.js

Minor tasks we can repeat periodically during development:
- Clean up any unused code, packages, etc.
- Clean up the FE & BE console logs.
- Improve code comments


**Think about how users could use & misuse this app.** We probably have a lot more refactoring that we can do besides what is noted above.

## Models:

### Changes that need to happen to models:

headerImage could be changed to just gameBanner or gameIcon
delete windows, mac, linux because we have no use for that
capture playtime from the Steam API


## Controllers:

Notes to self 7/20/2020:

I pulled the routes from the old handlebars version of the app. Some of this for sure needs to change, because we're not server side rendering in this updated, react version of the app. So I have commented out the res.render lines of code, an replaced most of them with res.json.

A big observation we had was that these controllers are intertwined. We may want to separate the exported functions to their own files to "separate concerns". Then it'll be more readable, I'd hope.

## Notes About Frontend API Calls:

I setup a utils folder with an api js file (named frontend-api.js). However, we're not using that yet. I'll leave it there as a reminder for now. I will proceed with the writing the axios functions inside the react containers / components first, and may export those later. I'll have to research what is best practice for these kind of things.

## UI / UX Thought Process:

We decided not to display a warning to the user that they need to search with at least one input field completed. That seems instinctive that nothing would happen if they didn't enter any username. We spent time working on other code.