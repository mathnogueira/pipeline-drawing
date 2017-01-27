(function() {
	'use strict';

	const gulp		= require('gulp');
	const pug		= require('gulp-pug');
	const less		= require('gulp-less');
	const jshint	= require('gulp-jshint');
	const babel		= require('gulp-babel');
	const sequence	= require('run-sequence');
	const stylish	= require('jshint-stylish');
	const watch		= require('gulp-watch');

	gulp.task('build', build);
	gulp.task('pug', compilarPug);
	gulp.task('less', compilarLess);
	gulp.task('jshint', executarJsHint);
	gulp.task('babel', transpilarJavascript);
	gulp.task('watch-pug', vigiarPug);
	gulp.task('watch-less', vigiarLess);
	gulp.task('watch-js', vigiarJs);
	gulp.task('watch', ['watch-pug', 'watch-less', 'watch-js']);

	function build() {
		sequence('pug', 'less', 'jshint', 'babel');
	}

	function compilarPug() {
		return gulp
			.src('src/**/*.pug')
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest('dist'));
	}

	function compilarLess() {
		return gulp
			.src('src/style/style.less')
			.pipe(less())
			.pipe(gulp.dest('dist/style'));
	}

	function executarJsHint() {
		return gulp
			.src('src/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(jshint.reporter('fail'));
	}

	function transpilarJavascript() {
		return gulp
			.src('src/**/*.js')
			.pipe(babel())
			.pipe(gulp.dest('dist'));
	}

	function vigiarPug() {
		return watch('src/**/*.pug', compilarPug);	
	}

	function vigiarLess() {
		return watch('src/**/*.less', compilarLess);
	}

	function vigiarJs() {
		return watch('src/**/*.js', () => {
			sequence('jshint', 'babel');
		});
	}

})();