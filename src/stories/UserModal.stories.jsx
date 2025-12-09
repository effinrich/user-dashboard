import { useState } from 'react'
import { Button, Box } from '@chakra-ui/react'
import { UserModal } from '../components/UserModal'

export default {
  title: 'Components/UserModal',
  component: UserModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    mode: {
      control: 'select',
      options: ['add', 'edit'],
      description: 'Modal mode - add new user or edit existing',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state on submit button',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
}

// Interactive story with controls
const InteractiveTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box>
      <Button
        onClick={() => setIsOpen(true)}
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        px="6"
        py="5"
        borderRadius="12px"
        fontWeight="600"
        _hover={{ opacity: 0.9 }}
      >
        Open Modal
      </Button>
      <UserModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          console.log('Form submitted:', data)
          alert(`Submitted: ${JSON.stringify(data, null, 2)}`)
          setIsOpen(false)
        }}
      />
    </Box>
  )
}

export const AddUserMode = InteractiveTemplate.bind({})
AddUserMode.args = {
  mode: 'add',
  isLoading: false,
  error: null,
}

export const EditUserMode = InteractiveTemplate.bind({})
EditUserMode.args = {
  mode: 'edit',
  isLoading: false,
  error: null,
  initialData: {
    id: '12345678-abcd-efgh-ijkl-mnopqrstuvwx',
    name: 'John Doe',
    zip_code: '37643',
  },
}

export const WithLoadingState = InteractiveTemplate.bind({})
WithLoadingState.args = {
  mode: 'add',
  isLoading: true,
  error: null,
}

export const WithError = InteractiveTemplate.bind({})
WithError.args = {
  mode: 'add',
  isLoading: false,
  error: 'Invalid zip code: 00000',
}

// Static preview (always open)
export const StaticPreview = () => (
  <Box width="500px" height="600px" position="relative">
    <UserModal
      isOpen={true}
      onClose={() => {}}
      onSubmit={() => {}}
      mode="add"
      isLoading={false}
      error={null}
    />
  </Box>
)
StaticPreview.parameters = {
  layout: 'fullscreen',
}
