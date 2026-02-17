import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import PhoneLogin from "./PhoneLogin";
import LanguageSelection from "./LanguageSelection";
import MainApp from "../main/MainApp";
import i18n from "../i18n";

export default function AuthGate() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [needsLanguage, setNeedsLanguage] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      const data = snap.data();

      if (!data?.preferredLanguage) {
        setNeedsLanguage(true);
      } else {
        i18n.changeLanguage(data.preferredLanguage);
        setNeedsLanguage(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <PhoneLogin />;
  if (needsLanguage) return <LanguageSelection />;

  return <MainApp />;
}