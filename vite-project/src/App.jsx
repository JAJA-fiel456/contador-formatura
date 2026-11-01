import { useEffect, useState } from 'react'
import './App.css'

function getDefaultDate() {
  const now = new Date()
  const year = now.getMonth() >= 11 && now.getDate() > 18
    ? now.getFullYear() + 1
    : now.getFullYear()

  return `${year}-12-18`
}

function getDateAtEndOfDay(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day, 23, 59, 59)
}

function App() {
  const [targetDate, setTargetDate] = useState(getDefaultDate)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const remainingSeconds = Math.max(
    0,
    Math.floor((getDateAtEndOfDay(targetDate).getTime() - now) / 1000),
  )
  const countdown = [
    { label: 'dias', value: Math.floor(remainingSeconds / 86400) },
    { label: 'horas', value: Math.floor((remainingSeconds % 86400) / 3600) },
    { label: 'minutos', value: Math.floor((remainingSeconds % 3600) / 60) },
    { label: 'segundos', value: remainingSeconds % 60 },
  ]

  return (
    <main className="page-shell">
      <header className="topline">
        <a className="wordmark" href="#inicio" aria-label="Tempo de ciclo, início">
          <span className="wordmark-mark" aria-hidden="true">T</span>
          <span>TEMPO DE CICLO</span>
        </a>
        <span className="topline-note">INSPIRADO NA ARTE MAIA E MEXICA</span>
      </header>

      <section className="countdown-layout" id="inicio" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow"><span /> O TEMPO SEGUE SEU CURSO</p>
          <h1 id="page-title">O fim de um ciclo.<br /><em>O começo de tantos outros.</em></h1>
          <p className="intro-copy">
            Cada segundo aproxima você de novas histórias, caminhos e conquistas.
          </p>
          <label className="date-control">
            <span>DATA DO ENCERRAMENTO</span>
            <input
              type="date"
              value={targetDate}
              onChange={(event) => {
                if (event.target.value) setTargetDate(event.target.value)
              }}
            />
          </label>
        </div>

        <div className="stone-tablet">
          <div className="tablet-topline">
            <span>FIM DO SEMESTRE</span>
            <span className="sun-mark" aria-hidden="true">✳</span>
            <span>ANO <b>{targetDate.slice(0, 4)}</b></span>
          </div>

          <div className="calendar-face" aria-hidden="true">
            <div className="calendar-ring ring-outer" />
            <div className="calendar-ring ring-middle" />
            <div className="calendar-ring ring-inner" />
            <div className="calendar-glyph">KIN · OLLIN</div>
            <div className="calendar-center"><span>✹</span></div>
            {Array.from({ length: 20 }, (_, index) => (
              <span
                className={`day-mark${index % 5 === 0 ? ' day-mark-major' : ''}`}
                key={index}
                style={{ '--mark-angle': `${index * 18}deg` }}
              />
            ))}
          </div>

          <div className="tablet-caption">
            <span>FALTAM</span>
            <span className="caption-rule" />
            <span>ATÉ O PRÓXIMO HORIZONTE</span>
          </div>

          <div className="countdown" aria-label="Tempo restante até o fim do semestre">
            {countdown.map(({ label, value }) => (
              <div className="time-unit" key={label}>
                <span className="time-value">{String(value).padStart(2, '0')}</span>
                <span className="time-label">{label}</span>
              </div>
            ))}
          </div>

          <p className="tablet-footer">
            {remainingSeconds === 0 ? 'UM NOVO CICLO COMEÇA AGORA' : 'CADA INSTANTE CONTA'}
          </p>
        </div>
      </section>

      <footer className="page-footer">
        <span>O TEMPO É UM CAMINHO, NÃO UMA LINHA DE CHEGADA.</span>
        <span className="footer-symbol" aria-hidden="true">◈</span>
        <span>VIVA O QUE VEM A SEGUIR.</span>
      </footer>
    </main>
  )
}

export default App
