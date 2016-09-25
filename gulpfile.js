
// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var gutil       = require('gulp-util');
var babelify    = require('babelify');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  'react-dom',
  'react/lib/ReactCSSTransitionGroup',
  'events',
  'flux',
  'bootstrap',
  'react-redux',
  'react-router-redux',
  'redux'
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('browserSync', function() {
  
  browserSync.init({
    files: ["./public/**/*.*"],
    port : 3000,
    server: {
      baseDir: './public'
    }
  })

});

gulp.task('sass', function(){
  return gulp.src('./src/css/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(browserSync.reload({ stream: true}))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('css', function() {
  return gulp.src('./src/css/**/*.css')
  .pipe(gulp.dest('./public/css'))
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./public/fonts'))
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
	.pipe(browserSync.reload({ stream: true}))
	.pipe(gulp.dest('./public/'))
});


gulp.task('watch', ['browserSync', 'sass', 'scripts', 'fonts', 'html'], function () {
	gulp.watch(['./src/js/**/*.js'], ['scripts']);
	gulp.watch(['./src/**/*.html'],['html']);
  gulp.watch(['./src/css/**/*.scss'],['sass']);
	gulp.watch(['./src/css/**/*.css'],['css']);
	gulp.watch(['./src/fonts/**/*'],['fonts']);
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch', 'fonts', 'html', 'sass'], function() {
  gulp.start('watch');
});

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './src/js/app.js',
    	debug: true
  	})

	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't have to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./public/js/'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the 
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./public/js/'));
}