import { Box } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Dashboard } from '../components/Dashboard'

// Create a fresh query client for each story
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

export default {
  title: 'Pages/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={createQueryClient()}>
        <Box minH="100vh">
          <Story />
        </Box>
      </QueryClientProvider>
    ),
  ],
}

// Default dashboard view
export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'The main dashboard view. Note: This requires valid Supabase credentials to function properly. In development, you will see the empty state or loading skeleton.',
      },
    },
  },
}

// Dashboard documentation
export const Documentation = {
  render: () => (
    <Box p="8" maxW="800px" mx="auto" fontFamily="'DM Sans', sans-serif">
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
        User Dashboard
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        A comprehensive user management dashboard with Supabase integration and
        auto-fetched location data.
      </p>

      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          marginTop: '2rem',
        }}
      >
        Features
      </h2>
      <ul style={{ color: '#475569', lineHeight: '2' }}>
        <li>✅ Fetch and display users from Supabase</li>
        <li>✅ Add new users with name and zip code</li>
        <li>✅ Auto-fetch latitude, longitude, and timezone from OpenWeatherMap API</li>
        <li>✅ Edit existing users (re-fetches geo data if zip code changes)</li>
        <li>✅ Delete users with confirmation</li>
        <li>✅ Real-time updates via Supabase subscriptions</li>
        <li>✅ Loading and error states</li>
        <li>✅ Responsive design with Chakra UI v3</li>
      </ul>

      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          marginTop: '2rem',
        }}
      >
        Setup Required
      </h2>
      <ol style={{ color: '#475569', lineHeight: '2' }}>
        <li>1. Create a Supabase project</li>
        <li>2. Create the users table (SQL provided in supabase.js)</li>
        <li>3. Enable Row Level Security and real-time</li>
        <li>4. Add environment variables:</li>
      </ol>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          overflow: 'auto',
        }}
      >
        {`VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key`}
      </pre>

      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          marginTop: '2rem',
        }}
      >
        User Data Structure
      </h2>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '8px',
          overflow: 'auto',
        }}
      >
        {`{
  id: string (UUID),
  name: string,
  zip_code: string,
  latitude: number,
  longitude: number,
  time_zone: number (offset in seconds),
  created_at: timestamp,
  updated_at: timestamp
}`}
      </pre>
    </Box>
  ),
  parameters: {
    layout: 'padded',
  },
}
