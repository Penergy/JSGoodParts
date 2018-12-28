var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var del = require("del");
var paths = {
    pages: ['./ts.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['ts/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}
function clean() {
    return del(['copy-html']);
}

gulp.task("default",  gulp.series(clean,"copy-html", bundle));
gulp.task(clean);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);