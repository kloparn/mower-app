# mower-app

Intelligent mobile systems application

# IMPORTANT

If the metro server does not start, do this: \
go to : '\node_modules\metro-config\src\defaults\blacklist.js'

then upgade the _sharedBlacklist_ variable to ->

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

There might also be a key issue, then you do this in side \android\app
-> keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

If error: character 'E' = 69
REGENERATE KEYS LIKE ABOVE
(remove in some weird file android\app\build\intermediates\signing_config\debug\out)
