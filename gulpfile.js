var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    source = require( 'vinyl-source-stream' ),
    watchify = require( 'watchify' ),
    reactify = require( 'reactify' ),
    assign = require( 'lodash-node/modern/objects/assign' ),
    gutil = require( 'gulp-util' ),
    less = require( 'gulp-less' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    rename = require( 'gulp-rename' ),
    livereload = require( 'gulp-livereload' );

/**
 * Task: `browserify`
 */
var rebundle = function( bundler ) {
    return bundler
        .transform( reactify )
        .bundle()
        .on( 'error', gutil.log )
        .on( 'error', gutil.beep )
        .pipe( source( 'bundle.js' ) )
        .pipe( gulp.dest( './public/js' ) );
};

gulp.task( 'browserify', function() {
    var bundler = browserify( './client/index.jsx', { extensions: [ '.jsx' ] });
    return rebundle( bundler );
});

/**
 * Task: `watchify`
 */
gulp.task( 'watchify',  function() {
    var bundler = watchify( browserify(
        './client/index.jsx',
        assign({}, watchify.args, {
            extensions: [ '.jsx' ]
        })
    ) );

    bundler.transform( 'reactify' );

    bundler
        .on( 'update', rebundle.bind( this, bundler ) )
        .on( 'update', gutil.log.bind( gutil, 'Watchify update' ) );

    return rebundle( bundler );
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
gulp.task( 'watch', function() {
    // Compilation
    gulp.watch( 'assets/less/**/*.less', [ 'less' ]);
    gulp.watch([ 'client/**/*.js', 'client/**/*.jsx' ], [ 'browserify' ]);

    // LiveReload
    var lr = livereload.listen( 35730 );
    gulp.watch([
        'public/css/app.css'
    ]).on( 'change', function( file ) {
        livereload.changed( file, lr );
    });
});

/**
 * Task: `default`
 * Default task optimized for development
 */
gulp.task( 'default', [ 'less', 'browserify', 'watch' ]);

/**
 * Task: `dev`
 * Alias for task `default`
 */
gulp.task( 'dev', [ 'default' ] );