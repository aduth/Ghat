var gulp = require( 'gulp' ),
    gutil = require( 'gulp-util' ),
    rename = require( 'gulp-rename' ),
    manifest = require( './package' );

/**
 * Browserify
 *
 * Compiles JavaScript source into a single bundle file using Browserify and
 * related transforms. Includes sourcemaps and minification if compiled in a
 * production environment.
 */
var browserify = require( 'browserify' ),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),
    watchify = require( 'watchify' ),
    reactify = require( 'reactify' ),
    envify = require( 'envify/custom' ),
    uglify = require( 'gulp-uglify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    assign = require( 'lodash/object/assign' ),
    config = require( './config' ),
    bundler, rebundle;

rebundle = function() {
    if ( ! bundler ) {
        bundler = browserify(
            './client/index.jsx',
            assign({}, watchify.args, {
                debug: true,
                extensions: [ '.jsx' ]
            })
        );

        bundler.transform( reactify );
        bundler.transform( envify({
            ORIGIN: config.origin
        }) );
    }

    var bundle = bundler
        .bundle()
        .on( 'error', gutil.log )
        .on( 'error', gutil.beep )
        .pipe( source( 'bundle.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) );

    if ( 'production' === process.env.NODE_ENV ) {
        bundle = bundle.pipe( uglify() );
    }

    return bundle
        .pipe( rename({ suffix: '-' + manifest.version }) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( 'public/js' ) );
};

gulp.task( 'browserify', function() {
    return rebundle();
});

gulp.task( 'watchify', function() {
    rebundle();

    bundler = watchify( bundler );

    return bundler
        .on( 'update', rebundle )
        .on( 'update', gutil.log.bind( gutil, 'Watchify update' ) );
});

/**
 * Templates
 *
 * Compiles Lodash templates into static HTML files, injecting content from the
 * React app rendered as a string.
 */
var template = require( 'gulp-template' ),
    React = require( 'react' ),
    getAppContent;

getAppContent = function() {
    require( 'jsx-require-extension' );

    var App = require( './client/components/app' ),
        storesHelper = require( './shared/helpers/stores' );

    return React.renderToString( React.createElement( App, storesHelper.getInstances() ) );
};

gulp.task( 'templates', function() {
    gulp.src([ 'assets/index.tpl' ])
        .pipe( template({
            manifest: manifest,
            constants: require( './shared/constants/' ),
            content: getAppContent()
        }) )
        .pipe( rename({ extname: '.html' }) )
        .pipe( gulp.dest( 'public' ) );
});

/**
 * Vendor
 *
 * Copies vendor assets to public directory.
 */
gulp.task( 'vendor', function() {
    gulp.src([ 'assets/components/fontawesome/fonts/*.*' ])
        .pipe( gulp.dest( 'public/fonts' ) );
});

/**
 * LESS
 *
 * Converts LESS files to a single CSS bundle, minifying the bundle if compiled
 * in a production environment.
 */
var less = require( 'gulp-less' ),
    csso = require( 'gulp-csso' ),
    autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'less', function() {
    var bundle = gulp.src([ 'assets/less/app.less' ])
        .pipe( less().on( 'error', gutil.log ).on( 'error', gutil.beep ) )
        .pipe( autoprefixer() );

    if ( 'production' === process.env.NODE_ENV ) {
        bundle = bundle.pipe( csso() );
    }

    return bundle
        .pipe( rename({ basename: 'bundle-' + manifest.version }) )
        .pipe( gulp.dest( 'public/css' ) );
});

/**
 * Watch
 *
 * Watches files for changes, triggering build tasks when files are changed.
 */
var livereload = require( 'gulp-livereload' );

gulp.task( 'watch', [ 'watchify' ], function() {
    // Compilation
    gulp.watch( 'assets/less/**/*.less', [ 'less' ]);
    gulp.watch( 'assets/index.tpl', [ 'templates' ]);

    // LiveReload
    var lr = livereload.listen( 35729 );
    gulp.watch([
        'public/css/*.css'
    ]).on( 'change', function( file ) {
        livereload.changed( file, lr );
    });
});

/**
 * Mocha
 *
 * Runs the Mocha test suite and ends the process with a failing exit status if
 * an error is encountered.
 */
var mocha = require( 'gulp-mocha' );

gulp.task( 'mocha', function() {
    return gulp.src( 'test/index.js' )
        .pipe( mocha() );
});

/**
 * Lint
 *
 * Detects JSHint style and usage issues in the JavaScript source, ending the
 * process with a failing exit status if an error is encountered.
 */
var jshint = require( 'gulp-jshint' ),
    react = require( 'gulp-react' );

gulp.task( 'lint', function() {
    return gulp.src( './{client,shared,server}/**/*.{js,jsx}' )
        .pipe( react() )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) )
        .pipe( jshint.reporter( 'fail' ) );
});

/**
 * Test
 *
 * Runs both the `lint` and `mocha` tasks, exiting with a failing status if an
 * error is encountered.
 */
gulp.task( 'test', [ 'lint', 'mocha' ]);

/**
 * Build
 *
 * Performs tasks necessary to build all application assets.
 */
gulp.task( 'build', [ 'vendor', 'less', 'browserify', 'templates' ]);

/**
 * Default, Development
 *
 * Development task, trigger a build then immediately watching for changes.
 */
gulp.task( 'default', [ 'build', 'watch' ]);
gulp.task( 'dev', [ 'default' ] );
