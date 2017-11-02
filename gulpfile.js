var gulp = require('gulp'),
	cssimport = require("gulp-cssimport"),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	image = require('gulp-image');
	rigger = require('gulp-rigger'),
	pug = require('gulp-pug'),
	svgSprite = require('gulp-svg-sprite')
;
var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		js: 'build/js/',
		css: 'build/',
		img: 'build/images/',
		fonts: 'build/fonts/',
		html: 'build/',
		spriteSvgInline: 'build/'
	},
	src: { //Пути откуда брать исходники
		js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только global файлы
		style: 'src/style/*.scss',
		img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: 'src/fonts/**/*.*',
		sprite: 'src/sprite/*.*',
		spriteSvgInline: 'src/sprite-svg-inline/*.svg',
		pug: 'src/pug/*.pug'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.*',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		sprite: 'src/sprite/*.*',
		spritesvg: 'src/sprite-svg/*.svg',
		spriteSvgInline: 'src/sprite-svg-inline/*.svg',
		pug: 'src/pug/*.pug'
	}
};

//Tasks --- START ---
gulp.task('css:build', function () {
	gulp.src(path.src.style) //Выберем наш main.scss
	//.pipe(sourcemaps.init()) //То же самое что и с js
		.pipe(cssimport())
		.pipe(sass().on('error', sass.logError)) //Скомпилируем
		.pipe(prefixer('last 10 versions'))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css)); //И в build


	gulp.src( 'src/style/vendor/*.*' )
		.pipe( gulp.dest(path.build.css +'/vendor') )
	;
});
// Jade
gulp.task('pug:build', function(){
	gulp.src(path.src.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(path.build.html));
});
gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
	;
});
gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
	;
});
gulp.task('spriteSvgInline:build', function () {
	return gulp.src(path.src.spriteSvgInline)
		.pipe(svgSprite({
			'mode': {
				'symbol': {
					'dimentions': true,
					'dest': '',
					'sprite': '../images/sprite.svg',
					'bust': false,
					example: true
				}
			}
		}))
		.pipe(gulp.dest(path.build.img));
});
gulp.task('images:build', function () {
	gulp.src(path.src.img)
		.pipe(image())
		.pipe(gulp.dest(path.build.img));
});

//-----------------------------------------------

gulp.task('build', [
	'js:build',
	'css:build',
	'pug:build',
	'fonts:build',
	'images:build',
	'spriteSvgInline:build',
]);


gulp.task('watch', function(){
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('css:build');
	});
	watch([path.watch.pug], function(event, cb) {
		gulp.start('pug:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('images:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
	watch([path.watch.spriteSvgInline], function(event, cb) {
		gulp.start('spriteSvgInline:build');
	});
});

//это дефолт
gulp.task('default', ['build', 'watch']);