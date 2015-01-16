var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),
    watchify = require( 'watchify' ),
    reactify = require( 'reactify' ),
    uglify = require( 'gulp-uglify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    assign = require( 'lodash-node/modern/objects/assign' ),
    gutil = require( 'gulp-util' ),
    less = require( 'gulp-less' ),
    csso = require( 'gulp-csso' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    rename = require( 'gulp-rename' ),
    livereload = require( 'gulp-livereload' ),
    template = require( 'gulp-template' ),
    React = require( 'react' ),
    manifest = require( './package' );

/**
 * Task: `browserify`
 */
var bundler, rebundle;

rebundle = function() {
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
    bundler = browserify(
        './client/index.jsx',
        assign({}, watchify.args, {
            debug: true,
            extensions: [ '.jsx' ]
        })
    );

    bundler.transform( reactify );

    return rebundle( bundler );
});

gulp.task( 'watchify', function() {
    bundler = watchify( bundler );

    return bundler
        .on( 'update', rebundle )
        .on( 'update', gutil.log.bind( gutil, 'Watchify update' ) );
});

/**
 * Task: `index`
 * Compiles Lodash templates into static HTML files
 */
gulp.task( 'index', function() {
    require( 'jsx-require-extension' );

    var App = require( './client/components/app' ),
        content = React.renderToString( React.createElement( App ) );

    gulp.src([ 'assets/index.tpl' ])
        .pipe( template({ manifest: manifest, content: content }) )
        .pipe( rename({ extname: '.html' }) )
        .pipe( gulp.dest( 'public' ) );
});

/**
 * Task: `vendor`
 * Copies vendor assets to public directory
 */
gulp.task( 'vendor', function() {
    gulp.src([ 'assets/components/fontawesome/fonts/*.*' ])
        .pipe( gulp.dest( 'public/fonts' ) );
});

/**
 * Task: `less`
 * Convert LESS files to CSS
 */
gulp.task( 'less', function() {
    var bundle = gulp.src([ 'assets/less/app.less' ])
        .pipe( less().on( 'error', gutil.log ).on( 'error', gutil.beep ) )
        .pipe( autoprefixer() )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) );

    if ( 'production' === process.env.NODE_ENV ) {
        bundle = bundle.pipe( csso() );
    }

    return bundle
        .pipe( rename({ basename: 'bundle-' + manifest.version }) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( 'public/css' ) );
});

/**
 * Task: `watch`
 * Watch files for changes
 */
gulp.task( 'watch', [ 'watchify' ], function() {
    // Compilation
    gulp.watch( 'assets/less/**/*.less', [ 'less' ]);
    gulp.watch( 'assets/index.tpl', [ 'index' ]);

    // LiveReload
    var lr = livereload.listen( 35729 );
    gulp.watch([
        'public/css/*.css'
    ]).on( 'change', function( file ) {
        livereload.changed( file, lr );
    });
});

/**
 * Task: `build`
 * Performs only tasks necessary to build assets
 */
gulp.task( 'build', [ 'vendor', 'less', 'browserify', 'index' ]);

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
