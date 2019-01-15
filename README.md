# See The World :airplane:

I love planning travel and seeing new places to go in the world :earth_africa:. There is a recurrent problem with internet wanderlust though. :grimacing: Right now I'm planning a trip to India and googling queries such as *"best hill stations in the himalayas"* or *"best national parks in central india"*. I get back results like **"7 Best National Parks in Central India"**. Normally, it is a list of places that I have never heard of before and have literally no point of reference for the place. :hear_no_evil: So what do I do when I see a name like **Bandhavgarh National Park**? Open up another tab, copy/paste the name into google maps. And I have to do that for *every place* that sounds interesting :expressionless:. And then I start forgetting places or maybe I write them down somewhere but a little while later forget why I wrote it down, and now lost the website that I first found it on. :man_facepalming: With *SeeTheWorld* you can track places that interest you across web pages. You can add places of interest to your saved places by just clicking on the name of the place when it appears on the site. The idea is that you can easily see a short blurb about any place you added at any time, take notes and see pictures all within your workflow looking through a web page like the **"7 Best National Parks in Central India"**! :sunglasses:

![tigerrr](https://travel-blog.waytoindia.com/wp-content/uploads/Kanger-Ghati-National-Park.jpg)

### Technical Details:
- We use an API [dandelion](https://dandelion.eu/docs/api/datatxt/nex/v1/) to do entity extraction on a web page HTML that the user is visiting.
- The API returns to us every entity (including locations), also the Wikipedia link, summary and image link
- We use the chrome extension to manipulate the HTML DOM of whatever page is of interest, feeding the entire page HTML to the API and then using the match indices returned by the API to highlight/underline the matches. When a user hovers over an underlined match, a popup appears. It can include a mini google-map, location summary, previous notes on the place, wiki-link etc... (weather?, news?)
- When the user wants to add location to list of their places, we can use the google-extension-storage to store users history
- Perhaps we could allow the user to assign a rough date/orderings to their locations
- Definitely expandable if you have any other ideas!


![example screenshot](assets/readme_example.png)

### Todo:
- Tie in the Google Maps API to display where the location is on a thumbnail map
- Use chrome extension storage to allow users to save locations easily and see them on the map
- Make the info pop up in-line with the text, meaning we should underline/highlight the text and show the info-popup when the user hovers over the text (we need to know what our entity-extraction API considers **main content**)

### How to Run:
- download/clone the repo
- go to ```chrome://extensions/``` in chrome browser
- toggle Developer Mode (switch in top right corner of page)
- click "Load Unpacked" and select the repo folder (button in top left corner of page)
- go to any site with locations mentioned to see results pop up at the top of the page

### How to Contribute:
- So you like the idea and want to be part of it? Awesome! Do whatever seems interesting to you!
- Please submit your changes as a pull request. Idealy a pull request represents a complete feature you're adding.
- For GUI related, a useful place for brainstorming is [draw.io](https://drive.google.com/file/d/1-qyOF1iSzyxsx16Yxgx-hzV8WLq0Mt1d/view?usp=sharing) where you are free to edit. Hopefull we can use this to agree on the GUI will look/behave before putting too much effort into the coding of it.
- Every pull request is run through a rigorous stylistic auto-checker called **codebeat**. Before any PR can be merged, it should not raise any issues on codebeat. Our "GPA" for the code base right now is 3.98 ([see whole report here](https://codebeat.co/projects/github-com-josiahcoad-seetheworld-master)). Thank you for doing your part to keep it that way!
- We use the *Beautify* VS Code Extension to maintain the formatting standard for the repo. Please make sure you have this extension installed and run auto-formatter on your documents before submitting a PR.

Peace out and happy travelling :v: :yum:
