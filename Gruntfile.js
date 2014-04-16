module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    typescript: {
      server: {
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
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['typescript']);

};
