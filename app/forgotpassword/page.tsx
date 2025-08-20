// Marimon, Kyr Djan R.
// IT101 - DL1

import { ForgotPassword } from '@/components/forgot-password'

export default function ForgotPasswordPage() {
  return (
        <div className="grid min-h-svh">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <ForgotPassword />
                    </div>
                </div>
            </div>
        </div>
  )
}
