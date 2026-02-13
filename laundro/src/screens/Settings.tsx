import { useEffect, useState } from 'react'
import { getUserProfile, saveUserProfile } from '../services/userService'
import { auth } from '../services/firebase'

type Props = {
  onBack: () => void
}

export default function Settings({ onBack }: Props) {
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
      onBack()
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
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
          style={{ marginRight: 10 }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        <button onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  )
}