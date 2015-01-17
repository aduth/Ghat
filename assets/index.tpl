<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="<%= manifest.description %>">
        <title>Ghat &mdash; <%= manifest.description %></title>
        <link rel="stylesheet" href="/css/bundle-<%= manifest.version %>.css">
        <link rel="icon" href="/images/favicon.ico">
    </head>
    <body>
        <div id="container"><%= content %></div>
        <script src="/js/bundle-<%= manifest.version %>.js"></script>
    </body>
</html>
