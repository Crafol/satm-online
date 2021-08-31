# Collectible Card Game 

This project allows you to play MECCG or similar.

*Middle-earth CCG and LotR are trademarks of Middle-earth Enterprises and/or Iron Crown Enterprises. This is not affiliated with Middle-earth Enterprises or Iron Crown Enterprises.*

## Watch a Demo

[![Watch Demo](https://img.youtube.com/vi/XFPFwfsEJSg/0.jpg)](https://www.youtube.com/watch?v=XFPFwfsEJSg)

## Introduction

This project aims to provide an easy way to setup and maintain a card game server to allow you and your friends to play your favourite card game online.

Although the gameplay is guided by Middle-earth Collectible Card Game, you can easily adapt it to your own game.

Most importantly, you will need to provide the card data and its images. A description of the JSON format will be given below.

### Feature Overview

Here are some essential features of this project:

* Intuitive gameplay via drag and drop.
* No user identity management needed.
* A database server is not needed at all.
* No persistence needed, all works *in-memory*

### What you can do

This project allows to

* Play a game
* Play a shared deck game (arda)
* Browse cards
* Build a deck

## Disclaimer

Middle-earth CCG and LotR are trademarks of Middle-earth Enterprises and/or Iron Crown Enterprises.

*MECCG* assets are not included in this repository. 

## Preparations

Card data and images *are not part of this project* and you will have to provide them.

You have to provide certain configuration data using the file ``./data/config.json``. Changes will be ignored via ``.gitignore``. The sample file ``./data/config-example.json`` shows a mock configuration.

### Providing Card Data

The card data file is centra, because all further data is generated from it (which images and sites to use, etc.). 

There are two ways to provide for this json object:

* deploy the card data json file to ``./card-data/cards-raw.json``. This file will be ignored via ``.gitignore``. See the section *Providing your own cards* down below for more detailed information.
* setup a dedicated CDN server and provide the endpoint to query the json from via your configuration file.

### Providing Card Images

The image URL is being constructed as part of the `plugins/imagelist.js` module. Your own endpoint may be added via the configuration file. Importantly, you can also use a CDN server (*HTTPS* is required. Otherwise the request will be blocked due to content-transport-policy limitations).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

Open your terminal and access this project folder. THen run the following commands:

```
$ npm install
$ npm start
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

### Security

This project does not require any databases or other storage containers. Everything is held in memory only.

All card images are requested from a content delivery server (CDS) to keep images and this application separate.

To avoid cross-site-scripting attacks from the game participant's, the following *Content-Security-Policy* and *X-Content-Security-Policy* are applied in a game:

* default-src 'self'
* script-src 'self'
* img-src 'self' (and the CDS)

*Content-Security-Policy violation attempts can be reported if you provide such an endpoint and additional configuration setting.*

All usernames will be evaluated and the following rules applied:

* Leading and ending whitespaces will be removed.
* The username will be reduced to 30 characters if necessary.
* It will be stripped from any quotes characters.

A username will be rejected if it contains HTML breaking characters `<` or `>` and the login attempt will fail.

## Gameplay

It is assumed that the app runs locally at ``localhost:8080``

### Setting up a new game

There are 2 ways to start a new game:

* Guided via ``localhost:8080/``
* Direct via ``localhost:8080/play/yourgamename``

Each game will be identified by its name in the URL (see *yourgamename* above). The guided method will automatically create such a URL.

You will be asked for a username and a deck to use. These are required.

If you are the first player to join a table, you are considered the table's *host*.

![Starting a Game](readme-data/entry.png)

### Joining a game

You can join a game simply by accessing the direct URL or via the list provided on the site's home page (e.g. ``localhost:8080/``)

Once you chose a username and a deck, you will be redirected to a lobby. There, you will have to wait until the table's *host* grants you access to the table. All you have to do is wait there.

### Entering the game table

You will be asked if you want to start the audio chat. This is not supported at the moment but would simply open another browser tab and load the meetings url.

#### A first look

When you enter the table, you will be greeted with an introduction popup telling you about chat opportunites and the drag and drop gameplay.

Once closed, the table will look like this:
                
![The table](readme-data/table.png)

The upper left corner shows the players at this table. The active player is highlighted in bold. Next to each player is the card number in hand once the first organisation phase starts.

#### Playing Cards

Playing cards works via *drag & drop*. Once you drag the card, target drop zones will appear where you can drop the respective card.

![Playing Cards](readme-data/sample-drop.png)

You can drag the card over each of the drop zones and drop it to put it into play (or to any pile). Each potential drop zone will have a tooltip appearing which indicates the action type.

####  Playing Characters

A character may create a *new company* or *join* an existing company under general influence or follow a character under direct influence. As a player, you have to make sure that the action is legitimate, i.e. there is enough general or direct influence available.

Splitting and reoganizing companies is easy as well. Simply drag the character and perform the action. If they have followers, they will continue to follow as well.

![Playing Characters](readme-data/char.png)

In this example, a character may join its current company under general influence, join another company either under direct or general influence or split into a separate company.

#### Choosing a start site

A company is indicated by a dotted line, above which there is a mountain icon. Clicking on this will open the map where hyou can select your home site.

![ ](readme-data/homesite.png)

The map will appear with red markers on it. Such a marker is called a region marker. Clicking on it will show all available sites in that region. Clicking on such a site will automatically set it as starting site.

![ ](readme-data/homesite-map.png)
After having clicked on the site, the map window closes and the site is set.

![ ](readme-data/homesite-done.png)

#### Planning your movement

To plan your movement, click on the mountain icon again to open the map. Similar to start site selection, choose your target site.

![ ](readme-data/movement-1.png)

The sitepath will have to be chosen manually. To do so, click on a region and add it to the sitepath. To remove it again, click on the card in the sitepath.

![ ](readme-data/movement-2.png)

To confirm this movement, click on the green icon and close the winodw again.
To reval the movement to your opponent, click on the "eye" icon.

![ ](readme-data/movement-3.png)

#### Playing Hazards

Hazards can be either events or creatures. Usually, events are added to the staging area.

![ ](readme-data/hazard-1.png)

Hazards may also be attached to a specific chraracter, e.g. corruption cards.

![ ](readme-data/hazard-2.png)

To force a company or character to face hazard, drop it onto the regions and it will appear next to the site.

![ ](readme-data/hazard-3.png)

![ ](readme-data/hazard-4.png)

If you want to play a card "on guard", simply drop it onto the destiation site and it will appear face fown.

#### Obtaining Marshalling Points

To obtain marshalling points, simply drag a card onto your vicotry pile.

![ ](readme-data/score-1.png)

This will open a window that lets you choose the category and amount of points.

![ ](readme-data/score-2.png)

#### No more hazards

You can signal the end of your hazard play against a company by right clicking on the target site and choosing the respective action.

![ ](readme-data/nmh-1.png)![ ](readme-data/nmh-2.png)

This action will reduce the sitepath to the destiation site only. On guard cards will be kept attached to the site.

![ ](readme-data/nmh-3.png)

#### Updating your scores

Click on the victory pile icon to open the score sheet.

![ ](readme-data/score-3.png)

You can change your points at any time during the game.

![ ](readme-data/score-4.png)

#### Tapping Cards and Sites

To alter the card state, hover over the card and wait for the cursor to change. A question mark indicates a right click action to be available.

![ ](readme-data/tap-1.png)

![ ](readme-data/tap-2.png)

The context menu provides all available actions.

![ ](readme-data/tap-3.png)

![ ](readme-data/tap-4.png)


#### Reshuffle discard pile into playdeck

The discard pile will be reshuffled automatically once your playdeck is out of cards. You do not need to do this yourself.

#### Troubleshooting

* Sometimes you may not hit the drop zone to play a card. Just retry.
* You may reload the page if it seems necessary.
* Open the browsers inspection tool console to check for errors. This should usually not happen but you never know. Chrome's shortcut is CTRL+SHIFT+J

#### Game Options

You can access certain options via the options icon.

![Preferences](readme-data/game-prefs.png)

#### Revealing cards to your opponent

You can reveal cards to your opponent by opening the respective pile and selecting the action at the top of the box.

![Revealing cards](readme-data/reveal-cards.png)

#### Empty play deck

If you are out of cards, simply draw a new card. All cards from you discard pile will be added to your play deck and are reshuffled automatically.

#### Organisation Phase / Scoring cards

To store cards, move them to your marshaling points pile. A popup will ask you to specify how (and if) this card should be stored.

#### Finishing the Game

You can finish the game via the game preferences menu (see above). This will automatically bring up a score sheet with the oval results.

The game will end automatically.

## Arda Gameplay

The Arda gameplay differes from the standard games a bit. The rules will not be discussed.

### Starting an Arda Game

Simply choose an arda deck from the right deck offerings (or provide your own deck) and check the "Arda game type" checkbox.

![Starting an Arda game](readme-data/arda-1.png)

### Character Draft

Once all players have joined the table (see below) you can randomly assign the 10 starting characters by clicking on the respective box at the right of the screen.

![Starting an Arda game](readme-data/arda-2.png)

This option is only available once!

Clicking on this option adds 10 characters to each players hand according to the Arda mechanism. After you have picked your cards, please *discard* the other characters by dragging and dopping them on the discard icon at the right next to your hand.

### Minro Item Draft

Now each player picks their minor items from the minor item offering deck. 

### Starting the Game

To put all characters and minor items back into the playdeck and get a random number of cards, click on the recycle icon above the deck's "Draw Card" icon. 

![Redraw common hand cards](readme-data/arda-3.png)

### Joining an Arda Game

To join an Arda game, simply click on the game from the game list.

![Game List](readme-data/arda-4.png)

You will be asked to provide only a user name so your fellow players know who you are. The game host will receive a message with your request to join. Once that is granted you will proceed to the table automatically.

### Granting Access

Whenever a player wants to join the table, you will receive a notification and the option to grant or deny access. You will receive a notification once the player has successfully joined the table.

![Game List](readme-data/arda-6.png)

## Adaptation Mechanisms

You have the following default adaptation possibilities:

* Providing your own map
* Providing your own cards

### Providing your own map

To provide your own map, "simply" create all the necessary tiles and deploy them to 

`/media/maps/regions/`

A map file usually has a resolution of 5.376x5.376px or 13.312x13.312px

The following script uses imagemagic to create tiles from a map saved as map.jpg.

```
#!/bin/bash

maxTiles=1

for i in `seq 1 8`
do
    width=$maxTiles
    a=$((256*$width))


    echo "${i}.\tmkdir ./${i}"
    mkdir "./${i}"

    echo "${i}.\tconvert ./map.jpg -resize ${a}x${a} ./${i}/map.jpg into tiles $maxTiles"
    convert ./map.jpg -resize ${a}x${a} ./${i}/map.jpg

    echo "${i}.\tcreate tiles"
    convert ./${i}/map.jpg -crop 256x256 -set filename:tile "%[fx:page.x/256]_%[fx:page.y/256]" +repage +adjoin "./${i}/tile_%[filename:tile].jpg"

    echo "--------"

    maxTiles=$(($maxTiles*2))
done
```

### Providing your own cards

Now, this is not trivial at all, because you will have to put quite a lot of effort into your data.

However, the data structure itself is quite simple, because a simple JSON array of card data properties is all that is required:

```
[{ ... }, { ... }, ...]
```


You can either store this file locally at

`./data/cards-raw.json`

or make it available via your CDN.

The images can either be obtained via a remote server or from your local file system. The configuration file needs to be updated accordingly (see above).

The basic card data object is similar to this

```
{
    "alignment": "Hero|Minion|Neutral",
    "type": "Resource|Hazard|Character|Site|Region",
    "title": "Precious Gold Ring",
    "normalizedtitle": "precious gold ring",
    "code": "Precious Gold Ring (TW) [H]",
    "ImageName": "metw_preciousgoldring.jpg",
    "set_code": "METW",
    "Region": "title of the respective region (for sites only)",
}
```

Each card is identified by its unique `code` and all quotes will be stripped when loading to avoid invalid html tags. 

Importantly, the general code should look similar to this:

`NAME [ALIGNMENT] (SET)`

e.g.

`Precious Gold Ring [H] (TW)`

*Importantly,* a region does not have an alignment in its code and follows the notation

`NAME (SET)`

The `alignment` value allows to differentiate hazard cards ("neutral") from non-hazards.

The `type` has implications on a card's playability:

* Only *Characters* can create a company.
* A *Resource* or *Hazard* can be attached to a chatacter or placed in the staging/event area.
* A *Region* or *Site* will only be available in the map to choose from.

The `set_code` is required and only used for image path purposes (see above). You may limit your cards to exactly one set also.

## Architecture

The HTTP server handles everything but the in-game communication.

The in-game communication is handled via `socket.io` websockets and a reconnection attempt is triggerd automatically should a connection be lost (may happen depending on your internet connection stability).

A websocket requires "knowledge" of the game room's individual access key, your temporary user id and a one-time access token.

Once you successfully connect via the websocket, your one-time access token is invalidated automatically to avoid deny unwanted  connections from other machines.

All these information are served with the game's HTML file in a dedicated `script` block.

Strong content-security-policy (CSP) restrictions are imposed on the game page to really limit connectivity to the sources absolutely essential to play the game - so in theory, a cross-site scripting (XSS) attacks should not be possible. Code injections would be denied as well. Even potential image src attacks should be impossible, because each card graphic is validated by its code (and other images would be blocked due to the CSP settings.

The deck data is also matched against the available card data and used as a read-only source to create a new and individual deck object. The number of cards in your deck is also limited to 300.

### API / Endpoint description

The various endpoints can be found in the `./api` directory.

### Third Party Libraries

Of cource, this project would not be possible without the work of others, and credit should be given.

The following third-party libraries. Be aware of their respective licenses.

* Node.JS - Socket.io 4.0.0 (MIT License)
* Node.JS - Express 4.17.1 (MIT License)
* Node.JS - Express cookie-parser 1.4.5 (MIT License)
* jQuery 3.5.1 (MIT License)
* jQuery UI v1.12.1 - 2021-03-20 (widget.js, data.js, scroll-parent.js, widgets/draggable.js, widgets/droppable.js, widgets/mouse.js, MIT License)
* leafletjs 1.6.0 (BSD 2-Clause "Simplified" License)

#### HTML / CSS 

* Some CSS is taken from https://html5up.net (MIT License)
* The CSS colours and some design ideas were taken from https://github.com/mtgred/netrunner (MIT License)
* Font Awesome Free, see https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)

#### Icons and Backgrounds

* All icon licenses are "free for commercial use" with no link back Icons were taken from https://www.iconfinder.com/
* The background image was taken from https://www.pexels.com/ Unfotunately, I cannot remember the link exactly anymore.

## License

This source code is licensed using the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
