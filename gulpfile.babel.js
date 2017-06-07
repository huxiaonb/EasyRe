import gulp from 'gulp'
import connect from 'gulp-connect'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import run from 'run-sequence'
import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'


gulp.task('webpack-watch', () => {
    webpack(webpackConfig).watch({
        aggregateTimeout: 300
    }, (err, stats) => {
        console.log(stats.toString({
            colors: true,
            chunks: false
        }))
    });
})
gulp.task('webpack-build', () => {
    webpack(webpackConfig).run((err, stats) => {
        console.log(stats.toString({
            colors: true,
            chunks: false
        }))
        console.log('lego build success!!')
    })
})
gulp.task('demo-server', () => {
    connect.server({
        root: './',
        port: 80
    })
})

gulp.task('watch-lib', () => {

    let timeout;
    let runcopy = () => {}
    gulp.watch('./dist/*.js', (e) => {
        clearTimeout(timeout)
        timeout = setTimeout(runcopy, 500);
    })
})

// gulp.task('minify-lib', () => {
//     gulp.src('./dist/lego.js')
//         .pipe(uglify())
//         .pipe(rename('lego.min.js'))
//         .pipe(gulp.dest('./dist'))
// })



gulp.task('dev', ['webpack-watch'])

gulp.task('build', ['webpack-build'])