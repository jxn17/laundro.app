import { doc, setDoc } from "firebase/firestore"
import { auth } from "../services/firebase"
import { db } from "../services/firebase"
import i18n from "../i18n"

export default function LanguageSelection() {
  const selectLanguage = async (lang: string) => {
    const user = auth.currentUser
    if (!user) return

    try {
      // Save to Firestore (SaaS persistent storage)
      await setDoc(
        doc(db, "users", user.uid),
        { preferredLanguage: lang },
        { merge: true }
      )

      // Change language immediately in UI
      await i18n.changeLanguage(lang)

      // Optional: reload so AuthGate re-checks
      window.location.reload()

    } catch (error) {
      console.error("Error saving language:", error)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Choose a language</h2>

      <button onClick={() => selectLanguage("en")}>
        English
      </button>

      <button onClick={() => selectLanguage("hi")}>
        हिंदी
      </button>

      <button onClick={() => selectLanguage("kn")}>
        ಕನ್ನಡ
      </button>
    </div>
  )
}