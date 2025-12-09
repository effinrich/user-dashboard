import { Avatar, AvatarGroup } from '../components/Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'light', value: '#fafbfc' },
        { name: 'dark', value: '#0d1117' },
        { name: 'gradient', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    colorScheme: {
      control: 'select',
      options: ['brand', 'accent', 'coral', 'emerald', 'slate'],
    },
  },
}

// Basic avatar with image
export const WithImage = {
  args: {
    src: 'https://i.pravatar.cc/300?img=1',
    name: 'John Doe',
    size: 'lg',
  },
}

// Fallback with initials
export const WithInitials = {
  args: {
    name: 'Sarah Wilson',
    size: 'lg',
    colorScheme: 'brand',
  },
}

// All sizes
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="XS" size="xs" colorScheme="brand" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>xs</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="SM" size="sm" colorScheme="accent" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>sm</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="MD" size="md" colorScheme="coral" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>md</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="LG" size="lg" colorScheme="emerald" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>lg</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="XL" size="xl" colorScheme="slate" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>xl</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="2X" size="2xl" colorScheme="brand" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>2xl</p>
      </div>
    </div>
  ),
}

// All color schemes
export const ColorSchemes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Brand" size="lg" colorScheme="brand" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>brand</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Accent" size="lg" colorScheme="accent" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>accent</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Coral" size="lg" colorScheme="coral" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>coral</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Emerald" size="lg" colorScheme="emerald" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>emerald</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Slate" size="lg" colorScheme="slate" />
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>slate</p>
      </div>
    </div>
  ),
}

// With different images
export const Gallery = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Avatar src="https://i.pravatar.cc/300?img=1" name="Alice Johnson" size="lg" />
      <Avatar src="https://i.pravatar.cc/300?img=5" name="Bob Smith" size="lg" />
      <Avatar src="https://i.pravatar.cc/300?img=10" name="Carol White" size="lg" />
      <Avatar src="https://i.pravatar.cc/300?img=15" name="David Brown" size="lg" />
      <Avatar src="https://i.pravatar.cc/300?img=20" name="Emma Davis" size="lg" />
      <Avatar src="https://i.pravatar.cc/300?img=25" name="Frank Miller" size="lg" />
    </div>
  ),
}

// Avatar Group
export const Group = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '12px', fontFamily: 'DM Sans, sans-serif' }}>
          Team Members (showing 4 of 7)
        </p>
        <AvatarGroup max={4} size="md">
          <Avatar src="https://i.pravatar.cc/300?img=1" name="Alice" />
          <Avatar src="https://i.pravatar.cc/300?img=5" name="Bob" />
          <Avatar src="https://i.pravatar.cc/300?img=10" name="Carol" />
          <Avatar src="https://i.pravatar.cc/300?img=15" name="David" />
          <Avatar src="https://i.pravatar.cc/300?img=20" name="Emma" />
          <Avatar src="https://i.pravatar.cc/300?img=25" name="Frank" />
          <Avatar src="https://i.pravatar.cc/300?img=30" name="Grace" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '12px', fontFamily: 'DM Sans, sans-serif' }}>
          Small Group
        </p>
        <AvatarGroup max={6} size="sm">
          <Avatar name="Alice Johnson" colorScheme="brand" />
          <Avatar name="Bob Smith" colorScheme="accent" />
          <Avatar name="Carol White" colorScheme="coral" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

// Profile card showcase
export const ProfileCard = {
  render: () => (
    <div
      style={{
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '16px',
        padding: '32px',
        width: '320px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Avatar
          src="https://i.pravatar.cc/300?img=32"
          name="Alexandra Chen"
          size="2xl"
          colorScheme="accent"
        />
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              color: '#f1f5f9',
              fontSize: '20px',
              fontWeight: 600,
              margin: '0 0 4px 0',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Alexandra Chen
          </h3>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '14px',
              margin: 0,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Senior Product Designer
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '8px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 600, margin: 0 }}>128</p>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Projects</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 600, margin: 0 }}>12.4k</p>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Followers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 600, margin: 0 }}>892</p>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Following</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Status indicator example
export const WithStatusIndicator = {
  render: () => {
    const StatusAvatar = ({ status, ...props }) => {
      const statusColors = {
        online: '#22c55e',
        away: '#f59e0b',
        busy: '#ef4444',
        offline: '#6b7280',
      }
      
      return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Avatar {...props} />
          <span
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: statusColors[status],
              border: '2px solid #0f172a',
              boxShadow: `0 0 8px ${statusColors[status]}66`,
            }}
          />
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <StatusAvatar
            src="https://i.pravatar.cc/300?img=1"
            name="Online User"
            size="lg"
            status="online"
          />
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>Online</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <StatusAvatar
            src="https://i.pravatar.cc/300?img=5"
            name="Away User"
            size="lg"
            status="away"
          />
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>Away</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <StatusAvatar
            src="https://i.pravatar.cc/300?img=10"
            name="Busy User"
            size="lg"
            status="busy"
          />
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>Busy</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <StatusAvatar
            name="Offline User"
            size="lg"
            status="offline"
            colorScheme="slate"
          />
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>Offline</p>
        </div>
      </div>
    )
  },
}

