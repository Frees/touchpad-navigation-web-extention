(() => {

let listenerAdded: boolean = false;
let navigated: boolean = false;
let returnNavigationTimeoutHandle: any = null;

function log(message: string) {
    // console.log(message);
}

function addWheelListener() {
    log("add wheel listener begin already added = " + listenerAdded);

    if (listenerAdded) {
        return;
    }

    navigated = false;

    window.addEventListener("wheel", (e: any) => {
        log(`mouse wheel navigated = ${navigated}`);

        if (! navigated) {
            if (e.deltaX && e.deltaX > 0) {
                log("move back");
                history.back();
                navigated = true;
            }
            if (e.deltaX && e.deltaX < 0) {
                log("move forward");
                history.forward();
                navigated = true;
            }

            if (navigated) {
                listenerAdded = false;
                // in case no moved forward return ability move
                returnNavigationTimeoutHandle = setTimeout(
                   () => {navigated = false;
                          listenerAdded = true;
                          log("navigaated timeout");
                         },
                   500,
                );
            }
        }
    });
    listenerAdded = true;
}

addWheelListener();

// restore wheel listener after navigation by messag
browser.runtime.onMessage.addListener((message: any) => {
    log("on message " + message.command);

    if (message.command === "reset") {
        addWheelListener();
    } else if (message.command === "begin") {
        if (returnNavigationTimeoutHandle != null) {
            clearTimeout(returnNavigationTimeoutHandle);
            returnNavigationTimeoutHandle = null;
        }
        listenerAdded = false;
    }
  });

})();
