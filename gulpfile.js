// gulpfile.js

const { src, dest, watch, series } = require("gulp");
const sass         = require("gulp-sass")(require("sass"));
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS     = require("gulp-clean-css");
const browserSync  = require("browser-sync").create();
const plumber      = require("gulp-plumber");
const del          = require("del");
const pug          = require("gulp-pug");
const concat       = require("gulp-concat");
const uglify       = require("gulp-uglify");
const sourcemaps   = require("gulp-sourcemaps");
const ghPages      = require("gulp-gh-pages");

// Очистка dist
function clean() {
  return del(["dist"]);
}

// SCSS → CSS
function styles() {
  return src("assets/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer({ overrideBrowserslist: ["last 2 versions"], cascade: false })
    ]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

// Pug → HTML
function compilePug() {
  return src("templates/**/*.pug")
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// JS: об'єднання + мініфікація
function scripts() {
  return src("assets/js/**/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

// Сервер + слідкування
function serve() {
  browserSync.init({ server: "./dist" });
  watch("assets/scss/**/*.scss", styles);
  watch("templates/**/*.pug", compilePug);
  watch("assets/js/**/*.js", scripts);
}

// Деплой на GitHub Pages
function deploy() {
  return src("./dist/**/*")
    .pipe(ghPages({
      remoteUrl: "https://Kuwuwuwu.github.io/HW_Gulp",
      branch: "gh-pages",
      message: "Deploy via gulp-gh-pages"
    }));
}

// Експорти завдань
exports.clean   = clean;
exports.styles  = styles;
exports.pug     = compilePug;
exports.scripts = scripts;
exports.deploy  = deploy;
exports.build   = series(clean, styles, compilePug, scripts);
exports.serve   = series(exports.build, serve);
exports.default = exports.build;