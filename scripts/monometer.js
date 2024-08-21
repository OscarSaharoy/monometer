// Oscar Saharoy 2021

class Monometer {

    constructor() {

        this.serialConnection = new SerialConnection( this );
        this.uInt8ToVoltage = char => char / 256.0 * 5.0;
        this.voltageP = document.getElementById("voltage");
    }

    async collectData(reader) {

        while( true ) {

            // wait for serial API to give us the data
            const { value, done } = await reader.read();

            // if the reader is lost then handle this
            if( done ) return this.serialConnection.readerLost();

            // make a new array of voltage datapoints from the values array
            var newPoints = Array.from( value ).map( this.uInt8ToVoltage );
            
            console.log(newPoints[newPoints.length - 1] + " V");
            this.voltageP.textContent = newPoints[newPoints.length - 1] + " V";
        }
    }
}

// make the application objects
const monometer        = new Monometer();
const noSerialWarning  = new NoSerialWarning();
