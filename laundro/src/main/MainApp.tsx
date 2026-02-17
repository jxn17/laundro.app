import { useState } from "react"
import Dashboard from "../screens/Dashboard"
import Reports from "../screens/Reports"
import CreateOrder from "../screens/CreateOrder"
import Settings from "../screens/Settings"
import BottomNav from "../layout/BottomNav"
import OrderFlow from "../screens/OrderFlow"

export default function MainApp() {
  const [tab, setTab] = useState("home")

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return (
          <Dashboard goToAddOrder={() => setTab("addOrder")} />
        )

      case "reports":
        return <Reports />

      case "settings":
        return <Settings />

      case "orderFlow":
        return (
          <OrderFlow
            onCancel={() => setTab("home")}
            onComplete={() => setTab("reports")}
          />
        )

      default:
        return (
          <Dashboard goToAddOrder={() => setTab("orderFlow")} />
        )
    }
  }

  return (
    <div className="app-container">
      {renderScreen()}
      {tab !== "orderFlow" && (
  <button
    onClick={() => setTab("orderFlow")}
    style={{
      position: "fixed",
      bottom: 90,
      right: 20,
      background: "#4f46e5",
      color: "white",
      borderRadius: "50%",
      width: 56,
      height: 56,
      fontSize: 24,
      border: "none",
      cursor: "pointer",
      zIndex: 1000
    }}
  >
    +
  </button>
)}

      {/* Hide bottom nav when adding order */}
      {tab !== "addOrder" && (
        <BottomNav current={tab} setTab={setTab} />
      )}
    </div>
  )
}