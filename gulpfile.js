    var gulp = require('gulp'),
        browserSync = require('browser-sync'),
        reload = browserSync.reload;
    // -------------- Config Object
    config = {
        browsersync: {
            // your array of files and folders to watch for changes
            watch: [
                'src/js/**/*.js',
                'src/css/**/*.css',
                'src/bootstrap/**/*.*',
                '*.htm',
            ]
        }
    };

    //var loc = window.location.pathname.substring(0, loc.lastIndexOf('/'));

    serverInit = {
        server: {
            injectChanges: true,
            baseDir: "./",
            index: "index.htm"
        },
        //startPath: '/',
        port: 9000,
        // proxy: "http://localhost:9000/" + loc
    };

    // Browser-sync task, only cares about compiled CSS
    gulp.task('browser-sync', function() {
        browserSync(serverInit);
    });
    // Reload all Browsers
    gulp.task('bs-reload', function() {
        browserSync.reload();
    });
    // gulp.task('watch', function() {
    //     gulp.watch(config.browsersync.watch).on('change', browserSync.reload);
    // });

    // gulp.task('default', ['watch'], function() {
    //     browserSync.init(serverInit);
    // });

    gulp.task('default', ['browser-sync'], function() {
        gulp.watch(config.browsersync.watch, function(file) {
            if (file.type === "changed") {
                reload(file.path);
            }
        });
        gulp.watch(config.browsersync.watch, ['bs-reload']);
    });


















    // gulp.task('watch', function() {
    //     gulp.watch(['dist/**/*.*', 'index.html']).on('change', reload);
    // });

    // // gulp.task('ts', function () {
    // // 	gulp.watch('src/**/*.ts', ['ts-compile'])
    // // })

    // // gulp.task('ts-compile', function () {
    // // 	return gulp.src('src/**/*.ts')
    // // 	.pipe(tsProject())
    // // 	.pipe(gulp.dest('dist'))
    // // })

    // gulp.task('default', ['watch', '*'], function() {
    //     browserSync.init(config);
    // });