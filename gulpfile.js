//Basic gulpfile for Bootstrap 4 projects
//By dwhweb 
//9th July 2018

//Includes
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

//Source and destination directories
var source = {
	sass : 'src/scss/',
	html : 'src/',
	images : 'src/images/',
	javascript : 'src/js/',
	dist : 'dist/'
};

var dest = {
	sass : 'dist/css',
	html : 'dist/',
	images : 'dist/images',
	javascript : 'dist/js',
	webroot: '/var/www/html'
};

//Globs for file matching
var globs = {
	sass : '**/*.scss',
	html : '**/*.html',
	images : '**/*.{svg,jpg,jpeg,gif,png,SVG,JPG,JPEG,GIF,PNG}',
	javascript : '**/*.js',
	dist : '**/*'
};

//Change handler function, notifies of change and handles deletions
function changeHandler(event, source, destination) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

	if (event.type === 'deleted') {
		// Simulating the {base: 'src'} used with gulp.src in the scripts task
		var filePathFromSrc = path.relative(path.resolve(source), event.path);
		//Concatenating the "build" absolute path used by gulp.dest in the scripts task
		var destFilePath = path.resolve(destination, filePathFromSrc);
		del(destFilePath);
	}
}

//Copy function 
function copy(source, destination) {
	return gulp
                .src(source)
                .pipe(gulp.dest(destination));
}

//Copy HTML
gulp.task('html', function() {
	return copy(source.html + globs.html, dest.html); 
});


//Copy images
gulp.task('images', function() {
	return copy(source.images + globs.images, dest.images); 
});

//Sass compiler options
var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
};

//Sass compile task
gulp.task('sass', function () {
        return gulp
                .src(source.sass + globs.sass)
                .pipe(sourcemaps.init())
                .pipe(sass(sassOptions).on('error', sass.logError))
                .pipe(sourcemaps.write())
                .pipe(autoprefixer())
                .pipe(gulp.dest(dest.sass));
});

gulp.task('javascript', function () {
	return gulp
		.src(source.javascript + globs.javascript)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.javascript));
});

//Watch directories
gulp.task('watch', function() {
	//HTML watcher
	gulp.watch(source.html + globs.html, ['html'])
	.on('change', function(event) {
		changeHandler(event, source.html, dest.html);
	});

	//Sass watcher
	gulp.watch(source.sass + globs.sass, ['sass'])
        .on('change', function(event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running sass tasks...');
        });

	//Images watcher
	gulp.watch(source.images + globs.images, ['images'])
        .on('change', function(event) {
		changeHandler(event, source.images, dest.images);
        });

	//Javascript watcher
        gulp.watch(source.javascript + globs.javascript, ['javascript'])
        .on('change', function(event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running javascript tasks...');
        });
});

//Clean task, cleans out dist directory
gulp.task('clean', function(){
	del(source.dist + globs.dist);
});

//Build task
gulp.task('build', function() {
	runSequence('html', 'sass', 'images', 'javascript');
});

//Deploy task, copies the contents of dist/ to webroot
gulp.task('deploy', function() {
	copy(source.dist + globs.dist, dest.webroot);
});

//Default task, runs all build/copy tasks and watches the src directory
gulp.task('default', function() {
	runSequence('clean', 'build', 'watch');
});
