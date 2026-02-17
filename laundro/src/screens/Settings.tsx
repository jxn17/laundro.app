import { useEffect, useState } from 'react'
import { getUserProfile, saveUserProfile } from '../services/userService'
import { auth } from '../services/firebase'
import { signOut } from "firebase/auth"


export default function Settings() {
  const [businessName, setBusinessName] = useState('')
  const [upiId, setUpiId] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const profile = await getUserProfile()

      if (profile) {
        setBusinessName(profile.businessName || '')
        setUpiId(profile.upiId || '')
      } else {
        setBusinessName('My Laundry')
        setUpiId('')
      }

      setLoading(false)
    }

    load()
  }, [])

  const handleSave = async () => {
    if (!businessName.trim()) {
      alert('Business name is required')
      return
    }

    if (!upiId.trim()) {
      alert('UPI ID is required')
      return
    }

    try {
      setSaving(true)

      await saveUserProfile({
        businessName,
        upiId,
        phone: auth.currentUser?.phoneNumber || ''
      })

      alert('Settings saved!')
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Business Settings</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Business Name</label>
        <input
          style={{ width: '100%', padding: 8, marginTop: 4 }}
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>UPI ID</label>
        <input
          style={{ width: '100%', padding: 8, marginTop: 4 }}
          placeholder="example@upi"
          value={upiId}
          onChange={e => setUpiId(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
        style={{
            marginTop: 20,
            background: "#ef4444",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
        }}
        onClick={async () => {
            const ok = window.confirm("Logout?")
            if (!ok) return
            await signOut(auth)
        }}
        >
        Logout
        </button>
      </div>
    </div>
  )
}