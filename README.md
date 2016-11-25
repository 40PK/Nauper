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
