// Oscar Saharoy 2021

class Femtoscope {

    constructor() {

        this.serialConnection = new SerialConnection( this );
    }

    async collectData(reader) {

        // listen to data coming from the serial device
        this.unpause();

        while( true ) {

            // wait for serial API to give us the data
            const { value, done } = await reader.read();

            // if the reader is lost then handle this
            if( done ) return this.serialConnection.readerLost();

            if( this.paused ) continue;

            // make a new array of voltage datapoints from the values array
            var newPoints = Array.from( value ).map( this.uInt8ToVoltage );
            
            // add the points onto the existing array
            this.points = this.points.concat( newPoints );

            // trim old points from start of array
            if(this.points.length > this.sampleCount) this.points = this.points.splice( this.points.length - this.sampleCount );
        }
    }
}

// make the application objects
const femtoscope       = new Femtoscope();
const noSerialWarning  = new NoSerialWarning();
