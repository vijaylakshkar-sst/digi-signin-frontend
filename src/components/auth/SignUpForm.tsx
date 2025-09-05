'use client'

import Checkbox from '@/components/form/input/Checkbox'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import { ChevronLeftIcon,EyeCloseIcon, EyeIcon } from '@/icons'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendOtpApi } from '@/api/auth/sendOtp'

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!fullname.trim()) newErrors.fullname = 'Full name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email address'

    if (!mobile.trim()) newErrors.mobile = 'Mobile is required'
    else if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = 'Enter 10-digit mobile number'

    if (!address.trim()) newErrors.address = 'Address is required'

    if (!password.trim()) newErrors.password = 'Password is required'
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    if (!isChecked)
      newErrors.terms = 'Please accept the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await sendOtpApi({ email, mobile, type: 'register' })
      if (res.status) {
        localStorage.setItem('register_fullname', fullname)
        localStorage.setItem('register_email', email)
        localStorage.setItem('register_mobile', mobile)
        localStorage.setItem('register_password', password)
        localStorage.setItem('register_address', address)
        router.push('/verify')
      } else {
        setErrors({ general: res.message })
      }
    } catch (err: any) {
      setErrors({ general: err.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: string,
      validator?: (val: string) => boolean
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setter(value)

      if (errors[field]) {
        if (validator) {
          if (validator(value)) {
            setErrors((prev) => {
              const copy = { ...prev }
              delete copy[field]
              return copy
            })
          }
        } else if (value.trim() !== '') {
          setErrors((prev) => {
            const copy = { ...prev }
            delete copy[field]
            return copy
          })
        }
      }
    }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5" />
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to Website
        </Link>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to sign up!
            </p>
          </div>

          {errors.general && (
            <p className="text-sm text-red-500 mb-4">{errors.general}</p>
          )}

          <form onSubmit={handleSendOtp}>
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <Label>
                  Full Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={fullname}
                  placeholder="Enter your full name"
                  onChange={handleChange(setFullname, 'fullname')}
                  className={
                    errors.fullname
                      ? 'border border-red-500'
                      : fullname
                      ? 'border border-green-500'
                      : ''
                  }
                />
                {errors.fullname && (
                  <p className="text-sm text-red-500">{errors.fullname}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleChange(
                    setEmail,
                    'email',
                    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
                  )}
                  className={
                    errors.email
                      ? 'border border-red-500'
                      : email
                      ? 'border border-green-500'
                      : ''
                  }
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <Label>
                  Mobile<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="tel"
                  value={mobile}
                  placeholder="Enter your mobile number"
                  onChange={handleChange(setMobile, 'mobile', (val) =>
                    /^\d{10}$/.test(val)
                  )}
                  className={
                    errors.mobile
                      ? 'border border-red-500'
                      : mobile
                      ? 'border border-green-500'
                      : ''
                  }
                />
                {errors.mobile && (
                  <p className="text-sm text-red-500">{errors.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <Label>
                  Address<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={address}
                  placeholder="Enter your address"
                  onChange={handleChange(setAddress, 'address')}
                  className={
                    errors.address
                      ? 'border border-red-500'
                      : address
                      ? 'border border-green-500'
                      : ''
                  }
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange(
                      setPassword,
                      'password',
                      (val) => val.length >= 6
                    )}
                    className={
                      errors.password
                        ? 'border border-red-500'
                        : password
                        ? 'border border-green-500'
                        : ''
                    }
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={(val) => {
                    setIsChecked(val)
                    if (errors.terms && val) {
                      setErrors((prev) => {
                        const copy = { ...prev }
                        delete copy.terms
                        return copy
                      })
                    }
                  }}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account you agree to the{' '}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions
                  </span>{' '}
                  and our{' '}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 mt-1">{errors.terms}</p>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
