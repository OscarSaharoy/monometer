// Oscar Saharoy 2021

class Monometer {

    constructor() {

        this.serialConnection = new SerialConnection( this );
        this.uInt8ToVoltage = char => char / 256.0 * 5.0;
        this.voltageP = document.getElementById("voltage");
        this.resistanceP = document.getElementById("resistance");
    }

    async collectData(reader) {

        while( true ) {

            // wait for serial API to give us the data
            const { value, done } = await reader.read();

            // if the reader is lost then handle this
            if( done ) return this.serialConnection.readerLost();

            var newPoints = Array.from( value );

            const V = this.uInt8ToVoltage( newPoints[ newPoints.length - 1 ] );
            this.voltageP.textContent = V + " V";

            // V = 5 * R / ( 10e+3 + R ) => V * 10e+3 + VR = 5R => R = ( V * 10e+3 ) / ( 5 - V )
            this.resistanceP.textContent = ( V * 19.5e+3 ) / ( 5 - V ) + " ohms";
        }
    }
}

// make the application objects
const monometer        = new Monometer();
const noSerialWarning  = new NoSerialWarning();
