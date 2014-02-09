// Generated on 2014-02-09 using generator-easyvideo 0.0.3
'use strict';

var crypto = require('crypto');

module.exports = function(grunt) {

    // paths used in our tasks
    var tmpFolder = '.tmp/';

    // src assets
    var srcVideos = 'assets/videos/';

    // publish location
    var targetVideos = 'dist/videos/',
        targetVideoPosters = targetVideos;

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        clean: {
            tmp: {
                expand: true,
                cwd: tmpFolder,
                src: ['**/*.*']
            }
        },

        responsive_videos: {
            webm1: {
                options: {
                    sizes: [{
                        width: 300,
                        poster: false
                    }],
                    encodes: [{
                        webm: [
                            {'-vcodec': 'libvpx'},
                            {'-acodec': 'libvorbis'},
                            {'-crf': '12'},
                            {'-q:a': '100'},
                            {'-threads': '0'}
                        ]
                    }]
                },
                files: [{
                    expand: true,
                    src: 'cappadocia.mp4',
                    cwd: srcVideos,
                    dest: tmpFolder+'test1'
                }]
            },
            webm2: {
                options: {
                    sizes: [{
                        width: 300,
                        poster: false
                    }],
                    encodes: [{
                        webm: [
                            {'-vcodec': 'libvpx'},
                            {'-acodec': 'libvorbis'},
                            {'-crf': '12'},
                            {'-q:a': '100'},
                            {'-threads': '0'}
                        ]
                    }]
                },
                files: [{
                    expand: true,
                    src: 'cappadocia.mp4',
                    cwd: srcVideos,
                    dest: tmpFolder+'test2'
                }]
            }
        },

        copy: {
            projectVideos: {
                files: [{
                    expand: true,
                    cwd: tmpFolder,
                    src: ['**/*.{webm,mp4}'],
                    dest: targetVideos
                }]
            }
        },
    });

    grunt.registerTask('checksum', 'Check checksums', function(){
        grunt.log.writeln('Encode 1: ' + crypto.createHash('md5').update(grunt.file.read(targetVideos+'test1/cappadocia-300.webm')).digest('hex'));
        grunt.log.writeln('Encode 2: ' + crypto.createHash('md5').update(grunt.file.read(targetVideos+'test2/cappadocia-300.webm')).digest('hex'));
    });

    grunt.registerTask('videos', 'Generate videos from source files in ' + srcVideos, [
        'responsive_videos',
        'copy',
        'clean',
        'checksum'
    ]);

    // Default task.
    grunt.registerTask('default', ['videos']);
};
