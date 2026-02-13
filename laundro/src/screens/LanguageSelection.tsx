type Props = {
  onSelect: () => void
}

export default function LanguageSelection({ onSelect }: Props) {
  const selectLanguage = (lang: string) => {
    localStorage.setItem('lang', lang)
    onSelect()
  }

  return (
    <div>
      <h2>Choose a language</h2>

      <button onClick={() => selectLanguage('en')}>English</button>
      <button onClick={() => selectLanguage('hi')}>हिंदी</button>
      <button onClick={() => selectLanguage('kn')}>ಕನ್ನಡ</button>
    </div>
  )
}
