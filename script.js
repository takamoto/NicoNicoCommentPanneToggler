(function() {
    // ToggleCommentPanelButton を生成
    var button = document.createElement("div");
    button.setAttribute("class", "ActionButton ControllerButton ToggleCommentPanelButton");
    button.innerHTML = `
    <div class="ControllerButton-inner">
        <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-miterlimit="1.4">
            <path d="M 5 5 L 3 6 L 2 7 L 1 8 L 0 10 L 0 85 L 90 85 L 90 10 L 89 8 L 88 7 L 87 6 L 85 5 L 5 5 M 7 25 L 7 78 L 52 78 L 52 25 L 7 25 M 63 25 L 63 78 L 83 78 L 83 25 L 63 25"></path>
        </svg>
    </div>
    `;

    // ToggleCommentPanelButton をクリックする毎に
    // .MainContainer が指定されている要素に hidden_comment_panel アトリビュートをつけ外しする
    button.addEventListener("click", function() {
        var container = document.getElementsByClassName("MainContainer")[0];
        var visible = container.getAttribute("hidden_comment_panel") === null;
        if (visible) {
            container.setAttribute("hidden_comment_panel", "");
        } else {
            container.removeAttribute("hidden_comment_panel");
        }
        window.dispatchEvent(new CustomEvent("resize"));
        chrome.storage.local.set({"nicovideo_visible_comment_panel": !visible}, function() {});
    }, false);

    // ボタンをコントロールバー部分に追加
    document.getElementsByClassName("ControllerContainer-area")[2].appendChild(button);

    // ウィンドウ幅がヘッダーよりも狭い場合に、横スクロールにプレイヤーを追従させる
    var style = document.createElement("style");
    document.getElementsByTagName("body")[0].appendChild(style);
    window.addEventListener("scroll", function() {
        style.innerText = `
        body.is-autoResize:not(.is-fullscreen) .MainContainer[hidden_comment_panel] .MainContainer-player { margin-left: ` + window.scrollX + `px; }
        `
    });

    // ToggleCommentPanelButton の on/off の状態をローカルに保存する
    chrome.storage.local.get({'nicovideo_visible_comment_panel': true}, function(result) {
        console.log(result);
        if (!result.nicovideo_visible_comment_panel) button.click();
    });
})();