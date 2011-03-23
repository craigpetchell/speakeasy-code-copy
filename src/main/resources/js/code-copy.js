AJS.toInit(function($) {
    // This may be fragile due to coupling to the plugin name (and version?)
    var clipboardMovie = function() {
        var context;
        if(AJS.Data && AJS.Data.get) {
            // Confluence
            context = AJS.Data.get("static-resource-url-prefix");
        } else {
            // Jira
            var pluginCss = $('link[href*="/org.petchell.speakeasy.codecopy"]').attr('href');
            context = pluginCss.substring(0, pluginCss.indexOf('/download/batch/org.petchell.speakeasy.codecopy'));
        }
        return context + "/download/resources/org.petchell.speakeasy.codecopy:code-copy/zero-clipboard.swf";
    }();

    AJS.log("clipboardMovie = " + clipboardMovie);
    ZeroClipboard.setMoviePath(clipboardMovie);
    $('.codeContent,.preformattedContent').each(function() {
        var contentContainer = $(this);
        var copyContainer = $('<div></div>').addClass('copy-container').appendTo(contentContainer);
        var copyButton = $('<div></div>').addClass('copy-button').appendTo(copyContainer);
        var clip = new ZeroClipboard.Client();
        var text;

        if(contentContainer.hasClass('codeContent')) {
            var lines = contentContainer.find('.code').find('div.line');
            text = "";
            lines.each(function() {
                text = text + $(this).text() + '\n';
            });
        } else {
            text = contentContainer.text();
        }

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