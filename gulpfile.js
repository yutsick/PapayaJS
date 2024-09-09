// *************************************************************************************** //
// ********************* Список подключенных модулей (плагинов) Gulp ********************* //
// *************************************************************************************** //

// Собственно сам Gulp
const gulp = require('gulp');

// Модуль (плагин) для очистки директории
const cleans = require('del');

// Модуль (плагин) для конкатенации (объединения файлов)
const concat = require('gulp-concat');

// Модуль (плагин) для очистки и минификации файлов CSS
const cleanCSS = require('gulp-clean-css');

// Модуль (плагин) для очистки и минификации файлов JS
const uglify = require('gulp-uglify-es').default;

// Модуль (плагин) для расстановки автопрефиксов в CSS
const autoprefixer = require('gulp-autoprefixer');

// Модуль (плагин) для отслеживания изменений в файлах
const browserSync = require('browser-sync').create();

// Модуль (плагин) для вставки темплейтов
const rigger = require('gulp-rigger');

const pug = require('gulp-pug');

// Модуль (плагин) для sass
const sass = require('gulp-sass')(require('sass'));

// *************************************************************************************** //
// ************************************** Константы ************************************** //
// *************************************************************************************** //

// Получаем список файлов CSS и определяем их порядок подключения
const cssFiles = [
    './src/css/**/*.css',
    './src/css/*.css'
];

const scssFiles = [
    './src/scss/**/*.scss',
    './src/scss/*.scss'
];

// Получаем список файлов JS и определяем их порядок подключения
const jsFiles = [
    './src/js/**/*.js',
    './src/js/*.js'
];

// Получаем список файлов для копирования
const src = {
    copy_files: [
        'src/fonts/*'
    ],
};

// Получаем список файлов для отслеживания изменения HTML
const htmlFiles = [
    './src/*.html'
];


// *************************************************************************************** //
// *************************************** Функции *************************************** //
// *************************************************************************************** //

// Функция для работы с файлами SCSS
function scssStyles() {
    return gulp.src(scssFiles)

        //Минификация CSS
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))

        // Копирование CSS в папку assets
        .pipe(gulp.dest('./src/css'))
}

// Функция на стили CSS
function styles() {

    return gulp.src(cssFiles)

        // Добавить префиксы
        .pipe(autoprefixer({
            // browsers: ['last 2 versions'],
            cascade: false
        }))

        // Минификация CSS
        .pipe(cleanCSS({
            level: 2
        }))

        // Копирование CSS в папку build
        .pipe(gulp.dest('./build/css'))

        // Отслеживания изменения CSS
        .pipe(browserSync.stream())
}

function devStyles() {

    return gulp.src(cssFiles)

        // Копирование CSS в папку build
        .pipe(gulp.dest('./build/css'))
}

// Функция на скрипты JS
function scripts() {
    return gulp.src(jsFiles)

        // Конкатенация (Объединения) файлов JS
        // .pipe(concat('script.js'))

        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))

        // Копирование JS в папку build
        .pipe(gulp.dest('./build/js'))

        // Отслеживания изменения JS
        .pipe(browserSync.stream())
}

// Функция на файлы HTML
function files() {
    return gulp.src(htmlFiles)
        // Прогоним через rigger
        .pipe(rigger())

        // Копирование HTML в папку build
        .pipe(gulp.dest('./build/'))
}

// Функция на файлы PUG
function pugFiles() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
}

// Функция для работы с файлами img
function copy_img() {
    return gulp.src('./src/img/*')
        // Копирование img в папку assets
        .pipe(gulp.dest('./build/img'))
}


// Удалить всё в указанной папке
function clean() {
    return cleans(['build/*'])
}


// Просматривать файлы
function watch() {
    // Инициализация сервера
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    // Следить за SCSS файлами
    gulp.watch('./src/scss/**/*.scss', gulp.series(scssStyles, styles));

    // Следить за CSS файлами
    // gulp.watch('./src/css/**/*.css', styles);

    // Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts);

    // Следить за файлами img
    gulp.watch('./src/img/**/*', copy_img);

    // Следить за HTML файлами
    gulp.watch("./src/*.html", files);
    gulp.watch("./src/**/*.html", files);

    //Следить за pug файлами
    gulp.watch("./src/pug/*.pug", pugFiles);
    gulp.watch("./src/pug/**/*.pug", pugFiles);

    // При изменении HTML запустить синхронизацию
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
    gulp.watch("./src/pug/*.pug").on('change', browserSync.reload);
    gulp.watch("./src/pug/**/*.pug").on('change', browserSync.reload);
}


// *************************************************************************************** //
// **************************************** Таски **************************************** //
// *************************************************************************************** //

// Таск для Копирования картинок
gulp.task('img', function () {
    return gulp.src(['src/img/*', 'src/img/**/*'])
        .pipe(gulp.dest('build/img'))
})

// Таск вызывающий функцию styles
gulp.task('styles', styles);
gulp.task('devStyles', devStyles);

// Таск вызывающий функцию styles
gulp.task('sass', scssStyles);

// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск для очистки папки build
gulp.task('cleans', clean);

// Таск для Копирования htaccess
gulp.task('htaccess', function () {
    return gulp.src('src/.htaccess')
        .pipe(gulp.dest('build'))
})

// Таск для Копирования favicon
gulp.task('favicon', function () {
    return gulp.src('src/favicon.*')
        .pipe(gulp.dest('build'))
})

// Таск для копирование файлов в build
gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest(function (file) {
            let path = file.base;
            return path.replace('src', 'build');
        }));
});

gulp.task('pug', function () {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
})

// Таск для отслеживания изменений
gulp.task('watch', watch);

// Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, files, scssStyles, gulp.parallel(styles, scripts, "img", "htaccess", "favicon", "fonts", "pug")));

// Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'));