'use client';

import { Icons } from '@/lib/icons';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'film' | 'search' | 'bookmark' | 'clock';
  action?: {
    label: string;
    href: string;
  };
}

const EmptyState = ({ title, description, icon = 'film', action }: EmptyStateProps) => {
  const IconComponent = {
    film: Icons.Film,
    search: Icons.Search,
    bookmark: Icons.Bookmark,
    clock: Icons.Clock,
  }[icon];

  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <div className='mb-4 rounded-full bg-gray-800 p-6'>
        <IconComponent className='h-12 w-12 text-gray-500' />
      </div>
      <h3 className='mb-2 text-xl font-semibold text-white'>{title}</h3>
      <p className='mb-6 max-w-md text-gray-400'>{description}</p>
      {action && (
        <a
          href={action.href}
          className='rounded-full bg-purple-600 px-6 py-3 font-semibold text-white
                     transition-colors hover:bg-purple-500'
        >
          {action.label}
        </a>
      )}
    </div>
  );
};

export default EmptyState;
