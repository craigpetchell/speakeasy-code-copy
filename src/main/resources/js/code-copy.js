AJS.toInit(function($) {
    // This may be fragile due to coupling to the plugin name (and version?)
    var clipboardMovie = AJS.Data.get("static-resource-url-prefix") +
            "/download/batch/org.petchell.speakeasy.codecopy:code-copy-1/org.petchell.speakeasy.codecopy:zero-clipboard.swf";
    AJS.log("clipboardMovie = " + clipboardMovie);
    ZeroClipboard.setMoviePath(clipboardMovie);
    $('.codeContent,.preformattedContent').each(function() {
        var contentContainer = $(this);
        var text = contentContainer.text();
        var copyContainer = $('<div></div>').addClass('copy-container').appendTo(contentContainer);
        var copyButton = $('<div></div>').addClass('copy-button').appendTo(copyContainer);

        var clip = new ZeroClipboard.Client();
        clip.set
        clip.setHandCursor( true );

        clip.addEventListener('load', function (client) {
            console.log("Flash movie loaded and ready.");
        });

        clip.addEventListener('mouseover', function (client) {
            copyButton.fadeTo('fast', 1);
        });

        clip.addEventListener('mouseout', function (client) {
            copyButton.fadeTo('fast', 0.5);
        });

        clip.addEventListener('complete', function (client, text) {
            console.log("Copied text to clipboard: " + text );
        });

        clip.glue(copyButton[0], copyContainer[0]);
        clip.setText(text);
    });


});