// Create a new file: src/services/addressValidation.ts
import shippingData from '../../assets/Service-Qualification.json';

export const validateAddress = (address: string, city: string, state: string, zip: string) => {
    debugger;
  // Extract valid addresses from your JSON data
  const validAddresses = shippingData.paths['/service-qualification'].post.responses['200'].content['application/json'].schema.example.value.addressResponse;
  
  // Check if the entered address matches any valid address
  return validAddresses.some(validAddr => {
    const submittedAddr = validAddr.place.submittedGeographicAddress;
    return (
      submittedAddr.streetaddress.includes(address) &&
      submittedAddr.city === city &&
      submittedAddr.stateOrProvince === state &&
      submittedAddr.postcode === zip
    );
  });
};