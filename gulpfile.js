/**
 * Created by mipl-80 on 10/1/2015.
 */
var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    tsProject = ts.createProject('tsconfig.json');

/*var browserify 	= require('browserify');
var tsify 		= require('tsify');
var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');*/

// compile typescript task
gulp.task("tscompile", function(){
    return gulp.src(["./app/**/*.ts"])
        .pipe(ts(tsProject))
        // .pipe(concat("App.js"))
        .pipe(gulp.dest('./www'));
});

// tscompile for external modules

/*gulp.task('tsc', function(){
    return browserify('./src/App.ts')
        .plugin(tsify)
        .bundle()
        .pipe(source('App.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'));
});*/

//copy assets

gulp.task('copy:bootstrap', function(){
   gulp.src(['./app/libs/bootstrap/dist/fonts/*'])
       .pipe(gulp.dest('./www/font'));
   gulp.src('./app/libs/bootstrap/dist/js/bootstrap.min.js')
       .pipe(gulp.dest('./www/libs/bootstrap'));
    return gulp.src(['./app/libs/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('./www/css'));
});

gulp.task('copy:materialcss', function(){
    gulp.src(['./app/libs/material/font/*'])
        .pipe(gulp.dest('./www/font'));
    gulp.src('./app/libs/material/materialize.min.js')
        .pipe(gulp.dest('./www/libs/material'));
    return gulp.src(['./app/libs/material/materialize.min.css'])
        .pipe(gulp.dest('./www/css'));
});

gulp.task('copy:extLibs', function(){
    gulp.src(['./app/libs/handlebars/dist/handlebars.min.js'])
        .pipe(gulp.dest('./www/libs/handlebars'));
    gulp.src(['./app/libs/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('./www/libs/jquery'));
    gulp.src(['./app/libs/requirejs/require.js','./app/libs/requirejs/text.js'])
        .pipe(gulp.dest('./www/libs/requirejs'));
    gulp.src(['./app/libs/path/path.js'])
        .pipe(gulp.dest('./www/libs/path'));
    gulp.src(['./app/libs/pubsub/pubsub.js'])
        .pipe(gulp.dest('./www/libs/pubsub'));
    return gulp.src(['./app/libs/underscorejs/underscore-min.js'])
        .pipe(gulp.dest('./www/libs/underscorejs'));
});

gulp.task('copy:index', function(){
   return gulp.src('./app/index.html')
       .pipe(gulp.dest('./www'));
});

gulp.task('copy:css', function(){
    return gulp.src(['./app/css/**/*'])
        .pipe(gulp.dest('./www/css'));
});

gulp.task('copy:views', function(){
   return gulp.src('./app/views/*')
       .pipe(gulp.dest('./www/views'));
});

// watch task
gulp.task('watch:tsfiles', function(){
    return gulp.watch("./app/**/*.ts", [ 'tscompile']);
});

gulp.task('watch:assets', function(){
   return gulp.watch(["./app/css/*", "./app/index.html", "./app/views/*"],['copy:index','copy:css', 'copy:views']) ;
});

// clean build dir task

gulp.task('cleanbuild', function(){
    return gulp.src("./www/js")
        .pipe(clean());
});


// default task
gulp.task('default', ['copy:extLibs','copy:materialcss', 'copy:assets', 'cleanbuild', 'tscompile', 'watch:tsfiles','watch:assets']);
gulp.task('copy:assets', ['copy:index','copy:css','copy:views']);