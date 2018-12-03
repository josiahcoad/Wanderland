# SeeTheWorld

I love planning travel and seeing new places to go in the world. There is a recurrent problem with internet wanderlust though. Right now I'm planning a trip to India and googling queries such as *"best hill stations in the himalayas"* or *"best national parks in central india"*. I get back results like **"7 Best National Parks in Central India"**. Normally, it is a list of places that I have never heard of before and have literally point of reference for the place. So what do I do when I see a name like **Bandhavgarh National Park**? Open up another tab, copy/paste the name into google maps. And I have to do that for *every place* that sounds interesting. And then I start forgetting places or maybe I write them down somewhere but a little while later forget why I wrote it down, and now lost the website that I first found it on. With *SeeTheWorld* you can track places that interest you across web pages. You can add places of interest to your saved places by just clicking on the name of the place when it appears on the site. The idea is that you can easily see a short blurb about any place you added at any time, take notes and see pictures all within your workflow looking through a web page like the **"7 Best National Parks in Central India"**!

### Technical Details:
- We use an API [dandelion](https://dandelion.eu/docs/api/datatxt/nex/v1/) to do entity extraction on a web page HTML that the user is visiting.
- The API returns to us every entity (including locations), also the Wikipedia link, abstract and image link
- We use the chrome extension to manipulate the HTML DOM of whatever page is of interest, feeding the entire page HTML to the API and then using the match indices returned by the API to highlight/underline the matches. When a user hovers over an underlined match, a popup appears. It can include a mini google-map, location abstract, previous notes on the place, wiki-link etc... (weather?, news?)
- When the user wants to add location to list of their places, we can use the google-extension-storage to store users preferences
- Perhaps we could do allow the user to assign a rough date/orderings to their locations
- Definitely expandable if you have any other ideas!

### Todo:
- Tie in the Google Maps API to display where the location is on a thumbnail map
- Use chrome extension storage to allow users to save locations easily and see them on the map
- Make the info pop up in-line with the text, meaning we should underline/highlight the text and show the info-popup when the user hovers over the text (we need to know what our entity-extraction API considers **main content**)
- Add button in extension-icon-popup so that user can manually choose if they want to run the extension on the page
- Remove dandelion API key from the source code.

### How to Run
- download/clone the repo
- go to chrome://extensions/ in chrome browser
- click "Load Unpacked" and select the repo folder
- go to any site with locations mentioned to see results pop up at the top of the page
