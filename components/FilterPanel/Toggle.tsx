import React, { FunctionComponent } from 'react'
import { Switch } from '@headlessui/react'

interface ToggleProps {
  enabled: boolean
  label: string
  setEnabled: (boolean) => void
}

//  Here I'm using the headless UI <Switch /> component, however once I integrated it I realized the filter scenario I was working on is better served by the Listbox component.  This is because if you want to filter on a boolean flag, you actually want 3 options: (1) results where flag is TRUE, (2) results where flag is FALSE, (3) results where flag is either TRUE or FALSE

export const Toggle: FunctionComponent<ToggleProps> = ({
  enabled,
  label,
  setEnabled,
}: ToggleProps) => {
  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-indigo-800' : 'bg-gray-400'
        } relative inline-flex items-center h-9 rounded-full w-16 transition-colors ease-in-out duration-150  focus:outline-none`}
      >
        <span className='sr-only'>{label}</span>
        <span
          className={`${
            enabled ? 'translate-x-8' : 'translate-x-2'
          } inline-block w-6 h-6 bg-white rounded-full transform transition ease-in-out duration-150`}
        />
      </Switch>
    </div>
  )
}
