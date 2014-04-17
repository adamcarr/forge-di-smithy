/* jshint node: true */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    typescript: {
      src: {
        src: ['src/**/*.ts'],
        dest: 'build',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true,
          basePath: 'src',
          comments: false
        }
      },
      specs: {
        src: ['specs/**/*.ts'],
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          sourceMap: false,
          declaration: false,
          comments: false
        }
      }
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['specs/']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['typescript:src']);

  grunt.registerTask('test', ['typescript:specs', 'jasmine_node']);

  grunt.registerTask('default', ['typescript', 'jasmine_node']);
};
