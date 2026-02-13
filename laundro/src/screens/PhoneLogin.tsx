import { useState } from 'react'
import { auth } from '../services/firebase'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'

export default function PhoneLogin({ onLogin }: { onLogin: () => void }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmation, setConfirmation] = useState<any>(null)

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible' }
        
      )

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha
      )

      setConfirmation(result)
      alert('OTP sent!')
    } catch (error) {
      alert('Failed to send OTP')
    }
  }

  const verifyOtp = async () => {
    try {
      await confirmation.confirm(otp)
      onLogin()
    } catch (error) {
      alert('Invalid OTP')
    }
  }

  return (
    <div>
      <h2>Login with Phone</h2>

      {!confirmation ? (
        <>
          <input
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  )
}