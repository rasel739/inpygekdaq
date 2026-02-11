'use client';

import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon' | 'pagination' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  active = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';

  const variants: Record<ButtonVariant, string> = {
    primary: 'rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-500',

    secondary: 'rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700',

    danger: 'text-sm text-red-400 hover:text-red-300',

    icon: 'rounded-full bg-gray-800 p-2 hover:bg-gray-700',

    pagination: active
      ? 'h-10 w-10 rounded-lg bg-purple-600 text-white'
      : 'h-10 w-10 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700',

    ghost: 'rounded-full bg-black/70 p-2 backdrop-blur-sm hover:bg-purple-600 hover:scale-110',
  };

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
