import { FileExclamationPoint } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}
const ErrorState = ({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <div className='mb-4 rounded-full bg-red-900/30 p-6'>
        <FileExclamationPoint className='h-12 w-12 text-red-500' />
      </div>
      <h3 className='mb-2 text-xl font-semibold text-white'>{title}</h3>
      <p className='mb-6 max-w-md text-gray-400'>{message}</p>
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  );
};

export default ErrorState;
