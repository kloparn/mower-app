# mower-app
Intelligent mobile systems application

# IMPORTANT

If the metro server does not start, do this: \
go to : '\node_modules\metro-config\src\defaults\blacklist.js'

then upgade the *sharedBlacklist* variable to ->

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];


