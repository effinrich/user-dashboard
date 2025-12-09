import { Box } from '@chakra-ui/react'
import { UserTable } from '../components/UserTable'

export default {
  title: 'Components/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Shows loading skeleton',
    },
    users: {
      control: 'object',
      description: 'Array of user objects',
    },
    deletingUserId: {
      control: 'text',
      description: 'ID of user currently being deleted',
    },
  },
  decorators: [
    (Story) => (
      <Box maxW="900px" mx="auto" p="6" bg="#f8fafc" minH="500px">
        <Story />
      </Box>
    ),
  ],
}

// Sample user data
const mockUsers = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'John Doe',
    zip_code: '37643',
    latitude: 36.3487,
    longitude: -82.2589,
    time_zone: -18000,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
    name: 'Jane Smith',
    zip_code: '90210',
    latitude: 34.0901,
    longitude: -118.4065,
    time_zone: -28800,
    created_at: '2024-01-14T08:15:00Z',
  },
  {
    id: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
    name: 'Bob Johnson',
    zip_code: '10001',
    latitude: 40.7484,
    longitude: -73.9967,
    time_zone: -18000,
    created_at: '2024-01-13T14:45:00Z',
  },
  {
    id: 'd4e5f6g7-h8i9-0123-defg-234567890123',
    name: 'Alice Williams',
    zip_code: '60601',
    latitude: 41.8819,
    longitude: -87.6278,
    time_zone: -21600,
    created_at: '2024-01-12T11:20:00Z',
  },
]

// Default story with users
export const WithUsers = {
  args: {
    users: mockUsers,
    isLoading: false,
    onEdit: (user) => console.log('Edit user:', user),
    onDelete: (id) => console.log('Delete user:', id),
    deletingUserId: null,
  },
}

// Empty state
export const EmptyState = {
  args: {
    users: [],
    isLoading: false,
    onEdit: () => {},
    onDelete: () => {},
    deletingUserId: null,
  },
}

// Loading state
export const LoadingState = {
  args: {
    users: [],
    isLoading: true,
    onEdit: () => {},
    onDelete: () => {},
    deletingUserId: null,
  },
}

// With deleting state
export const DeletingUser = {
  args: {
    users: mockUsers,
    isLoading: false,
    onEdit: (user) => console.log('Edit user:', user),
    onDelete: (id) => console.log('Delete user:', id),
    deletingUserId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  },
}

// Single user
export const SingleUser = {
  args: {
    users: [mockUsers[0]],
    isLoading: false,
    onEdit: (user) => console.log('Edit user:', user),
    onDelete: (id) => console.log('Delete user:', id),
    deletingUserId: null,
  },
}

// Many users
export const ManyUsers = {
  args: {
    users: [
      ...mockUsers,
      {
        id: 'e5f6g7h8-i9j0-1234-efgh-345678901234',
        name: 'Charlie Brown',
        zip_code: '33101',
        latitude: 25.7617,
        longitude: -80.1918,
        time_zone: -18000,
        created_at: '2024-01-11T09:00:00Z',
      },
      {
        id: 'f6g7h8i9-j0k1-2345-fghi-456789012345',
        name: 'Diana Ross',
        zip_code: '98101',
        latitude: 47.6062,
        longitude: -122.3321,
        time_zone: -28800,
        created_at: '2024-01-10T16:30:00Z',
      },
    ],
    isLoading: false,
    onEdit: (user) => console.log('Edit user:', user),
    onDelete: (id) => console.log('Delete user:', id),
    deletingUserId: null,
  },
}
