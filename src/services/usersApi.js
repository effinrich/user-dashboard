import axios from 'axios'
import { supabase, USERS_TABLE } from '../lib/supabase'
import { fetchGeoDataByZipCode } from './weatherApi'

// Create axios instance for Supabase REST API (alternative to SDK)
const supabaseAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'}/rest/v1`,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  }
})

/**
 * Fetches all users from Supabase
 * @returns {Promise<Array>}
 */
export const fetchUsers = async () => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

/**
 * Fetches a single user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>}
 */
export const fetchUserById = async (id) => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Creates a new user with geo data fetched from weather API
 * @param {Object} userData - { name, zipCode }
 * @returns {Promise<Object>}
 */
export const createUser = async ({ name, zipCode }) => {
  // Fetch geo data from weather API
  const geoData = await fetchGeoDataByZipCode(zipCode)

  const newUser = {
    name,
    zip_code: zipCode,
    latitude: geoData.latitude,
    longitude: geoData.longitude,
    time_zone: geoData.timezone
  }

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .insert([newUser])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Updates an existing user
 * Re-fetches geo data if zip code changes
 * @param {Object} params - { id, name, zipCode, originalZipCode }
 * @returns {Promise<Object>}
 */
export const updateUser = async ({ id, name, zipCode, originalZipCode }) => {
  let updateData = {
    name,
    zip_code: zipCode,
    updated_at: new Date().toISOString()
  }

  // Re-fetch geo data if zip code has changed
  if (zipCode !== originalZipCode) {
    const geoData = await fetchGeoDataByZipCode(zipCode)
    updateData = {
      ...updateData,
      latitude: geoData.latitude,
      longitude: geoData.longitude,
      time_zone: geoData.timezone
    }
  }

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Deletes a user by ID
 * @param {string} id - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  const { error } = await supabase
    .from(USERS_TABLE)
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}
