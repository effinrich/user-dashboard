# User Dashboard

A React.js dashboard application featuring a user management system with Supabase integration and auto-fetched location data from OpenWeatherMap API.

![Dashboard Preview](https://via.placeholder.com/800x400?text=User+Dashboard+Preview)

## Features

- 📋 **User Table** - Display users fetched from Supabase real-time database
- ➕ **Add User** - Modal form to add new users with name and zip code
- 🌍 **Auto Location Data** - Automatically fetches latitude, longitude, and timezone from zip code
- ✏️ **Edit User** - Update user information (re-fetches geo data if zip code changes)
- 🗑️ **Delete User** - Remove users with confirmation
- ⚡ **Real-time Updates** - Supabase subscriptions for live data sync
- 🎨 **Modern UI** - Built with Chakra UI v3 for beautiful, accessible components
- 📚 **Storybook** - Component documentation and testing

## Tech Stack

- **React 18** - UI framework
- **Chakra UI v3** - Component library
- **@tanstack/react-query** - Server state management
- **Axios** - HTTP client
- **Supabase** - Backend as a Service (PostgreSQL + Real-time)
- **OpenWeatherMap API** - Geolocation data
- **Storybook** - Component development and documentation
- **Vite** - Build tool

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Setup

### 1. Clone and Install

```bash
cd user-dashboard
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to SQL Editor and run the following SQL to create the users table:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  time_zone INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed for production)
CREATE POLICY "Allow all operations" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE users;
```

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your Supabase credentials from Project Settings > API and update `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Application

```bash
# Development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## Project Structure

```
user-dashboard/
├── .storybook/           # Storybook configuration
│   ├── main.js
│   └── preview.jsx
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.jsx
│   │   ├── UserModal.jsx
│   │   ├── UserTable.jsx
│   │   └── index.js
│   ├── hooks/            # React Query hooks
│   │   └── useUsers.js
│   ├── lib/              # Configuration
│   │   ├── supabase.js
│   │   └── theme.js
│   ├── services/         # API services
│   │   ├── usersApi.js
│   │   └── weatherApi.js
│   ├── stories/          # Storybook stories
│   │   ├── Dashboard.stories.jsx
│   │   ├── UserModal.stories.jsx
│   │   └── UserTable.stories.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints

### OpenWeatherMap API
The app uses the OpenWeatherMap API to fetch geolocation data from zip codes:
```
GET https://api.openweathermap.org/data/2.5/weather?zip={zipCode},US&appid={apiKey}
```

Response includes:
- `coord.lat` - Latitude
- `coord.lon` - Longitude
- `timezone` - Timezone offset in seconds from UTC

### Supabase REST API
The app uses Supabase's auto-generated REST API for CRUD operations on the users table.

## User Data Structure

Each user record contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `name` | TEXT | User's full name |
| `zip_code` | TEXT | US zip code |
| `latitude` | DECIMAL | Latitude coordinate |
| `longitude` | DECIMAL | Longitude coordinate |
| `time_zone` | INTEGER | Timezone offset in seconds from UTC |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

## Components

### Dashboard
Main page component that orchestrates the entire application, including:
- Header with app title and "Add User" button
- User table display
- Modal management for add/edit operations
- Supabase real-time subscription

### UserTable
Displays users in a card-based layout with:
- User name and truncated ID
- Location badges (zip code, coordinates, timezone)
- Edit and delete action buttons
- Loading skeleton and empty state

### UserModal
Reusable modal for both adding and editing users:
- Form validation for name and zip code
- Loading and error states
- Beautiful gradient header design

## Storybook

View and interact with components in isolation:

```bash
npm run storybook
```

This opens Storybook at http://localhost:6006 with:
- Component documentation
- Interactive controls
- Different states (loading, error, empty)
- Usage examples

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run storybook` | Start Storybook server |
| `npm run build-storybook` | Build Storybook static site |

## Style Guide

This section documents the coding conventions and design patterns used in this project.

### Code Conventions

#### File Naming
- **Components**: PascalCase (e.g., `UserTable.jsx`, `UserModal.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useUsers.js`)
- **Services**: camelCase with descriptive suffix (e.g., `usersApi.js`, `weatherApi.js`)
- **Stories**: Component name + `.stories.jsx` (e.g., `Dashboard.stories.jsx`)

#### Component Structure
```jsx
import { useState, useEffect } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { FiIcon } from 'react-icons/fi'

/**
 * JSDoc description of the component
 */
export const ComponentName = ({ prop1, prop2 = 'default' }) => {
  // Hooks first
  const [state, setState] = useState(null)
  
  // Effects
  useEffect(() => { /* ... */ }, [])
  
  // Event handlers
  const handleAction = () => { /* ... */ }
  
  // Render
  return (
    <Box>
      {/* JSX */}
    </Box>
  )
}

export default ComponentName
```

#### Exports
- Use **named exports** for all components: `export const ComponentName`
- Include a **default export** at the bottom: `export default ComponentName`
- Re-export from `index.js` for cleaner imports

#### JavaScript Style
| Pattern | Convention | Example |
|---------|------------|---------|
| Strings | Single quotes | `'string'` |
| Indentation | 2 spaces | |
| Functions | Arrow functions | `const fn = () => {}` |
| Variables | camelCase | `userName`, `isLoading` |
| Constants | SCREAMING_SNAKE_CASE | `USERS_QUERY_KEY` |
| Props | Destructure with defaults | `{ prop = 'default' }` |

### Design System

#### Typography
- **Font Family**: `'DM Sans', sans-serif`
- **Headings**: fontWeight `700-800`, letterSpacing `-0.5px`
- **Body**: fontWeight `400-600`
- **Labels**: fontSize `sm`, fontWeight `600`, textTransform `uppercase`

#### Color Palette

| Token | Light | Usage |
|-------|-------|-------|
| Brand Primary | `#667eea` → `#764ba2` | Primary gradient, buttons |
| Brand Secondary | `#0ea5e9` → `#0369a1` | Secondary actions |
| Accent | `#d946ef` → `#a21caf` | Highlights |
| Background | `#f8fafc` → `#f1f5f9` | Page background |
| Surface | `#ffffff` | Cards, modals |

**Semantic Badge Colors:**
```
Purple: bg="purple.50" text="purple.700"  → Location/Zip
Blue:   bg="blue.50"   text="blue.700"   → Coordinates
Green:  bg="green.50"  text="green.700"  → Time/Status
Red:    bg="red.50"    text="red.600"    → Errors
```

#### Gradients
```jsx
// Primary gradient (purple)
bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

// Page background
bg="linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
```

#### Spacing & Sizing

| Element | Border Radius | Padding |
|---------|---------------|---------|
| Buttons | `12px` | `px="4-6"` `py="5-6"` |
| Cards | `16px` | `p="5"` |
| Containers | `24px` | `p="6-8"` |
| Badges | `full` | `px="3"` `py="1.5"` |
| Inputs | `12px` | `px="4"` `py="3"` |

#### Shadows
```jsx
// Card shadow
boxShadow="0 1px 3px rgba(0,0,0,0.08)"

// Card hover shadow  
boxShadow="0 8px 25px rgba(0,0,0,0.1)"

// Modal shadow
boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"

// Button shadow
boxShadow="0 10px 30px rgba(0,0,0,0.15)"
```

#### Transitions & Animations
```jsx
// Standard transition
transition="all 0.2s"

// Hover effects
_hover={{
  transform: 'translateY(-2px)',
  boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
}}

// Active state
_active={{ transform: 'translateY(0)' }}
```

### Component Patterns

#### Chakra UI Usage
```jsx
// Layout components
<Box>, <HStack>, <VStack>

// Spacing props
p="6" px="4" py="3" gap="3" mb="4"

// Responsive values
maxW="1200px" w="90%"

// Hover states
_hover={{ bg: 'blue.50', color: 'blue.600' }}

// Focus states  
_focusWithin={{ borderColor: '#667eea', bg: 'white' }}
```

#### Icons
Use **Feather Icons** from `react-icons/fi`:
```jsx
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiMapPin } from 'react-icons/fi'

// Usage
<FiPlus size={20} />
<FiMapPin size={14} color="#9333ea" />
```

#### Form Inputs
```jsx
<HStack
  bg="gray.50"
  borderRadius="12px"
  px="4"
  border="2px solid"
  borderColor="gray.100"
  _focusWithin={{ 
    borderColor: '#667eea',
    bg: 'white',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  }}
>
  <FiIcon color="#9CA3AF" />
  <Input border="none" bg="transparent" />
</HStack>
```

#### Loading States
- Use `<Spinner size="sm" />` for inline loading
- Create skeleton components with `bg="gray.200"` placeholders
- Match skeleton layout to actual content structure

#### Empty States
- Center aligned with dashed border
- Include icon, title, and helpful description
- Use gradient background for icon container

### State Management

#### React Query
```jsx
// Query keys as constants
export const USERS_QUERY_KEY = ['users']

// Queries
const { data, isLoading, error, refetch } = useQuery({
  queryKey: USERS_QUERY_KEY,
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5
})

// Mutations with cache invalidation
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
})
```

#### Local State
```jsx
// Modal state
const [isModalOpen, setIsModalOpen] = useState(false)

// Form state
const [formData, setFormData] = useState({ name: '', zipCode: '' })

// Loading indicators
const [deletingUserId, setDeletingUserId] = useState(null)
```

### Storybook Conventions

```jsx
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'fullscreen'
  },
  argTypes: {
    propName: { control: 'select', options: [...] }
  }
}

// Named exports for each story
export const Default = { args: { /* props */ } }
export const Loading = { args: { isLoading: true } }
export const WithRender = {
  render: () => <ComponentName prop="value" />
}
```

## License

MIT
