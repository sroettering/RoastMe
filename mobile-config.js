App.info({
  id: 'com.iqdev.itsroastme',
  version: '0.8.0',
  name: 'RoastMe',
  description: 'Enjoy funny roasts of other people',
  author: 'IQ Development',
  email: 'Info@iq-dev.com',
  website: 'www.iq-dev.com',
});

App.setPreference('Orientation', 'portrait');

App.icons({
  'iphone_2x': 'mobile/icons/ios/Icon-App-60x60@2x.png',
  'iphone_3x': 'mobile/icons/ios/Icon-App-60x60@3x.png',
  'ipad': 'mobile/icons/ios/Icon-App-76x76@1x.png',
  'ipad_2x': 'mobile/icons/ios/Icon-App-76x76@2x.png',
  'ipad_pro': 'mobile/icons/ios/Icon-App-83.5x83.5@2x.png',
  'ios_settings': 'mobile/icons/ios/Icon-App-29x29@1x.png',
  'ios_settings_2x': 'mobile/icons/ios/Icon-App-29x29@2x.png',
  'ios_settings_3x': 'mobile/icons/ios/Icon-App-29x29@3x.png',
  'ios_spotlight': 'mobile/icons/ios/Icon-App-40x40@1x.png',
  'ios_spotlight_2x': 'mobile/icons/ios/Icon-App-40x40@2x.png',
  'android_mdpi': 'mobile/icons/android/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'mobile/icons/android/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'mobile/icons/android/mipmap-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'mobile/icons/android/mipmap-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'mobile/icons/android/mipmap-xxxhdpi/ic_launcher.png',
});

App.launchScreens({
  'iphone_2x': 'mobile/launchscreens/ios/Default@2x.png', //(640x960)
  'iphone5': 'mobile/launchscreens/ios/Default-568h@2x.png', //(640x1136)
  'iphone6': 'mobile/launchscreens/ios/Default-667h@2x.png', //(750x1334)
  'iphone6p_portrait': 'mobile/launchscreens/ios/Default-Portrait-736h@3x.png', //(1242x2208)
  'iphone6p_landscape': 'mobile/launchscreens/ios/Default-Landscape-736h@3x.png', //(2208x1242)
  'ipad_portrait': 'mobile/launchscreens/ios/Default-Portrait.png', //(768x1024)
  'ipad_portrait_2x': 'mobile/launchscreens/ios/Default-Portrait@2x.png', //(1536x2048)
  'ipad_landscape': 'mobile/launchscreens/ios/Default-Landscape.png', //(1024x768)
  'ipad_landscape_2x': 'mobile/launchscreens/ios/Default-Landscape@2x.png', //(2048x1536)
  'android_mdpi_portrait': 'mobile/launchscreens/android/RoastMe1.png', //(320x470)
  'android_mdpi_landscape': 'mobile/launchscreens/android/RoastMe2.png', //(470x320)
  'android_hdpi_portrait': 'mobile/launchscreens/android/RoastMe3.png', //(480x640)
  'android_hdpi_landscape': 'mobile/launchscreens/android/RoastMe4.png', //(640x480)
  'android_xhdpi_portrait': 'mobile/launchscreens/android/RoastMe5.png', //(720x960)
  'android_xhdpi_landscape': 'mobile/launchscreens/android/RoastMe6.png', //(960x720)
  'android_xxhdpi_portrait': 'mobile/launchscreens/android/RoastMe7.png', //(1080x1440)
  'android_xxhdpi_landscape': 'mobile/launchscreens/android/RoastMe8.png', //(1440x1080)
});

App.accessRule('http://www.roastme.iq-dev.com');
App.accessRule('https://www.itsroast.me');
App.accessRule('https://itsroastme.s3-eu-central-1.amazonaws.com');
App.accessRule('https://www.google-analytics.com');
App.accessRule('https://scontent.xx.fbcdn.net');
App.accessRule('https://enginex.kadira.io/simplentp/sync');
App.accessRule('data:https://cdn.materialdesignicons.com/1.7.22/css/materialdesignicons.min.css');
App.accessRule('data:https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');

App.configurePlugin('cordova-plugin-googleplus', {
  REVERSED_CLIENT_ID: 'com.googleusercontent.apps.476899950105-b5s883fnbesj4bsri8vgj1pl6iroigji'
});

App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '239459316485267',
  API_KEY: '7bdd29d4127f7f92dfa5cfbf9584a245'
});
