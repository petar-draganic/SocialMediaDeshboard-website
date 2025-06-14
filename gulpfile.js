const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

function browserSyncServe(cb) {
  browsersync.init({
    server: { baseDir: "." },
    notify: { styles: { top: "auto", bottom: "0" } },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch("*.html", browserSyncReload);
  // **VAŽNO:** vraćamo watch emitter da Gulp zna da task traje
  return watch(
    ["app/scss/**/*.scss", "app/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

exports.build = series(scssTask, jsTask);
