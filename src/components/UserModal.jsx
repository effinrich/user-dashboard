import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Spinner
} from '@chakra-ui/react'
import { FiX, FiUser, FiMapPin } from 'react-icons/fi'

/**
 * Modal component for adding or editing a user
 */
export const UserModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = null,
  mode = 'add' // 'add' or 'edit'
}) => {
  const [name, setName] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [formError, setFormError] = useState('')

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || '')
        setZipCode(initialData.zip_code || '')
      } else {
        setName('')
        setZipCode('')
      }
      setFormError('')
    }
  }, [isOpen, initialData])

  const validateForm = () => {
    if (!name.trim()) {
      setFormError('Name is required')
      return false
    }
    if (!zipCode.trim()) {
      setFormError('Zip code is required')
      return false
    }
    if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
      setFormError('Please enter a valid US zip code (e.g., 37643 or 37643-1234)')
      return false
    }
    setFormError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      name: name.trim(),
      zipCode: zipCode.trim(),
      ...(initialData && { 
        id: initialData.id,
        originalZipCode: initialData.zip_code
      })
    })
  }

  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.6)"
      backdropFilter="blur(8px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
      onClick={onClose}
      animation="fadeIn 0.2s ease-out"
    >
      <Box
        bg="white"
        borderRadius="24px"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        maxW="480px"
        w="90%"
        p="0"
        onClick={(e) => e.stopPropagation()}
        animation="slideUp 0.3s ease-out"
        overflow="hidden"
      >
        {/* Header */}
        <Box
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          p="6"
          position="relative"
        >
          <Button
            position="absolute"
            top="4"
            right="4"
            onClick={onClose}
            variant="ghost"
            size="sm"
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            borderRadius="full"
            p="2"
            minW="auto"
            h="auto"
          >
            <FiX size={20} />
          </Button>
          <Text
            fontSize="2xl"
            fontWeight="700"
            color="white"
            fontFamily="'DM Sans', sans-serif"
          >
            {mode === 'add' ? 'Add New User' : 'Edit User'}
          </Text>
          <Text color="rgba(255,255,255,0.8)" fontSize="sm" mt="1">
            {mode === 'add' 
              ? 'Enter user details below. Location data will be auto-fetched.'
              : 'Update user information. Location updates if zip code changes.'}
          </Text>
        </Box>

        {/* Form */}
        <Box p="6">
          <form onSubmit={handleSubmit}>
            <VStack gap="5" align="stretch">
              {/* Name Input */}
              <Box>
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  color="gray.600" 
                  mb="2"
                  fontFamily="'DM Sans', sans-serif"
                >
                  Full Name
                </Text>
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
                  transition="all 0.2s"
                >
                  <FiUser color="#9CA3AF" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    border="none"
                    bg="transparent"
                    py="3"
                    px="2"
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    fontFamily="'DM Sans', sans-serif"
                  />
                </HStack>
              </Box>

              {/* Zip Code Input */}
              <Box>
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  color="gray.600" 
                  mb="2"
                  fontFamily="'DM Sans', sans-serif"
                >
                  Zip Code
                </Text>
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
                  transition="all 0.2s"
                >
                  <FiMapPin color="#9CA3AF" />
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g., 37643"
                    border="none"
                    bg="transparent"
                    py="3"
                    px="2"
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    fontFamily="'DM Sans', sans-serif"
                  />
                </HStack>
                <Text fontSize="xs" color="gray.500" mt="2">
                  Location data (lat, lng, timezone) will be fetched automatically
                </Text>
              </Box>

              {/* Error Messages */}
              {(formError || error) && (
                <Box
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.200"
                  borderRadius="12px"
                  p="3"
                >
                  <Text color="red.600" fontSize="sm" fontFamily="'DM Sans', sans-serif">
                    {formError || error}
                  </Text>
                </Box>
              )}

              {/* Action Buttons */}
              <HStack gap="3" pt="2">
                <Button
                  flex="1"
                  variant="outline"
                  onClick={onClose}
                  borderRadius="12px"
                  py="6"
                  fontWeight="600"
                  fontFamily="'DM Sans', sans-serif"
                  borderWidth="2px"
                  _hover={{ bg: 'gray.50' }}
                >
                  Cancel
                </Button>
                <Button
                  flex="1"
                  type="submit"
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  color="white"
                  borderRadius="12px"
                  py="6"
                  fontWeight="600"
                  fontFamily="'DM Sans', sans-serif"
                  disabled={isLoading}
                  _hover={{ 
                    opacity: 0.9,
                    transform: 'translateY(-1px)',
                    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                >
                  {isLoading ? (
                    <HStack gap="2">
                      <Spinner size="sm" />
                      <Text>{mode === 'add' ? 'Adding...' : 'Updating...'}</Text>
                    </HStack>
                  ) : (
                    mode === 'add' ? 'Add User' : 'Save Changes'
                  )}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Box>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </Box>
  )
}

export default UserModal
