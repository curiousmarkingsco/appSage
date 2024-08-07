/*

  media.js

  This file is some syntax sugar for adding placeholder media.
  See `app/placeholder_media/README.md` for more info.

*/

/*

Examples:

   pageSagePlaceholderMedia['photo_square']
=> './placeholder_media/square.jpg'

   pageSagePlaceholderMedia['video']
=> './placeholder_media/video.mp4'

   randomImage()
=> './placeholder_media/square.jpg'

   randomMedia()
=> './placeholder_media/audio.mp3'

*/

// Global variable — These paths are relative to the HTML page loading them, not this file.
var pageSagePlaceholderMedia = {
  "audio": './placeholder_media/audio.mp3',
  "video": './placeholder_media/video.mp4',
  "photo_avatar_darkmode_jpg": './placeholder_media/darkmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_darkmode_jpg": './placeholder_media/darkmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_darkmode_jpg": './placeholder_media/darkmode_jpg/landscape_placeholder.jpg',
  "photo_logo_darkmode_jpg": './placeholder_media/darkmode_jpg/logo_placeholder.jpg',
  "photo_portrait_darkmode_jpg": './placeholder_media/darkmode_jpg/portrait_placeholder.jpg',
  "photo_square_darkmode_jpg": './placeholder_media/darkmode_jpg/square_placeholder.jpg',
  "photo_avatar_darkmode_png": './placeholder_media/darkmode_png/avatar_placeholder.png',
  "photo_iframe_darkmode_png": './placeholder_media/darkmode_png/iframe_placeholder.png',
  "photo_landscape_darkmode_png": './placeholder_media/darkmode_png/landscape_placeholder.png',
  "photo_logo_darkmode_png": './placeholder_media/darkmode_png/logo_placeholder.png',
  "photo_portrait_darkmode_png": './placeholder_media/darkmode_png/portrait_placeholder.png',
  "photo_square_darkmode_png": './placeholder_media/darkmode_png/square_placeholder.png',
  "photo_avatar_darkmode_svg": './placeholder_media/darkmode_svg/avatar_placeholder.svg',
  "photo_iframe_darkmode_svg": './placeholder_media/darkmode_svg/iframe_placeholder.svg',
  "photo_landscape_darkmode_svg": './placeholder_media/darkmode_svg/landscape_placeholder.svg',
  "photo_logo_darkmode_svg": './placeholder_media/darkmode_svg/logo_placeholder.svg',
  "photo_portrait_darkmode_svg": './placeholder_media/darkmode_svg/portrait_placeholder.svg',
  "photo_square_darkmode_svg": './placeholder_media/darkmode_svg/square_placeholder.svg',
  "photo_avatar_lightmode_jpg": './placeholder_media/lightmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_lightmode_jpg": './placeholder_media/lightmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_lightmode_jpg": './placeholder_media/lightmode_jpg/landscape_placeholder.jpg',
  "photo_logo_lightmode_jpg": './placeholder_media/lightmode_jpg/logo_placeholder.jpg',
  "photo_portrait_lightmode_jpg": './placeholder_media/lightmode_jpg/portrait_placeholder.jpg',
  "photo_square_lightmode_jpg": './placeholder_media/lightmode_jpg/square_placeholder.jpg',
  "photo_avatar_lightmode_png": './placeholder_media/lightmode_png/avatar_placeholder.png',
  "photo_iframe_lightmode_png": './placeholder_media/lightmode_png/iframe_placeholder.png',
  "photo_landscape_lightmode_png": './placeholder_media/lightmode_png/landscape_placeholder.png',
  "photo_logo_lightmode_png": './placeholder_media/lightmode_png/logo_placeholder.png',
  "photo_portrait_lightmode_png": './placeholder_media/lightmode_png/portrait_placeholder.png',
  "photo_square_lightmode_png": './placeholder_media/lightmode_png/square_placeholder.png',
  "photo_avatar_lightmode_svg": './placeholder_media/lightmode_svg/avatar_placeholder.svg',
  "photo_iframe_lightmode_svg": './placeholder_media/lightmode_svg/iframe_placeholder.svg',
  "photo_landscape_lightmode_svg": './placeholder_media/lightmode_svg/landscape_placeholder.svg',
  "photo_logo_lightmode_svg": './placeholder_media/lightmode_svg/logo_placeholder.svg',
  "photo_portrait_lightmode_svg": './placeholder_media/lightmode_svg/portrait_placeholder.svg',
  "photo_square_lightmode_svg": './placeholder_media/lightmode_svg/square_placeholder.svg'
}

// Keep in mind this does not output video or audio. If you want that, see
// the randomMedia() function.
// DATA IN: null
function randomImage() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = darkmodeOptions.concat(lightmodeOptions);
  const result = options[Math.floor(Math.random() * options.length)];
  return pageSagePlaceholderMedia[result];
} // DATA OUT: String

// For some apps like with user-generated content, they could be posting not
// just images, but other media. This is a good way for the designer to battle
// test their layout under these conditions.
// DATA IN: null
function randomMedia() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = [
    'audio',
    'video',
    ...darkmodeOptions,
    ...lightmodeOptions
  ];

  const result = options[Math.floor(Math.random() * options.length)];
  return pageSagePlaceholderMedia[result];
} // DATA OUT: String

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderDarkmodeOptions() {
  return [
    'photo_landscape_darkmode_jpg',
    'photo_square_darkmode_jpg',
    'photo_portrait_darkmode_jpg',
    'photo_landscape_darkmode_png',
    'photo_square_darkmode_png',
    'photo_portrait_darkmode_png',
    'photo_landscape_darkmode_svg',
    'photo_square_darkmode_svg',
    'photo_portrait_darkmode_svg'
  ];
} // DATA OUT: Array

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderLightmodeOptions() {
  return [
    'photo_landscape_lightmode_jpg',
    'photo_square_lightmode_jpg',
    'photo_portrait_lightmode_jpg',
    'photo_landscape_lightmode_png',
    'photo_square_lightmode_png',
    'photo_portrait_lightmode_png',
    'photo_landscape_lightmode_svg',
    'photo_square_lightmode_svg',
    'photo_portrait_lightmode_svg'
  ];
} // DATA OUT: Array
