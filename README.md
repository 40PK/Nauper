# Nauper
Nauper is a engine for visual novels based on web technologies.

Nauper uses HTML5 `<canvas>` element for rendering and controlling it by JS.

## Code guide
We use ES5 syntax with some ES6 features.

JavaScript style guide: [Airbnb](https://github.com/airbnb/javascript/tree/master)

ES6 translates to ES5 using Babel

## Engine structure
Okay, if you're there, I think you want to know about engine structure.

That's this:
* **Character**, functionality:
  * Giving object with links to images with characters sprites
* **UI**, functionality:
  * Background drawing
  * Textboxes drawing
  * Text drawing
  * Menu drawing
  * Click handling
  * Mousemove handling
* **Sound**, functionality:
  * Music playing
* **Frame**, functionality:
  * Sending drawing coordinates to UI
* **Question**, functionality:
  * Giving a choices to user, maximum is 4, they're redirecting user between scenes
* **Engine**, functionality:
  * Starting **Frame**'s and **Question**'s drawing
  * Handling clicks on canvas
  * Handling choices of **Question**

So, if you opened /src directory, you saw two more files.

That's what they are:
* **utils.js**, functions:
  * wrapText - function, needed by **UI**
  * getTextOffset - function, needed by **UI** too
  * putDefaults - function that expands given object with default object
  * getTextHeight - function that counts height of text, needed by UI
  * copyObject - function that copies data from one object to another
  * getWindowSize - function that returns size of user's browser's window
* **nauper.js**, functionality:
  * In that file we can only see **Nauper** object definition

## Reference
Going deeper.

#### Utils

`getTextHeight(stylestring)`:
  * Gets string like "15pt Verdana"
  * Returns height of this text in px

`wrapText(render, text, style, maxwidth)`:
  * Gets:
    * render - `<canvas>`'s 2d context
    * text - string with text we want to wrap into lines
    * style - string like "15pt Verdana" that means text style
    * maxwidth - maximum width of text line
  * Returns:
    * object, `object.result` is list of lines, `object.height` is height of the text

`getTextOffset(render, size, text)`:
  * Gets:
    * render - `<canvas>`'s 2d context
    * size - object, `object.width` must be window's width, recommended to use `engine.size`
    * text - string with the text we want to horisontal center
  * Returns:
    * X offset for text, needed to positioning

`putDefauls(defaults, given)`:
  * Gets:
    * defaults - object, from this object we'll get data to expand given object
    * given - object, to this object we'll put data from default object
  * Returns:
    * given objects expanded with data fom default object

`copyObject(obj)`:
  * Gets:
    * obj - object we need to copy
  * Returns:
    * copied object (different variable!)

`getWindowSize()`:
  * Gets:
    * nothing
  * Returns:
    * object, `obj.width` - window width, `obj.height` - window height, `obj.coff` - `obj.width / obj.height`

`convertHexIntoRGBA(hexstring, opacity)`:
  * Gets:
    * hexstring - string with hex color map like '#edaf25' or '#bde'
    * opacity - opacity of RGBA, min - 0, max - 1
  * Returns:
    * string like 'rgba(123, 234, 57, 0.7)'

#### UI
Before using this functions you need to do create `new UI(engine)`.
In engine default UI is `this.ui`.

`setBackground(bg)`:
  * Gets:
    * bg - string with name of file with background in ./data/images/backgrounds
  * Returns:
    * nothing
  * Does:
    * sets `<canvas>`'s background with given image

`drawTextBox(configs)`:
  * Gets:
    * configs - object with configuration, description in Configs section
  * Returns:
    * nothing
  * Does:
    * draws a textbox on canvas according to configs

`drawText(configs)`:
  * Gets:
    * configs - object with configuration, description in Configs section
  * Returns:
    * nothing
  * Does:
    * draws text on canvas according to configs

`checkMenuIconClick(event)`:
  * Gets:
    * event - JavaScript's `Event()` object, specially `click`
  * Returns:
    * true - if click was in menu icon's area
    * false - if click wasn't in menu icon's area

`process(event)`:
  * Gets:
    * event - JavaScript's `Event()` object, specially `click`
  * Returns:
    * 'draw' - if needed to draw current element
    * 'next' - if needed to switch to the next element
    * `null` - if no need to do anything
  * Does:
    * checks click's position
    * draws menu if needed

`move(event)`:
  * Gets:
    * event - JavaScript's `Event()` object, specially `mousemove`
  * Returns:
    * nothing
  * Does:
    * checks mouse position
    * redraws Question's elements if needed
    * redraws menu icon if needed

`addMenuScreen(menumap)`:
  * Gets:
    * menumap - list of objects, objects is menu items
  * Returns:
    * nothing
  * Does:
    * pushes menumap to `UI.menu` if needed

`setMenuStyle(sm)`:
  * Gets:
    * sm - object with configuration, description in Configs section
  * Returns:
    * nothing
  * Does:
    * extends sm with default values
    * writes style into `UI.menuStyle`

`drawMenu()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * draws menu on the canvas according to `UI.menuStyle` and `UI.menu`
    * changes `UI.menuOpened` state to `true`

`setMenuIconStyle(mis)`:
  * Gets:
    * mis - object with configuration, description in Configs section
  * Returns:
    * nothing
  * Does:
    * extends mis with default value
    * writes style to `UI.menuIconStyle`

`drawMenuIcon()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * draws menu icon on the canvas

`drawTextLine(text, x, y, i)`:
  * Gets:
    * text - string with text we want to draw on canvas
    * x - x offset for text
    * y - y offset for text
    * i - index of letter we want to draw
  * Returns:
    * nothing
  * Does:
    * draws one letter on the canvas
    * setups timeout to draw all letters in line

#### Sound
Before using this functions you need to do create `new Sound(engine)`.
In engine default Sound is `this.sound`.

`play(filename, once)`:
  * Gets:
    * filename - name of audio file in ./data/sounds
    * once - Boolean, if false - sound won't be repeated
  * Returns:
    * nothing
  * Does:
    * starts playing of sound
    * sets event listeners for `<audio>`

`init()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * calls `setVolume` to setup volume

`setVolume(volume)`:
  * Gets:
    * volume - Number, min - 0, max - 1, default - `engine.audioVolume`
  * Returns:
    * nothing
  * Does:
    * Sets `engine.audioVolume`
    * Sets `this.audioVolume`
    * Sets volume to `<audio>` element

`pause()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * Pauses an audio

`stop()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * calls `Sound.pause`
    * removes event listeners from `<audio>`
    * clears an `Sound.audio.src`

`process(audio, once)`:
  * Gets:
    * audio - name of audio file in ./data/sounds, if false - stop the audio
    * once - boolean, if false - sound won't be repeated
  * Returns:
    * nothing
  * Does:
    * calls `Sound.play` if needed
    * calls `Sound.stop` if needed

#### Engine
Before using this functions you need to create `new Engine(configs, elements)`.

`click(event)`:
  * Gets:
    * event - JavaScript's `Event()` object, specially `click`
  * Returns:
    * nothing
  * Does:
    * calls `Engine.nextElement` or `Engine.choice`

`choice(event)`:
  * Gets:
    * event - JavaScript's `Event()` object, specially `click`
  * Returns:
    * nothing
  * Does:
    * Checks every choice item to click
    * Redirects to other scene if needed

`nextElement()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * switches view to the next element
    * setups event listeners
    * draws element

`start()`:
  * Gets:
    * nothing
  * Returns:
    * `true`
  * Does:
    * setups event listeners
    * initializes sound
    * draws first element

`addScene(scene)`:
  * Gets:
    * scene - list of Frames and Questions
  * Returns:
    * nothing
  * Does:
    * pushes scene to `Engine.elements`

#### Frame
Before using this functions you need to do create `new Frame(engine)`.

`draw()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * clears `<canvas>` element
    * calls `UI.setBackground`
    * calls `Frame.displayCharacters`

`setText()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * calls `UI.drawTextBox` with configs
    * calls `UI.drawText` to draw name of character
    * calls `UI.drawtext` to draw text

`displayCharacters()`:
  * Gets:
    * nothing
  * Returns:
    * nothing
  * Does:
    * draws all specified character on the canvas
    * calls `Frame.setText`

#### Question

`draw(clear)`:
  * Gets:
    * clear - boolean, if true, `<canvas>` will be cleared, default - true
  * Returns:
    * nothing
  * Does:
    * clears `<canvas>` if needed
    * calls `UI.setBackground`
    * draws Question's items using `UI.drawTextBox` and `UI.drawText`

#### Character

no methods yet


## Configs
#### UI.drawTextBox
  * config.type:
    * 'default' - textbox with edges
    * 'rounded' - textbox with rounded corners
    * 'image' - textbox is an scaled image
    * default is 'default'
  * config.color:
    * color in hex ('#fff')
    * color in text name ('white')
    * color in rgb ('rgb(255, 255, 255)')
    * color in rgba ('rgba(255, 255, 255, 1)')
    * default is '#fff'
  * config.link:
    * path to textbox image, use if type === 'image'
    * default is ''
  * config.x:
    * x offset for textbox
    * min 0
    * max 1
    * for window with 1280px width, 0 - 0, 1 - 1280, 0.5 - 640
    * default is 0.025
  * config.y:
    * y offset for textbox
    * min 0
    * max 1
    * for window with 720px height, 0 - 0, 1 - 720, 0.5 - 360
    * default is 0.80
  * config.height:
    * height of the textbox
    * min, max and example the same as in config.y
    * default is 0.18
  * config.width:
    * width of the textbox
    * min, max and example the same as in config.x
    * default is 0.95
  * config.radius:
    * radius of rounded corner
    * min, max and example the same as in config.y
    * default is 0.05
  * config.callback:
    * function, called after textbox is drawed

#### UI.drawText
  * config.text:
    * string with text you want to draw
    * default is ''
  * config.align:
    * 'wrapped' - wrap text into lines using `wrapText` function from utils
    * 'center' - sets config.x to align text to center
    * default is 'wrapped'
  * config.color:
    * color in hex ('#fff')
    * color in text name ('white')
    * color in rgb ('rgb(255, 255, 255)')
    * color in rgba ('rgba(255, 255, 255, 1)')
    * default is '#000'
  * config.x:
    * x offset for text
    * min 0
    * max 1
    * for window with 1280px width, 0 - 0, 1 - 1280, 0.5 - 640
    * use with config.align === 'wrapped'
    * default is 0.10
  * config.y:
    * y offset for textbox
    * min 0
    * max 1
    * for window with 720px height, 0 - 0, 1 - 720, 0.5 - 360
    * default is 0.85
  * config.width:
    * max width for line of text
    * use with config.align === 'wrapped'
    * min, max and example is the same as in config.x
    * default is 0.80
  * config.animation:
    * boolean, if true text drawing will be animated
    * default is false

#### UI.setMenuStyle
  * config.mainbox:
    * 'default': menu will have edges
    * 'rounded': menu will have rounded corners
    * 'image': menu will be an image
    * default is 'default'
  * config.smallbox:
    * all is the same as in config.mainbox
  * config.maincolor:
    * color in hex ('#000')
    * color in text name ('black')
    * color in rgb ('rgb(125, 255, 0)')
    * color in rgba ('rgba(255, 125, 0, 0.7)')
    * default is '#fff'
  * config.smallcolor:
    * all is the same as in config.maincolor
    * default is '#eee'
  * config.smallheight:
    * height of menu items
    * min 0
    * max 1
    * for window with 720px height, 0 - 0, 1 - 720, 0.5 - 360
    * default is 0.10
  * config.smallspace:
    * space between menu items
    * min, max and example is the same as in config.smallheight
    * default is 0.025
  * config.title:
    * color of menu's title (not realized yet)
    * all definitions is the same as in config.maincolor
    * default is '#000'
  * config.items:
    * color of menu items's text
    * all definitions is the same as in config.maincolor
    * default is '#111'

#### UI.setMenuIconStyle
  * config.type:
    * 'default' - icon will have edges
    * 'rounded' - icon will have rounded corners
    * 'image' - icon will be an image
    * default is 'default'
  * config.x:
    * x offset for icon
    * min 0
    * max 1
    * for window with 1280px width, 0 - 0, 1 - 1280, 0.5 - 640
    * default is 0
  * config.y:
    * y offset for icon
    * min 0
    * max 1
    * for window with 720px width, 0 - 0, 1 - 720, 0.5 - 360
    * default is 0
  * config.width:
    * width of the icon
    * min, max and example is the same as in config.x
    * default is 0.05
  * config.height:
    * height of the icon
    * min, max and example is the same as in config.x
    * default is 0.05
  * config.radius:
    * radius of rounded corners
    * use when config.type === 'rounded'
    * min, max and example is the same as in config.x
    * default is 0.01
  * config.link:
    * path to image with icon
    * use when config.type === 'image'
    * default is ''
  * config.color:
    * color of the icon
    * use when config.type !== 'image'
    * default is '#efefef'


## Nauper's functionality
You can:
  * Draw background
  * Draw textboxes
  * Draw characters
  * Draw text
  * Draw menu

Textboxes can be:
  * With edges
  * Rounded
  * An images
  * With different colors

Question's textboxes have an active state and can change their color when cursor is over it

Menu is built from textboxes

## How to build

At first, install NodeJS :)

Install gulp globally using npm
```
npm install gulp -g
```

Go to a project folder and install dependencies
```
npm install
```

Build all using gulp
```
gulp build
```

P.S. If you want to see more gulp tasks just do `gulp help`

## How to run example

Install gulp globally using npm
```
npm install gulp -g
```

Go to a project folder and install all requirements
```
npm install
```

Run `default` gulp task to rebuild all
```
gulp default
```

or run just webserver

```
gulp webserver
```

then open your browser and go to `localhost:8000`

## How to use
Coming soon!

## TODO
That's what we have in our todo-list:
* *Fix* name and text positioning
* *Fix* characters display on mobile devices
* *Add* default configs to all types
* *Fix* text size on window resize
* *Fix* text positioning on mobile devices in album orientation
* *Make* menu's width adaptive
* Increase performance
