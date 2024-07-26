/* media.js */

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
  "photo_landscape": './placeholder_media/landscape.jpg',
  "photo_portrait": './placeholder_media/portrait.jpg',
  "photo_square": './placeholder_media/square.jpg',
  "video": './placeholder_media/video.mp4'
}

function randomImage() {
  const options = ['photo_landscape', 'photo_square', 'photo_portrait'];
  const result = options[(Math.floor(Math.random() * 100) + 1) % 3];
  return pageSagePlaceholderMedia[result];
}

function randomMedia() {
  const options = ['audio', 'video', 'photo_landscape', 'photo_square', 'photo_portrait'];
  const result = options[(Math.floor(Math.random() * 100) + 1) % 5];
  return pageSagePlaceholderMedia[result];
}