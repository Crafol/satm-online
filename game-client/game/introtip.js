
(function()
{
    function addCss()
    {
        /** add CSS  */
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href","/media/assets/css/introtip.css");
        document.head.appendChild(link);
    }

    function addContent()
    {
        const _room = typeof g_sRoom === "undefined" ? "" : g_sRoom;
        const div = document.createElement("div");
        div.setAttribute("class", "intro-tooltip");
        div.setAttribute("id", "intro-tooltip");

        const divOverlay = document.createElement("div");
        divOverlay.setAttribute("id", "tip-opverlay");
        divOverlay.setAttribute("class", "tip-opverlay");
        divOverlay.setAttribute("title", "Click here to close");
        
        const divContent = document.createElement("div");
        divContent.setAttribute("class", "blue-box tip-content");
        
        divContent.innerHTML = `<h2><i class="fa fa-info-circle" aria-hidden="true"></i> Before you start</h2>
                            <h3><i class="fa fa-microphone" aria-hidden="true"></i> Join Audio Chat</h3>
                            <p>You can join the <a href="https://meet.jit.si/${_room}" target="_blank"><i class="fa fa-external-link-square" aria-hidden="true"></i> Jitsi Audio Chat</a>
                            or the <a href="https://discord.com/invite/EFqBJmT" target="_blank"><i class="fa fa-external-link-square" aria-hidden="true"></i> Discord</a> server.
                            <br>&nbsp;</p>
                            <h3><i class="fa fa-universal-access" aria-hidden="true"></i> How to play</h3>
                            <p>Simply <span class="text-white">drag &amp; drop</span> cards as you would intuitively do.</p>
                            <p>Use the left <span class="text-white">icon bar</span> to manage your game phases.</p>
                            <p><span class="text-white">Claim marshalling points</span> by dropping the card on the crown icon.</p>
                            <p class="text-center"><button id="close_tip" type="button">Close tip</button></p>
                        </div>
                    </div>`;
        
        div.appendChild(divOverlay);
        div.appendChild(divContent);
        document.body.appendChild(div);
        document.getElementById("close_tip").onclick = () => DomUtils.remove(document.getElementById("intro-tooltip"));
        document.getElementById("tip-opverlay").onclick = () => document.getElementById("close_tip").click();
    }

    addCss();
    addContent();
})();