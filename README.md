# Basic Gulpfile bootstrap 4 skeleton

The gulpfile in this repository will perform the following tasks –

-   Compile Sass files to CSS, add vendor prefixes and include source maps
- Minify any Javascript and include source maps
-  Copy/delete any HTML files
-  Copy/delete any images

When dependencies are installed, the directory layout is set out as follows -- 

	.
	├── dist
	├── gulpfile.js
	├── node_modules
	│   └── bootstrap
	│       ├── scss
	│       │   ├── bootstrap.scss
	│       │   └── ...Other files and directories
	│       └── ...Other files and directories
	├── package.json
	├── README.md
	└── src
	    ├── images
	    ├── js
	    └── scss

Feel free to delete any .keep files you find in the ```src/``` and ```dist/``` directories, these are only included so git retains the directory structure.

The Gulpfile contains tasks pertaining to HTML, Sass, images and Javascript but you probably don't want to use it that way. The tasks you are probably interested in are

- clean -- Deletes the contents of the ```dist/``` directory.
- build -- Runs the html, sass, images and javascript tasks sequentially.
- deploy -- Copies the contents of the ```dist/``` directory to the web root directory (```/var/www/html``` by default).
- watch -- Watches ```src/```, ```src/images```, ```src/js``` and ```src/scss``` for changes and performs appropriate tasks.

If invoked with no arguments gulp will run clean, build and watch tasks sequentially.

## Installation

You'll need npm (Node package manager) and Gulp. This is a v3.x gulpfile which is the default version pulled down by npm at the time of writing (09/07/18).

Clone the repository, then run ```npm install``` in the repository directory to install dependencies, then you should be ready to go.

## Usage
```gulp <task>``` will run the task you specify - you probably want to invoke it with no arguments the first time so that the entire ```dist/``` directory is built from the ```src/``` directory. Gulp will then watch for changes.

Make any changes you want to HTML files in ```src/``` or any images, javascript or sass files in the appropriate directories, gulp will automatically create, delete, update, compile etc as appropriate.

Sass styles should be written in a Sass stylesheet in the ```scss/``` directory which includes the following at the bottom – 

```@import "node_modules/bootstrap/scss/bootstrap";```

Any variables or styles defined above that line override the default bootstrap settings. 

## Licensing

&copy; 2018 dwhweb

MIT licensing applies -- feel free to distribute, modify etc
