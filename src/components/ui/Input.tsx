import { ComponentPropsWithoutRef } from 'react'
import { clsxm } from '../../utils/clsxm'

export default function Input({ className, ...props }: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={clsxm(
        'w-full rounded-md border-2 border-transparent bg-zinc-800 py-3 px-5 text-lg outline-none transition hover:border-indigo-800 focus:border-indigo-600 focus:shadow-2xl focus:shadow-indigo-500/50 focus:transition',
        className,
      )}
      {...props}
    />
  )
}
