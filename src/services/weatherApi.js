import axios from 'axios'

const WEATHER_API_KEY = '7afa46f2e91768e7eeeb9001ce40de19'
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * Fetches geolocation data (latitude, longitude, timezone) from OpenWeatherMap API
 * @param {string} zipCode - The zip code to look up
 * @param {string} countryCode - Country code (default: US)
 * @returns {Promise<{latitude: number, longitude: number, timezone: number}>}
 */
export const fetchGeoDataByZipCode = async (zipCode, countryCode = 'US') => {
  try {
    const response = await axios.get(WEATHER_API_BASE_URL, {
      params: {
        zip: `${zipCode},${countryCode}`,
        appid: WEATHER_API_KEY
      }
    })

    const { coord, timezone } = response.data

    return {
      latitude: coord.lat,
      longitude: coord.lon,
      timezone: timezone // Timezone offset in seconds from UTC
    }
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Invalid zip code: ${zipCode}`)
    }
    throw new Error('Failed to fetch location data. Please try again.')
  }
}
