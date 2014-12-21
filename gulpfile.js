var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),
    watchify = require( 'watchify' ),
    reactify = require( 'reactify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    assign = require( 'lodash-node/modern/objects/assign' ),
    gutil = require( 'gulp-util' ),
    less = require( 'gulp-less' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    rename = require( 'gulp-rename' ),
    livereload = require( 'gulp-livereload' );

/**
 * Task: `browserify`
 */
var bundler, rebundle;

rebundle = function() {
    return bundler
        .bundle()
        .on( 'error', gutil.log )
        .on( 'error', gutil.beep )
        .pipe( source( 'bundle.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( './public/js' ) );
};

gulp.task( 'browserify', function() {
    bundler = watchify( browserify(
        './client/index.jsx',
        assign({}, watchify.args, {
            debug: true,
            extensions: [ '.jsx' ]
        })
    ) );

    bundler.transform( reactify )

    return rebundle( bundler );
});

gulp.task( 'watchify',  function() {
    return bundler
        .on( 'update', rebundle )
        .on( 'update', gutil.log.bind( gutil, 'Watchify update' ) );
});

/**
 * Task: `less`
 * Convert LESS files to CSS
 */
gulp.task( 'less', function() {
    gulp.src([ 'assets/less/app.less' ])
        .pipe( less().on( 'error', gutil.log ).on( 'error', gutil.beep ) )
        .pipe( autoprefixer() )
        .pipe( rename( 'bundle.css' ) )
        .pipe( gulp.dest( 'public/css' ) );
});

/**
 * Task: `watch`
 * Watch files for changes
 */
gulp.task( 'watch', [ 'watchify' ], function() {
    // Compilation
    gulp.watch( 'assets/less/**/*.less', [ 'less' ]);

    // LiveReload
    var lr = livereload.listen( 35729 );
    gulp.watch([
        'public/css/bundle.css'
    ]).on( 'change', function( file ) {
        livereload.changed( file, lr );
    });
});

/**
 * Task: `build`
 * Performs only tasks necessary to build assets
 */
gulp.task( 'build', [ 'less', 'browserify' ]);

/**
 * Task: `default`
 * Default task optimized for development
 */
gulp.task( 'default', [ 'build', 'watch' ]);

/**
 * Task: `dev`
 * Alias for task `default`
 */
gulp.task( 'dev', [ 'default' ] );