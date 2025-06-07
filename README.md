## Unit Assignment: Music Playlist Explorer

Submitted by: **KATHERINE HALL**

Estimated time spent: **36** hours spent in total

Deployed Application (**required**): [Music Playlist Explorer Deployed Site](https://codepath-project1-rce8.onrender.com)

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**
  - [ ] Dynamically render playlists on the homepage using JavaScript.
    - [ ] Playlists should be shown in grid view.
    - [ ] Playlist images should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [ ] Fetch data from a provided Javascript file and use it to create interactive playlist tiles.

- [x] **Playlist Components**
  - [ ] Each tile should display the playlist's:
    - [ ] Cover image
    - [ ] Name
    - [ ] Author
    - [ ] Like count

- [x] **Playlist Details**
  - [ ] Create a modal pop-up view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [ ] The modal should show the playlist's:
    - [ ] Cover image
    - [ ] Name
    - [ ] Author
    - [ ] List of songs, including each song's:
      - [ ] Title
      - [ ] Artist
      - [ ] Duration
  - [ ] The modal itself should:
    - [ ] Not occupy the entire screen.
    - [ ] Have a shadow to show that it is a pop-up.
    - [ ] Appear floating on the screen.
    - [ ] The backdrop should appear darker or in a different shade.

- [ ] **Like Playlists**
  - [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [ ] When the heart icon is clicked:
    - [ ] If previously unliked:
      - [ ] The like count on the playlist tile should increase by 1.
      - [ ] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been liked by the user.
    - [ ] If previously liked:
      - [ ] The like count on the playlist tile should decrease by 1.
      - [ ] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been unliked by the user.
    - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please film yourself liking and unliking:
      - [ ] a playlist with a like count of 0
      - [ ] a playlist with a non-zero like count

- [x] **Shuffle Songs**
  - [ ] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist's detail modal.
  - [ ] When the shuffle button is clicked, the playlist's songs should display in a different order.
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself shuffling the same playlist more than once. 
  
- [x] **Featured Page**
  - [ ] Application includes a dedicated page that randomly selects and displays a playlist, showing the playlist’s:
    - [ ] Playlist Image
    - [ ] Playlist Name
    - [ ] List of songs, including each song's:
      - [ ] Title
      - [ ] Artist
      - [ ] Duration
  - [ ] When the page is refreshed or reloaded, a new random playlist is displayed
    - For example, navigating to the all playlists page and then back to the featured playlist page should result in a new random playlist being displayed
    - Note that because your algorithm will not be truly random, it is possible that the same playlist will feature twice in a row. 
    - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself refreshing the featured page more than once. 
  - [ ] Application includes a navigation bar or some other mechanism such that users can navigate to the page with all playlists from the featured page and vice versa without using the browser's back and forward buttons. 

#### STRETCH FEATURES

- [x] **Add New Playlists**
  - [ ] Allow users to create new playlists.
  - [ ] Using a form, users can input playlist:
    - [ ] Name
    - [ ] Author
    - [ ] Cover image
    - [ ] Add one or more songs to the playlist, specifying the song's:
      - [ ] Title
      - [ ] Artist
  - [ ] The resulting playlist should display in the grid view.
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself adding at least two songs to the playlist. 

- [ ] **Edit Existing Playlists**
  - [ ] Enable users to modify the details of existing playlists.
  - [ ] Add an edit button to each playlist tile.
  - [ ] Users can update the playlist:
    - [ ] Name
    - [ ] Author
    - [ ] Songs
  - [ ] The playlist grid view and playlist detail modal should update to display any changes (see Required Features, Criterion 1 & 2).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself:
    - [ ] Editing all of a playlist's features (name, creator, AND songs)
    - [ ] Editing some of a playlist's features (name, creator, OR songs) 

- [x] **Delete Playlists**
  - [ ] Add a delete button to each playlist tile within the grid view.
  - [ ] When clicked, the playlist is removed from the playlist grid view.

- [x] **Search Functionality**
  - [ ] Implement a search bar that allows users to filter playlists by:
    - [ ] Name 
    - [ ] Author
  - [ ] The search bar should include:
    - [ ] Text input field
    - [ ] Submit/Search Button
    - [ ] Clear Button
  - [ ] Playlists matching the search query in the text input are displayed in a grid view when the user:
    - [ ] Presses the Enter Key
    - [ ] Clicks the Submit/Search Button 
  - [ ] User can click the clear button. When clicked:
    - [ ] All text in the text input field is deleted
    - [ ] All playlists in the `data.json` file are displayed in a grid view
    - [ ] **Optional:** If the Add Playlist, Edit Existing Playlist, or Delete Playlist stretch features were implemented:
      - [ ] If users can add a playlist, added playlists should be included in search results.
      - [ ] If users can edit a playlist, search results should reflect the latest edits to each playlist.
      - [ ] If users can delete a playlist, deleted playlists should no longer be included in search results.
      - **Note:** You will not be graded on the implementation of this optional subfeature to keep your grade of this stretch feature independent of your implementation of other stretch features. However, we highly suggest including this in your implementation to model realistic behavior of real applications. 

- [x] **Sorting Options**
  - [ ] Implement a drop-down or button options that allow users to sort the playlist by:
    - [ ] Name (A-Z alphabetically)
    - [ ] Number of likes (descending order)
    - [ ] Date added (most recent to oldest, chronologically)
  - [ ] Selecting a sort option should result in a reordering based on the selected sort while maintaining a grid view.

### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video actually renders and is playable when viewing this README. Ensure your walkthrough showcases the presence and/or functionality of all features you implemented above (check them off as you film!). Pay attention to any **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS** checkboxes listed above to ensure graders see the full functionality of your website! (🚫 Remove this paragraph after adding walkthrough video)

<div>
  <a href="https://www.loom.com/share/608a906d362045e08c51a9810602e941">
    <p>Music Playlist Explorer</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/608a906d362045e08c51a9810602e941-7590d179edc453ef-full-play.gif">
  </a>
</div>

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics in the lab definitely helped prepare me. Labs 1 & 2 gave me practice and guidance on designing the content of a website as well as its layout/design. Lab 3 helped me to understand the way buttons work and how JavaScript could provide actual events to occur on a website. Lab 4 helped me understand how content from a data file could be fetched and implemented, as well as the like feature. The only aspects of the project I felt unprepared for were the stretch features. This required a lot of outside resources and learning certain features myself. For example, I heavily used w3 schools to understand how to implement a search bar.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would want to implement the edit playlist feature as that was the only stretch feature I did not do. I also would want to figure out how I could store the playlists I added. When I reload the page, any playlists I added would disappear. I also would try to add more icons as the buttons in the website, like a magnifying glass for the search button. This would look more user-friendly and is commonly seen on actual websites. Also, for adding playlists, I would want to see how I could add images to the songs I add. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

What went really well for me was organizing the content of the webpage and designing it. I struggled more in the JavaScript portion of the page because it required more thinking and understanding how each event/button connects to each other. However, I was able to still implement those JS features effectively, it just required more outsourcing for guidance and logial thinking. It was very rewarding to implement a feature and understand the intricacies behind it in JS though! I would say some of my peers had better-looking websites, so next time I would work on the design more. 

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

Shout out to all my instructors as well as the tech supports! All were very understanding when issues occurred and genuinely wanted to help me fix it, but also understand where I went wrong. 
