import saveTag from '@Core/Tag/infrastructure/Api/CreateTagGroup'
import { PlusIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const TagInput = ({ realm }: {realm: string}) => {
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [tagName, setTagName] = useState('')

  return <div className="flex w-auto items-center space-x-2">
    <Input
      className={'w-[8rem]'}
      name="name"
      onChange={event => setTagName(event.target.value)}
      placeholder="Create Tag..."
    />
    {
      submitting
        ? <Progress/>
        : <Button onClick={async () => {
          setSubmitting(true)
          await saveTag({ tagName, realm, owner: session?.user?.email, group: '' })
          setSubmitting(false)
        }}>
          <PlusIcon/>
        </Button>
    }
  </div>
}

export default TagInput
