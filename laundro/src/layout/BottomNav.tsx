type Props = {
  current: string
  setTab: (tab: string) => void
}

export default function BottomNav({ current, setTab }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 420,
        margin: "auto",
        display: "flex",
        justifyContent: "space-around",
        background: "white",
        borderTop: "1px solid #eee",
        padding: "10px 0"
      }}
    >
      <NavButton
        active={current === "home"}
        label="Home"
        icon="🏠"
        onClick={() => setTab("home")}
      />

      <NavButton
        active={current === "reports"}
        label="Reports"
        icon="📋"
        onClick={() => setTab("reports")}
      />

      <NavButton
        active={current === "settings"}
        label="Settings"
        icon="⚙️"
        onClick={() => setTab("settings")}
      />
    </div>
  )
}

function NavButton({
  active,
  label,
  icon,
  onClick
}: {
  active: boolean
  label: string
  icon: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 12,
        color: active ? "#4f46e5" : "#666"
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </button>
  )
}