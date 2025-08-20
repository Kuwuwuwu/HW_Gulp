const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const del = require('del');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Очистка dist
function clean() {
    return del(['dist']);
}

// SCSS → CSS
function styles() {
    return gulp.src('assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // важливо: обробка помилки
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false })]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// Pug → HTML
function compilePug() {
    return gulp.src('templates/*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// JS: объединение + минификация
function scripts() {
    return gulp.src('assets/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// Сервер + вотчинг
function serve(done) {
    browserSync.init({ server: './dist' });
    gulp.watch('assets/scss/**/*.scss', styles);
    gulp.watch('templates/**/*.pug', compilePug);
    gulp.watch('assets/js/**/*.js', scripts);
    done(); // сигнал завершення
}

const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      message: 'Deploy via gulp',
      user: {
        name: 'Marharyta',
        email: 'nasty22kot@gmail.com'
      }
    }));
});


// Экспорт задач
exports.clean = clean;
exports.styles = styles;
exports.pug = compilePug;
exports.scripts = scripts;
exports.serve = gulp.series(clean, styles, compilePug, scripts, serve);
exports.build = gulp.series(clean, styles, compilePug, scripts);