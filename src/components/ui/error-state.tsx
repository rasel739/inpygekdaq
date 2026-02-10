import { FileExclamationPoint } from 'lucide-react';

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
      {onRetry && (
        <button
          onClick={onRetry}
          className='rounded-full bg-purple-600 px-6 py-3 font-semibold text-white
                     transition-colors hover:bg-purple-500'
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
