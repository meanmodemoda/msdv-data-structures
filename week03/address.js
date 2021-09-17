//create an Address class

const Addressclass = class {
      constructor (
       address,
       latOutput,
       lngOutput
            ) {
      this.address = address;
      this.latLong = {lat:latOutput, lng:lngOutput};
            }
};


export default Addressclass;