import { useState } from "react"
import { auth } from "../services/firebase"
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth"

export default function PhoneLogin() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [confirmation, setConfirmation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    try {
      setLoading(true)

        const recaptcha = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible"
          }
        )

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha
      )

      setConfirmation(result)
      alert("OTP sent!")

    } catch (error) {
      console.error(error)
      alert("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {
      if (!confirmation) return

      setLoading(true)
      await confirmation.confirm(otp)

      // ✅ No onLogin needed
      // AuthGate will automatically detect login

    } catch (error) {
      alert("Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login with Phone</h2>

      {!confirmation ? (
        <>
          <input
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  )
}