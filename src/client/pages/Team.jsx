import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';

export function Team() {
  const { data: teams, isLoading, error } = useQuery(getTeams);
  const createTeamFn = useAction(createTeam);
  const [newTeamName, setNewTeamName] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTeam = () => {
    createTeamFn({ name: newTeamName });
    setNewTeamName('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Team'
          className='px-1 py-2 border rounded text-lg'
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
        />
        <button
          onClick={handleCreateTeam}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Team
        </button>
      </div>
      <div>
        {teams.map((team) => (
          <div
            key={team.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{team.name}</div>
            <div>
              <button
                onClick={() => deleteTeamFn({ teamId: team.id })}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Delete
              </button>
              <Link
                to={`/team/${team.id}`}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}