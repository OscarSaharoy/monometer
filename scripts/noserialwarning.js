// Oscar Saharoy 2021

class NoSerialWarning {

    constructor() {

        // big div that holds the warning message when Serial API is not enabled
        this.warningDiv = document.getElementById("no-serial");

        // button that hides that div
        this.checkSerialAPI();
    }

    checkSerialAPI() {

        // check the serial API exists
        if( !("serial" in navigator) ) return;

        // hide the warning if it does
        this.hide();
        console.log("serial api enabled :)");
    }

    hide() {

        this.warningDiv.remove();
    }
}
