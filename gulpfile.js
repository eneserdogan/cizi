/**
 *
 * 01. GULP
 * 02. JADE
 * 03. STYLE
 * 04. SCRIPTS
 * 05. BROWSER SYNC
 * 06. COMPRES
 * 07. DEFAULT - RUN
 *
 */

/*
 *
 * 01. GULP - PLUGINS
 *
 */

var gulp   = require("gulp"),
    jade   = require("gulp-jade"),
    sass   = require("gulp-sass"),
    uncss  = require("gulp-uncss"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    prefix = require("gulp-autoprefixer"),
    zip    = require("gulp-zip"),
    chmod  = require('gulp-chmod'),
    sync   = require("browser-sync").create();


/*
 *
 * 02. JADE
 *
 */


gulp.task('jade',function(){
    return gulp.src('app/*.jade')
        .pipe(notify({
            "title": "Jade Task",
            "message": "Processing JADE File: <%= file.relative %> | <%= options.date %>",
            "onLast": true,
            "wait": true,
            templateOptions: {
                date: new Date()
            }
        }))
        .pipe(jade({
            pretty:true
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(sync.stream());
});


/*
 *
 * 03. STYLE
 *
 */


gulp.task('style',function(){
    return gulp.src('app/views/assets/sass/main.scss')
        .pipe(notify({
            "title": "Style Task",
            "message": "Processing SCSS File: <%= file.relative %> | <%= options.date %>",
            "onLast": true,
            "wait": true,
            templateOptions: {
                date: new Date()
            }
        }))
        .pipe(sass({
            errLogToConsole: true,
            outputStyle:'compressed'
        }).on('error',sass.logError))
        .pipe(prefix())
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(sync.stream());
});


/*
 *
 * 04. SCRIPTS
 *
 */


gulp.task('scripts',function(){
    return gulp.src('app/views/assets/js/**/*.js')
        .pipe(notify({
            "title": "Scripts Task",
            "message": "Processing JS File: <%= file.relative %> | <%= options.date %>",
            "onLast": true,
            "wait": true,
            templateOptions: {
                date: new Date()
            }
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(sync.stream());
});


/*
 *
 * 05. BROWSER SYNC
 *
 */


gulp.task('server',function(){
    sync.init({
        notify : false,
        server : "./dist/"
    });

    gulp.watch('app/views/assets/js/**/*.js',['scripts']);
    gulp.watch('app/views/assets/sass/**/*.scss',['style']);
    gulp.watch('app/**/*.jade',['jade']);
    gulp.watch('./dist/*.html').on('change',sync.reload);
});


/*
 *
 * 06. THEME  ZIP
 *
 */

gulp.task('zip',function(){
   return gulp.src('dist/**')
       .pipe(zip('child-theme.zip'))
       .pipe(chmod(777))
       .pipe(gulp.dest('./'));
});


/*
 *
 * 07. DEFAULT - RUN
 *
 */

gulp.task('default',['jade','style','scripts','server','zip']);
