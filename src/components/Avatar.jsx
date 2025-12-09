import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'

/**
 * Avatar component built with Ark UI
 * Displays user profile images with fallback initials
 */
export const Avatar = ({
  src,
  name,
  size = 'md',
  colorScheme = 'brand',
  onStatusChange,
  ...props
}) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  // Size configurations
  const sizes = {
    xs: { box: '28px', font: '10px', ring: '2px' },
    sm: { box: '36px', font: '12px', ring: '2px' },
    md: { box: '48px', font: '14px', ring: '3px' },
    lg: { box: '64px', font: '18px', ring: '3px' },
    xl: { box: '88px', font: '24px', ring: '4px' },
    '2xl': { box: '120px', font: '32px', ring: '4px' },
  }

  // Color schemes matching the theme
  const colorSchemes = {
    brand: {
      bg: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
      ring: '#38bdf8',
      text: '#ffffff',
    },
    accent: {
      bg: 'linear-gradient(135deg, #d946ef 0%, #a21caf 100%)',
      ring: '#e879f9',
      text: '#ffffff',
    },
    coral: {
      bg: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
      ring: '#fb923c',
      text: '#ffffff',
    },
    emerald: {
      bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      ring: '#34d399',
      text: '#ffffff',
    },
    slate: {
      bg: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
      ring: '#94a3b8',
      text: '#ffffff',
    },
  }

  const sizeConfig = sizes[size] || sizes.md
  const colors = colorSchemes[colorScheme] || colorSchemes.brand

  const rootStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: sizeConfig.box,
    height: sizeConfig.box,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: `0 0 0 ${sizeConfig.ring} ${colors.ring}33, 0 4px 12px rgba(0, 0, 0, 0.15)`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  }

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  }

  const fallbackStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: colors.bg,
    color: colors.text,
    fontSize: sizeConfig.font,
    fontWeight: 600,
    fontFamily: '"DM Sans", sans-serif',
    letterSpacing: '0.5px',
    userSelect: 'none',
  }

  return (
    <ArkAvatar.Root
      style={rootStyles}
      onStatusChange={onStatusChange}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = `0 0 0 ${sizeConfig.ring} ${colors.ring}66, 0 8px 20px rgba(0, 0, 0, 0.2)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = `0 0 0 ${sizeConfig.ring} ${colors.ring}33, 0 4px 12px rgba(0, 0, 0, 0.15)`
      }}
      {...props}
    >
      <ArkAvatar.Fallback style={fallbackStyles}>
        {getInitials(name)}
      </ArkAvatar.Fallback>
      {src && (
        <ArkAvatar.Image
          src={src}
          alt={name || 'User avatar'}
          style={imageStyles}
        />
      )}
    </ArkAvatar.Root>
  )
}

/**
 * AvatarGroup - Display multiple avatars stacked
 */
export const AvatarGroup = ({ children, max = 4, size = 'md', spacing = -12 }) => {
  const childArray = Array.isArray(children) ? children : [children]
  const displayedChildren = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  const groupStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }

  const itemStyles = {
    marginRight: `${spacing}px`,
    position: 'relative',
  }

  return (
    <div style={groupStyles}>
      {remainingCount > 0 && (
        <div style={{ marginRight: `${spacing}px` }}>
          <Avatar
            name={`+${remainingCount}`}
            size={size}
            colorScheme="slate"
          />
        </div>
      )}
      {displayedChildren.reverse().map((child, index) => (
        <div key={index} style={itemStyles}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Avatar

