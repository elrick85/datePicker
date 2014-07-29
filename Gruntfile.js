/*global module:false*/
module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');
	grunt.log.writeln([pkg.name]);

	  // Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: pkg
		,banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		  '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		  '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
		  '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
		  ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
		// Task configuration.
		,concat: {
			dist: {
				src: ["datePicker.js","app.js"],
				dest: "dest/bb_calendar.js"
			}
		}
		,uglify: {
			my_target: {
				files: {
					'dest/bb_calendar.min.js': ['dest/bb_calendar.js']
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  
	// Default task.
	grunt.registerTask('default', ['concat', 'uglify']);
};
