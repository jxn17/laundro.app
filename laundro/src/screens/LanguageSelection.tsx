import { useTranslation } from 'react-i18next'

type Props = {
  onSelect: () => void
}

export default function LanguageSelection({ onSelect }: Props) {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    onSelect()
  }

  return (
    <div>
      <h2>{t('language.select')}</h2>

      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
      <button onClick={() => changeLanguage('kn')}>ಕನ್ನಡ</button>
    </div>
  )
}