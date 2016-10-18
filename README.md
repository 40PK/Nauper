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
* **Frame**, functionality:
  * Drawing characters on canvas
* **Question**, functionality:
  * Giving a choices to user, maximum is 4, they're redirecting user between scenes
* **Engine**, functionality:
  * Starting **Frame**'s and **Question**'s drawing
  * Handling clicks on canvas
  * Handling choices of **Question**

So, if you opened /src directory, you saw two more files.
That's what they are:
* *utils.js*, functions:
  * wrapText - function, needed by **UI**
  * getTextOffset - function, needed by **UI** too
  * putDefaults - function that expands given object with default object
* *nauper.js*, functionality:
  * In that file we can only see **Nauper** object definition

## Nauper's functionality
Coming soon!

## How to use
Coming soon!

## TODO
Write TODO
