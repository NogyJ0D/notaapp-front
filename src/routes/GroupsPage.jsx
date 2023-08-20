import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { get } from '../api'
import Group from '../components/Group'
import { useUserStore } from '../store/userStore'

const GroupsPage = () => {
  const user = useUserStore(state => state);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([])

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    } else {
      loadUserGroups();
    }
  }, [])

  const loadUserGroups = async () => {
    const response = await get('/groups/user_id/' + user.id)
    setGroups(response)
  }

  const handleGroupClick = (id) => {
    navigate('/notes/' + id)
  }

  return (
    <div className='flex flex-col justify-between w-full place-self-start'>
      <div className='flex flex-row flex-wrap gap-10 p-6'>
        {groups.map((group) => (
          <Group
            key={group.id}
            name={group.name}
            onClick={() => handleGroupClick(group.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupsPage;