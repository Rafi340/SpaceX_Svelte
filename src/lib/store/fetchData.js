
export async function fetchData(url) {
    let baseURL = import.meta.env.VITE_BASE_URL + url;
    console.log(baseURL)
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