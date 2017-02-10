(function() {
	"use strict";

	const gulp		= require("gulp");
	const pug		= require("gulp-pug");
	const less		= require("gulp-less");
	const jshint	= require("gulp-jshint");
	const babel		= require("gulp-babel");
	const sequence	= require("run-sequence");
	const stylish	= require("jshint-stylish");
	const watch		= require("gulp-watch");
	const debug		= require("gulp-debug");
	const useref	= require("gulp-useref");
	const browserify= require("gulp-browserify");
	const babelify 	= require("babelify");
	const ts		= require("gulp-typescript");

	gulp.task("build", build);
	gulp.task("pug", compilarPug);
	gulp.task("less", compilarLess);
	gulp.task("jshint", executarJsHint);
	gulp.task("babel", transpilarJavascript);
	gulp.task("watch-pug", vigiarPug);
	gulp.task("watch-less", vigiarLess);
	gulp.task("watch-js", vigiarJs);
	gulp.task("watch", ["watch-pug", "watch-less", "watch-js"]);
	gulp.task("useref", executarUseref);
	gulp.task("browserify", runBundle);
	gulp.task("bundleTs", bundleTs);
	gulp.task("bundle", bundle);
	gulp.task("typescript", compilarTypescript);

	function build() {
		sequence("pug", "less", "typescript", "useref", "browserify");
	}

	function compilarPug() {
		return gulp
			.src("src/**/*.pug")
			.pipe(debug())
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest("build"));
	}

	function compilarLess() {
		return gulp
			.src("src/style/style.less")
			.pipe(debug())
			.pipe(less())
			.pipe(gulp.dest("build/style"));
	}

	function executarJsHint() {
		return gulp
			.src("src/**/*.js")
			.pipe(debug())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(jshint.reporter("fail"));
	}

	function compilarTypescript() {
		let tsReturn = gulp
			.src("src/ts/**/*.ts")
			.pipe(debug())
			.pipe(ts({
				// out: "core.js",
				module: "es2015",
			}));

		return tsReturn.js.pipe(gulp.dest("src/out/"));
	}

	function transpilarJavascript() {
		return gulp
			.src("src/out/**/*.js")
			.pipe(debug())
			.pipe(babel())
			.pipe(gulp.dest("src/out/"));
	}

	function vigiarPug() {
		return watch("src/**/*.pug", compilarPug);	
	}

	function vigiarLess() {
		return watch("src/**/*.less", compilarLess);
	}

	function vigiarJs() {
		return watch("src/**/*.js", () => {
			sequence("jshint", "browserify");
		});
	}

	function executarUseref() {
		return gulp
			.src("build/index.html")
			.pipe(useref())
			.pipe(gulp.dest("dist/"));
	}

	function bundle() {
		return gulp
			.src(["src/out/app.js"])
			.pipe(browserify({
				transform: [["babelify"]]
			}))
			.pipe(gulp.dest("build/js/"));
	}

	function bundleTs() {
		return gulp
			.src(["src/ts/**/*.ts"])
			.pipe(browserify({
				extensions: "js",
				transform: [["deamdify"]]
			}))
			.pipe(gulp.dest("build/js/"));
	}

	function runBundle() {
		sequence("bundle");
	}

})();