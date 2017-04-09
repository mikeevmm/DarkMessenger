function injectCSS () {
    if(!enabled)
        return;
    $("<style>")
    .prop("type", "text/css")
    .html("._1ht7 { color: rgba(255,255,255,0.4); } \
._1lj0 { color: #fff; } \
._3eus { color: #aaa; }\
._3szq,._1ht6, ._17w2, ._2v6o, ._1htf { color: #fff; }\
._4sp8 { background-color: #151515; } \
body { background: #fff; background-color: #151515; color: #fff; }").appendTo("head");
}

chrome.storage.local.get("darkmessenger", function(item) {

    if(item["darkmessenger"] == undefined) {
        chrome.storage.local.set({"darkmessenger" : true});
        enabled = false;
    } else {
        enabled = item["darkmessenger"];
    }

    injectCSS();
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            enabled = !enabled;
            chrome.storage.local.set({"darkmessenger" : enabled}, function(){
                location.reload(true);
            });
        }
    }
);