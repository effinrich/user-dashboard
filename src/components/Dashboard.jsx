import { useState, useEffect } from 'react'
import { Box, Button, Text, HStack, VStack } from '@chakra-ui/react'
import { FiPlus, FiUsers, FiRefreshCw } from 'react-icons/fi'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers'
import { supabase, USERS_TABLE } from '../lib/supabase'
import UserTable from './UserTable'
import UserModal from './UserModal'

/**
 * Main Dashboard component
 */
export const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUserId, setDeletingUserId] = useState(null)

  // React Query hooks
  const { data: users, isLoading, error: fetchError, refetch } = useUsers()
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const deleteMutation = useDeleteUser()

  // Set up Supabase real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('users_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: USERS_TABLE
        },
        (payload) => {
          console.log('Real-time update:', payload)
          refetch() // Refetch users on any change
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refetch])

  // Handle add user
  const handleAddUser = async (data) => {
    try {
      await createMutation.mutateAsync({
        name: data.name,
        zipCode: data.zipCode
      })
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }

  // Handle edit user
  const handleEditUser = async (data) => {
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        name: data.name,
        zipCode: data.zipCode,
        originalZipCode: data.originalZipCode
      })
      setIsEditModalOpen(false)
      setEditingUser(null)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    try {
      setDeletingUserId(userId)
      await deleteMutation.mutateAsync(userId)
    } catch (error) {
      console.error('Failed to delete user:', error)
    } finally {
      setDeletingUserId(null)
    }
  }

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
      fontFamily="'DM Sans', sans-serif"
    >
      {/* Header */}
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        pt="12"
        pb="32"
        px="6"
      >
        <Box maxW="1200px" mx="auto">
          <HStack justify="space-between" align="flex-start">
            <VStack align="flex-start" gap="1">
              <HStack gap="3">
                <Box
                  bg="rgba(255,255,255,0.2)"
                  p="2.5"
                  borderRadius="12px"
                >
                  <FiUsers size={24} color="white" />
                </Box>
                <Text
                  fontSize="3xl"
                  fontWeight="800"
                  color="white"
                  letterSpacing="-0.5px"
                >
                  User Dashboard
                </Text>
              </HStack>
              <Text color="rgba(255,255,255,0.8)" fontSize="md">
                Manage users with auto-fetched location data
              </Text>
            </VStack>

            <HStack gap="3">
              <Button
                onClick={() => refetch()}
                variant="ghost"
                color="white"
                borderRadius="12px"
                px="4"
                py="5"
                _hover={{ bg: 'rgba(255,255,255,0.15)' }}
                leftIcon={<FiRefreshCw size={18} />}
              >
                Refresh
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                bg="white"
                color="#667eea"
                borderRadius="12px"
                px="6"
                py="5"
                fontWeight="700"
                boxShadow="0 10px 30px rgba(0,0,0,0.15)"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                leftIcon={<FiPlus size={20} />}
              >
                Add User
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        maxW="1200px"
        mx="auto"
        px="6"
        mt="-24"
        pb="12"
      >
        <Box
          bg="white"
          borderRadius="24px"
          boxShadow="0 10px 40px rgba(0,0,0,0.08)"
          p="8"
          minH="500px"
        >
          {/* Error Display */}
          {fetchError && (
            <Box
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="12px"
              p="4"
              mb="6"
            >
              <Text color="red.600" fontWeight="500">
                Failed to fetch users: {fetchError.message}
              </Text>
            </Box>
          )}

          {/* User Table */}
          <UserTable
            users={users}
            isLoading={isLoading}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
            deletingUserId={deletingUserId}
          />
        </Box>
      </Box>

      {/* Add User Modal */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        isLoading={createMutation.isPending}
        error={createMutation.error?.message}
        mode="add"
      />

      {/* Edit User Modal */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingUser(null)
        }}
        onSubmit={handleEditUser}
        isLoading={updateMutation.isPending}
        error={updateMutation.error?.message}
        initialData={editingUser}
        mode="edit"
      />
    </Box>
  )
}

export default Dashboard
