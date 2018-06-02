//This is the page template
export default function() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>The Wall Street Journal & Breaking News, Business, Financial and Economic News, World News and Video</title>
        <link rel="shortcut icon" href="https://s.wsj.net/media/wsj_favicon-16x16.png" sizes="16x16" type="image/x-icon">
        <link rel="shortcut icon" href="https://s.wsj.net/media/wsj_favicon-32x32.png" sizes="32x32" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Prata" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="assets/vendor.js"></script>
        <script type="text/javascript" src="assets/app.js"></script>
      </body>
    </html>
  `
};
