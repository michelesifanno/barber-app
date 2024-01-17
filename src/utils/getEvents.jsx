// Assume this function returns a Promise that resolves with the fetched data
const getEvents = async (filterDto, pageable) => {
  try {
    // Convert filterDto and pageable to query parameters
    const filterParams = new URLSearchParams(filterDto);
    const pageableParams = new URLSearchParams(pageable);

    // Construct the URL with query parameters
    const url = `http://localhost:5002/api/prenotazioni?${filterParams.toString()}&${pageableParams.toString()}`;

    // Make the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    // Check if the response is successful (status code in the range 200-299)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle non-successful response
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (error) {
    // Handle errors that occur during the fetch operation
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

// Example usage:
const filterDto = {
  nome: 'string',
  cognome: 'string',
};

const pageable = {
  page: 0,
  size: 0,
  sort: ['string'],
  allPages: true,
};

getEvents(filterDto, pageable)
  .then(data => console.log('Fetched data:', data))
  .catch(error => console.error('Error:', error));


  export default getEvents;
