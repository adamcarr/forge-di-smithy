/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    ts: {
      src: {
        src: ["src/index.ts"],
        outDir: "build",
        options: {
          target: "ES5",
          module: 'commonjs',
          declaration: true
        }
      },
      specs: {
        src: ["specs/**/*.ts"],
        outDir: "specsOut/",
        options: {
          target: "ES5",
          module: 'commonjs'
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
      all: ['specsOut/']
    },
    
    dtsGenerator: {
        options: {
            name: '<%= pkg.name %>',
            baseDir: './build/',
            out: '<%= pkg.name %>.d.ts',
            main:  '<%= pkg.name %>/index'
        },
        default: {
            src: [ './build/index.d.ts' ]
        }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('dts-generator');

  grunt.registerTask('build', ['ts:src', 'dtsGenerator']);

  grunt.registerTask('test', ['ts:specs', 'jasmine_node']);

  grunt.registerTask('default', ['ts', 'jasmine_node', 'dtsGenerator']);
};
