import { useState } from 'react'
import {
  Box,
  Button,
  Text,
  HStack,
  VStack,
  Spinner
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiMapPin, FiClock } from 'react-icons/fi'

/**
 * Formats timezone offset (seconds) to readable format
 */
const formatTimezone = (offset) => {
  if (offset === null || offset === undefined) return 'N/A'
  const hours = Math.floor(Math.abs(offset) / 3600)
  const sign = offset >= 0 ? '+' : '-'
  return `UTC${sign}${hours}`
}

/**
 * UserRow component for displaying individual user data
 */
const UserRow = ({ user, onEdit, onDelete, isDeleting }) => {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      p="5"
      boxShadow="0 1px 3px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.2s"
      _hover={{
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)',
        borderColor: 'transparent'
      }}
    >
      <HStack justify="space-between" align="flex-start">
        <VStack align="flex-start" gap="3" flex="1">
          {/* User Name & ID */}
          <Box>
            <Text
              fontSize="lg"
              fontWeight="700"
              color="gray.800"
              fontFamily="'DM Sans', sans-serif"
            >
              {user.name}
            </Text>
            <Text fontSize="xs" color="gray.400" fontFamily="mono">
              ID: {user.id?.slice(0, 8)}...
            </Text>
          </Box>

          {/* Location Info Grid */}
          <HStack gap="4" flexWrap="wrap">
            {/* Zip Code */}
            <HStack
              bg="purple.50"
              px="3"
              py="1.5"
              borderRadius="full"
              gap="2"
            >
              <FiMapPin size={14} color="#9333ea" />
              <Text fontSize="sm" color="purple.700" fontWeight="600">
                {user.zip_code}
              </Text>
            </HStack>

            {/* Coordinates */}
            <HStack
              bg="blue.50"
              px="3"
              py="1.5"
              borderRadius="full"
              gap="2"
            >
              <Text fontSize="sm" color="blue.700" fontWeight="500">
                {user.latitude?.toFixed(4)}°, {user.longitude?.toFixed(4)}°
              </Text>
            </HStack>

            {/* Timezone */}
            <HStack
              bg="green.50"
              px="3"
              py="1.5"
              borderRadius="full"
              gap="2"
            >
              <FiClock size={14} color="#16a34a" />
              <Text fontSize="sm" color="green.700" fontWeight="600">
                {formatTimezone(user.time_zone)}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {/* Action Buttons */}
        <HStack gap="2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(user)}
            borderRadius="10px"
            p="2"
            minW="auto"
            h="auto"
            color="gray.500"
            _hover={{ 
              bg: 'blue.50', 
              color: 'blue.600',
              transform: 'scale(1.1)'
            }}
            transition="all 0.2s"
          >
            <FiEdit2 size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(user.id)}
            borderRadius="10px"
            p="2"
            minW="auto"
            h="auto"
            color="gray.500"
            disabled={isDeleting}
            _hover={{ 
              bg: 'red.50', 
              color: 'red.600',
              transform: 'scale(1.1)'
            }}
            transition="all 0.2s"
          >
            {isDeleting ? <Spinner size="sm" /> : <FiTrash2 size={18} />}
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
}

/**
 * Empty state component
 */
const EmptyState = () => (
  <Box
    textAlign="center"
    py="16"
    px="8"
    bg="gray.50"
    borderRadius="24px"
    border="2px dashed"
    borderColor="gray.200"
  >
    <Box
      w="80px"
      h="80px"
      mx="auto"
      mb="4"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      borderRadius="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <FiMapPin size={36} color="white" />
    </Box>
    <Text
      fontSize="xl"
      fontWeight="700"
      color="gray.700"
      mb="2"
      fontFamily="'DM Sans', sans-serif"
    >
      No users yet
    </Text>
    <Text color="gray.500" maxW="300px" mx="auto">
      Click the "Add User" button to add your first user with auto-fetched location data.
    </Text>
  </Box>
)

/**
 * Loading skeleton
 */
const LoadingSkeleton = () => (
  <VStack gap="4" align="stretch">
    {[1, 2, 3].map((i) => (
      <Box
        key={i}
        bg="white"
        borderRadius="16px"
        p="5"
        boxShadow="0 1px 3px rgba(0,0,0,0.08)"
        border="1px solid"
        borderColor="gray.100"
      >
        <HStack justify="space-between">
          <VStack align="flex-start" gap="3">
            <Box bg="gray.200" h="20px" w="150px" borderRadius="md" />
            <Box bg="gray.100" h="14px" w="100px" borderRadius="md" />
            <HStack gap="3">
              <Box bg="purple.100" h="28px" w="70px" borderRadius="full" />
              <Box bg="blue.100" h="28px" w="120px" borderRadius="full" />
              <Box bg="green.100" h="28px" w="80px" borderRadius="full" />
            </HStack>
          </VStack>
          <HStack gap="2">
            <Box bg="gray.100" h="36px" w="36px" borderRadius="10px" />
            <Box bg="gray.100" h="36px" w="36px" borderRadius="10px" />
          </HStack>
        </HStack>
      </Box>
    ))}
  </VStack>
)

/**
 * UserTable component - displays list of users with actions
 */
export const UserTable = ({
  users = [],
  isLoading = false,
  onEdit,
  onDelete,
  deletingUserId = null
}) => {
  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!users || users.length === 0) {
    return <EmptyState />
  }

  return (
    <VStack gap="4" align="stretch">
      {/* Table Header */}
      <HStack justify="space-between" px="2">
        <Text
          fontSize="sm"
          fontWeight="600"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          fontFamily="'DM Sans', sans-serif"
        >
          {users.length} User{users.length !== 1 ? 's' : ''}
        </Text>
      </HStack>

      {/* User Cards */}
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingUserId === user.id}
        />
      ))}
    </VStack>
  )
}

export default UserTable
