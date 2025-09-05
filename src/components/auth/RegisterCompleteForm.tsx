'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/ui/button/Button'

export default function RegisterCompleteForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const success = searchParams.get('success') === '1'

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5" />

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto items-center">
        {success ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center text-green-600">
              🎉 Registration Successful!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              You can now sign in with your credentials.
            </p>
            <Button onClick={() => router.push('/signin')} className="w-full max-w-sm">
              Go to Sign In
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center text-red-600">
              Something went wrong!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please try registering again.
            </p>
            <Button onClick={() => router.push('/signin')} className="w-full max-w-sm">
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
