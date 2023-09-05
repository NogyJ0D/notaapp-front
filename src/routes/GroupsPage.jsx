import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { get, post } from '../api'
import Group from '../components/Group'
import { useUserStore } from '../store/userStore'
import { useForm } from 'react-hook-form'

const GroupsPage = () => {
  const user = useUserStore(state => state);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user.id !== null) {
      loadUserGroups();
    } else {
      navigate('/login');
    }
  }, [user.id])

  const loadUserGroups = async () => {
    const response = await get('/groups/user_id/' + user.id)
    setGroups(response)
  }

  const handleGroupClick = (id) => {
    navigate('/notes/' + id)
  }

  const onSubmit = async ({ name }) => {
    if (name.length > 30 || name.length < 1) {
      return;
    }

    const response = await post('/groups', { name, user: {id: user.id} })
    if (response.id != null) {
      loadUserGroups();
    }
  }

  return (
    <div className='flex flex-col justify-between w-full place-self-start'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-4 p-2 mx-4 mt-2 rounded-md bg-slate-600'>
        <input
          type='text'
          id='name'
          placeholder='group name'
          className={`w-64 px-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
          {...register('name', {
            required: true,
            maxLength: 30
          })
          }
        ></input>
        <button className='px-2 py-1 text-white border border-black rounded-md bg-slate-500'>Add Group</button>
      </form>

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