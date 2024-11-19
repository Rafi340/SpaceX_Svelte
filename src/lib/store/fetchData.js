
export async function fetchData(url) {
    let baseURL = 'https://api.spacexdata.com/v3' + url;
    try {
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }