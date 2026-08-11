"use client";

import { useEffect, useRef, useState } from "react";

const documents = {
  convention: "/assets/documents/convencao-de-condominio-sensia.pdf",
  regiment: "/assets/documents/regimento-interno-sensia.pdf",
  curtain: "/assets/references/modelo-cortina-de-vidro.jpeg",
};

function Icon({ children, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

function BrandLockup({ inverse = false }) {
  return (
    <span className={`brand-lockup inline-flex items-center gap-3 no-underline ${inverse ? "text-white" : "text-ink"}`}>
      <span className="brand-mark grid size-[2.65rem] place-items-center rounded-full border border-current text-[.62rem] font-extrabold tracking-[.08em]" aria-hidden="true">S/H</span>
      <span className="grid gap-[.05rem]">
        <strong className="font-display text-[1.35rem] font-medium leading-none tracking-[.01em]">Sensia</strong>
        <small className={`text-[.63rem] font-bold uppercase leading-[1.3] tracking-[.1em] ${inverse ? "text-white/60" : "text-muted"}`}>Horizontes do Atlântico</small>
      </span>
    </span>
  );
}

function LoadingView() {
  return (
    <main className="grid min-h-dvh place-items-center bg-stone p-6">
      <div className="grid justify-items-center gap-4 text-center">
        <BrandLockup />
        <p className="m-0 text-[.78rem] text-muted">Verificando seu acesso...</p>
      </div>
    </main>
  );
}

function AuthView({ onSubmit, error, submitting }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="auth-view grid min-h-dvh grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] bg-ink max-[780px]:block" aria-labelledby="auth-title">
      <section className="auth-copy relative flex min-h-full flex-col justify-between bg-ink p-[clamp(2rem,6vw,5.75rem)] text-white max-[1000px]:p-12 max-[780px]:min-h-[22rem] max-[780px]:px-6 max-[780px]:py-8">
        <BrandLockup inverse />

        <div className="auth-message relative z-10 my-auto max-w-[35rem] py-12 max-[780px]:mt-[2.7rem] max-[780px]:mb-0 max-[780px]:p-0">
          <p className="eyebrow m-0 mb-3.5 text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-[#e5c79b]">Guia do morador</p>
          <h1 className="max-w-[15ch] font-display text-[clamp(2.7rem,5vw,5rem)] font-normal leading-[.99] tracking-[-.045em] text-balance" id="auth-title">As informações que você mais procura, sempre à mão.</h1>
          <p className="mt-6 max-w-[32rem] text-[1.04rem] text-pretty text-white/70 max-[780px]:mt-4 max-[780px]:text-[.9rem]">Um espaço privado para consultar procedimentos, senhas das áreas comuns, contatos e documentos importantes.</p>
        </div>

        <p className="auth-note m-0 flex items-center gap-2 text-[.79rem] text-white/60 max-[780px]:hidden">
          <span className="note-dot size-[.48rem] rounded-full bg-[#8fb9a8]" aria-hidden="true"></span>
          Acesso reservado aos moradores
        </p>
      </section>

      <section className="auth-card-wrap grid min-h-dvh place-items-center bg-stone p-[clamp(1.5rem,6vw,5rem)] max-[780px]:min-h-0 max-[780px]:p-6">
        <div className="auth-card w-[min(100%,29rem)] rounded-[1.35rem] border border-ink/10 bg-white p-[clamp(1.7rem,4vw,3rem)] shadow-sensia max-[780px]:w-[min(100%,34rem)]">
          <div className="auth-card-heading flex items-center gap-4">
            <span className="icon-badge grid size-12 place-items-center rounded-[.8rem] bg-sand text-sand-deep" aria-hidden="true">
              <Icon>
                <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10M6 10h12v10H6z" />
                <path d="M12 14v2" />
              </Icon>
            </span>
            <div className="grid gap-[.05rem]">
              <p className="eyebrow m-0 mb-[.42rem] text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">Área protegida</p>
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.15rem)] font-normal leading-[1.05] tracking-[-.035em] text-balance">Entrar no guia</h2>
            </div>
          </div>

          <p className="auth-card-intro mt-8 text-[.92rem] text-ink-soft">Digite a senha compartilhada pela administração.</p>

          <form className="auth-form mt-[1.45rem]" onSubmit={(event) => onSubmit(event, password)}>
            <label className="mb-[.55rem] block text-[.78rem] font-extrabold" htmlFor="password">Senha de acesso</label>
            <div className="input-wrap relative">
              <input
                className="min-h-[3.25rem] w-full rounded-[.65rem] border border-[#d5d6d0] bg-[#fcfcfa] px-4 py-3 pr-12 text-[.92rem] text-ink outline-none placeholder:text-[#9ba6a7] focus:border-teal focus:ring-4 focus:ring-teal/15"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                aria-describedby="password-error"
              />
              <button className="password-toggle absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center border-0 bg-transparent p-0 text-ink-soft" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                <Icon>
                  <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </Icon>
              </button>
            </div>
            <p className="form-error min-h-[1.4rem] mt-[.45rem] text-[.78rem] text-danger" id="password-error" role="alert" aria-live="polite">{error}</p>
            <button className="button button--primary button--full inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[.55rem] border border-transparent bg-coral px-[1.15rem] py-3 text-[.79rem] font-extrabold text-white no-underline hover:bg-coral-dark focus-visible:bg-coral-dark disabled:cursor-wait disabled:opacity-70" type="submit" disabled={submitting}>
              {submitting ? "Verificando..." : "Acessar guia"}
              <Icon>
                <path d="M5 12h13M13 6l6 6-6 6" />
              </Icon>
            </button>
          </form>

          <p className="auth-card-footer mt-7 flex gap-2 border-t border-line pt-5 text-[.72rem] text-muted text-pretty"><span className="text-sand-deep" aria-hidden="true">✦</span>Em caso de dúvida, fale com a administração.</p>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ eyebrow, title, id, icon, compact = false }) {
  return (
    <div className={`flex items-start justify-between gap-4 border-b border-line pb-5 ${compact ? "section-heading--compact" : ""}`}>
      <div>
        <p className="m-0 mb-[.6rem] text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">{eyebrow}</p>
        <h2 className="font-display text-[clamp(1.65rem,3vw,2.25rem)] font-normal leading-[1.05] tracking-[-.035em] text-balance" id={id}>{title}</h2>
      </div>
      {icon ? <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-soft text-[.68rem] font-black text-teal" aria-hidden="true">{icon}</span> : null}
    </div>
  );
}

function OverviewCard({ href, label, value, caption, icon, accent = "" }) {
  return (
    <a className={`overview-card flex min-h-[8.2rem] items-start gap-4 rounded-[.9rem] border bg-white p-[1.35rem] text-ink no-underline shadow-card hover:border-coral focus-visible:outline-[3px] focus-visible:outline-coral/40 focus-visible:outline-offset-3 ${accent ? "border-[#ead9bd] bg-[#fffaf2]" : "border-line"}`} href={href}>
      <div className={`card-icon grid size-[2.4rem] shrink-0 place-items-center rounded-[.65rem] ${accent === "teal" ? "bg-teal-soft text-teal" : accent === "blue" ? "bg-blue-soft text-blue" : "bg-sand text-sand-deep"}`} aria-hidden="true">{icon}</div>
      <div>
        <p className="card-label m-0 text-[.72rem] text-muted">{label}</p>
        <p className="card-value mb-[.15rem] mt-1 font-display text-[1.15rem] leading-[1.1] text-ink text-balance">{value}</p>
        <p className="card-caption m-0 text-[.72rem] text-muted">{caption}</p>
      </div>
    </a>
  );
}

function CopyButton({ value, copied, onCopy }) {
  return (
    <button className="copy-button shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[.65rem] font-extrabold text-ink hover:border-coral hover:text-coral focus-visible:outline-[3px] focus-visible:outline-coral/40 focus-visible:outline-offset-3" type="button" onClick={() => onCopy(value)}>{copied ? "Copiada" : "Copiar"}</button>
  );
}

function WifiRow({ item, copied, onCopy }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-3 py-3">
      <div><span className="block text-[.7rem] font-extrabold text-ink">{item.name}</span><code className="mt-1 block font-mono text-[.78rem] text-teal">{item.password}</code></div>
      <CopyButton value={item.password} copied={copied === item.password} onCopy={onCopy} />
    </div>
  );
}

function ContactRow({ item }) {
  return (
    <div className="contact-row grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b border-line py-3 last:border-b-0">
      <span className="contact-label col-span-full text-[.63rem] font-extrabold uppercase tracking-[.1em] text-muted">{item.label}</span>
      <span className="contact-value-group grid justify-items-end gap-[.18rem] self-center">
        {item.phone ? <a className="contact-link text-right text-[.76rem] font-extrabold text-ink no-underline hover:text-coral" href={`tel:${item.phone.replace(/\D/g, "")}`}>{item.phone}</a> : null}
        {item.email ? <a className="contact-link max-w-[15rem] break-all text-right text-[.7rem] font-extrabold text-ink no-underline hover:text-coral" href={`mailto:${item.email}`}>{item.email}</a> : null}
      </span>
      <small className="self-center text-right text-[.7rem] text-muted text-pretty">{item.use}</small>
    </div>
  );
}

function PortalView({ guide, onLogout, onCopy, copied }) {
  const facialEmailLink = `mailto:${guide.facial.email}?subject=${encodeURIComponent(guide.facial.subject)}`;

  return (
    <div className="portal-view">
      <header className="topbar relative z-10 border-b border-line bg-paper/95">
        <div className="topbar-inner mx-auto flex min-h-[5.4rem] w-[min(100%-3rem,78rem)] items-center justify-between gap-8 max-[780px]:min-h-0 max-[780px]:w-[min(100%-2rem,78rem)] max-[780px]:flex-wrap max-[780px]:gap-[1.1rem] max-[780px]:py-4">
          <a className="inline-flex items-center gap-3 text-ink no-underline" href="#inicio" aria-label="Ir para o início do guia"><BrandLockup /></a>

          <nav className="main-nav ml-auto flex items-center gap-[clamp(1rem,3vw,2.3rem)] max-[780px]:order-3 max-[780px]:ml-0 max-[780px]:w-full max-[780px]:justify-between" aria-label="Navegação principal">
            <a className="is-active relative border-b-2 border-coral py-[.55rem] text-[.77rem] font-extrabold text-ink no-underline max-[780px]:pb-1.5" href="#inicio">Início</a>
            <a className="relative py-[.55rem] text-[.77rem] font-extrabold text-muted no-underline hover:text-ink max-[780px]:pb-1.5" href="#mais-consultados">Consultas</a>
            <a className="relative py-[.55rem] text-[.77rem] font-extrabold text-muted no-underline hover:text-ink max-[780px]:pb-1.5" href="#apoio">Apoio</a>
            <a className="relative py-[.55rem] text-[.77rem] font-extrabold text-muted no-underline hover:text-ink max-[780px]:pb-1.5" href="#documentos">Documentos</a>
            <a className="relative py-[.55rem] text-[.77rem] font-extrabold text-muted no-underline hover:text-ink max-[780px]:pb-1.5" href="#faq">FAQ</a>
          </nav>

          <div className="topbar-actions flex items-center gap-3">
            <span className="date-chip inline-flex items-center gap-1.5 whitespace-nowrap text-[.72rem] font-bold text-muted max-[480px]:hidden"><Icon><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5l3.2 1.8" /></Icon><span>Guia de referência</span></span>
            <button className="icon-button grid size-[2.35rem] place-items-center rounded-full border border-line bg-white text-ink-soft hover:border-ink-soft hover:text-ink focus-visible:outline-[3px] focus-visible:outline-coral/40 focus-visible:outline-offset-3" type="button" onClick={onLogout} aria-label="Sair do guia" title="Sair"><Icon><path d="M14 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H14M10 12h10M17 8l4 4-4 4" /></Icon></button>
          </div>
        </div>
      </header>

      <main className="portal-shell mx-auto w-[min(100%-3rem,78rem)] pb-16 pt-[3.1rem] outline-none max-[780px]:w-[min(100%-2rem,78rem)] max-[780px]:pt-6" id="portal-content" tabIndex="-1">
        <section className="welcome-panel grid min-h-[21rem] grid-cols-[minmax(0,.95fr)_minmax(24rem,1.05fr)] overflow-hidden rounded-[1.25rem] bg-cream shadow-sensia max-[1000px]:grid-cols-[minmax(0,.8fr)_minmax(24rem,1.2fr)] max-[780px]:block" id="inicio" aria-labelledby="portal-title">
          <div className="welcome-copy flex flex-col justify-center p-[clamp(1.6rem,4vw,3.3rem)] max-[1000px]:p-9 max-[780px]:min-h-0 max-[780px]:px-6 max-[780px]:py-8">
            <p className="eyebrow m-0 mb-3.5 text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">Guia de consulta rápida</p>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.3rem,4vw,3.75rem)] font-normal leading-[.99] tracking-[-.045em] text-ink text-balance max-[1000px]:text-[clamp(2.3rem,4.5vw,3.35rem)] max-[780px]:max-w-[15ch] max-[780px]:text-[clamp(2.35rem,9vw,3.5rem)]" id="portal-title" tabIndex="-1">O essencial para a rotina do morador.</h1>
            <p className="welcome-lead mt-[1rem] max-w-[28rem] text-[.9rem] text-ink-soft text-pretty">Cadastro facial, senhas Wi-Fi, contatos e documentos em um só lugar.</p>
            <div className="welcome-actions mt-6 flex flex-wrap items-center gap-4 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3">
              <a className="button button--primary inline-flex min-h-12 items-center justify-center gap-3 rounded-[.55rem] border border-transparent bg-coral px-[1.15rem] py-3 text-[.79rem] font-extrabold text-white no-underline hover:bg-coral-dark focus-visible:bg-coral-dark" href="#mais-consultados">Ver acessos rápidos<Icon><path d="M5 12h13M13 6l6 6-6 6" /></Icon></a>
              <a className="text-link text-[.78rem] font-extrabold text-ink no-underline hover:text-coral focus-visible:outline-[3px] focus-visible:outline-coral/40 focus-visible:outline-offset-3" href="#wifi">Ver senhas Wi-Fi <span className="ml-1 text-base text-coral" aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="welcome-art relative min-h-[21rem] overflow-hidden bg-[#b9d5d1] max-[780px]:min-h-[16rem]" aria-label="Ilustração do condomínio junto ao mar" role="img">
            <div className="art-sun" aria-hidden="true"></div><div className="art-cloud art-cloud--one" aria-hidden="true"></div><div className="art-cloud art-cloud--two" aria-hidden="true"></div><div className="art-horizon" aria-hidden="true"></div>
            <div className="art-building art-building--back" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div className="art-building art-building--front" aria-hidden="true"><div className="building-roof"></div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div className="art-palm art-palm--one" aria-hidden="true"><i></i></div><div className="art-palm art-palm--two" aria-hidden="true"><i></i></div><div className="art-foreground" aria-hidden="true"></div>
          </div>
        </section>

        <section className="overview-grid mt-[1.1rem] grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[780px]:grid-cols-1" id="mais-consultados" aria-labelledby="quick-title">
          <h2 className="sr-only" id="quick-title">Acessos rápidos</h2>
          <OverviewCard href="#guia" label="Cadastro facial" value="Passo a passo" caption="Envie as informações por e-mail" accent="sand" icon={<Icon><path d="M7 3.5v3M17 3.5v3M4 9h16M5.5 5.5h13A1.5 1.5 0 0 1 20 7v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5Z" /><path d="M8 13h3M8 16h6" /></Icon>} />
          <OverviewCard href="#wifi" label="Senhas das áreas comuns" value="Copie em um toque" caption="Áreas comuns e MarketOne" accent="teal" icon={<Icon><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path d="m8 12 2.5 2.5L16.5 8.5" /></Icon>} />
          <OverviewCard href="#lavanderia" label="Lavanderia OMO" value="Código e aplicativo" caption="Valores para lavar e secar" accent="blue" icon={<span className="text-[.55rem] font-black tracking-[-.04em]">OMO</span>} />
          <OverviewCard href="#apoio" label="Apoio ao morador" value="Contatos e links úteis" caption="Portaria, Prolar e síndica" accent="sand" icon={<Icon><path d="M5 18.5V9.8L12 5l7 4.8v8.7" /><path d="M8 19v-5h8v5M3.5 19.5h17" /></Icon>} />
        </section>

        <div className="info-boundary mt-[1.1rem] flex items-start gap-3 rounded-xl border border-dashed border-[#c9dfd9] bg-[#f2f9f6] px-5 py-4 text-[.76rem] text-ink-soft max-[780px]:flex-wrap">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal-soft text-teal" aria-hidden="true">i</span>
          <p className="m-0 flex-1 text-pretty"><strong className="text-ink">Guia de consulta rápida.</strong> Este espaço reúne respostas práticas do dia a dia. Comunicados e agenda oficiais continuam no <strong className="text-ink">Conviver Sensia</strong>.</p>
          <a className="inline-flex shrink-0 items-center gap-1.5 font-extrabold text-teal no-underline hover:text-coral" href="https://sensia.ucondo.com.br/login.aspx" target="_blank" rel="noopener noreferrer">Abrir Conviver <span aria-hidden="true">↗</span></a>
        </div>

        <section className="mt-[1.35rem]" aria-labelledby="procedimentos-title">
          <div className="flex items-end justify-between gap-6 max-[780px]:block"><div><p className="m-0 mb-[.6rem] text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">Informações mais consultadas</p><h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-.035em] text-balance" id="procedimentos-title">Procedimentos e acessos</h2></div><p className="m-0 max-w-[27rem] text-right text-[.78rem] text-ink-soft text-pretty max-[780px]:mt-3 max-[780px]:text-left">Consulte aqui o cadastro facial e as senhas das áreas comuns, sem precisar procurar em mensagens antigas.</p></div>

          <div className="info-grid mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] gap-[1.1rem] max-[1000px]:grid-cols-1">
            <section className="rounded-[.9rem] border border-line bg-white p-[clamp(1.4rem,3vw,2.1rem)] shadow-card" id="guia" aria-labelledby="facial-title">
              <SectionHeading eyebrow="Procedimento mais consultado" title="Cadastro de identificação facial" id="facial-title" icon="ID" />
              <p className="mt-5 text-[.82rem] text-ink-soft text-pretty">Para cadastrar moradores que já receberam as chaves, siga os dois passos abaixo e envie as informações para a administração.</p>
              <ol className="mt-5 grid gap-3">
                <li className="grid grid-cols-[2.35rem_minmax(0,1fr)] gap-3 rounded-xl border border-line bg-paper p-4"><span className="grid size-9 place-items-center rounded-full bg-sand font-display text-lg text-sand-deep">1</span><div><h3 className="text-[.86rem] font-extrabold text-ink">Envie um e-mail</h3><p className="mt-1 text-[.75rem] text-ink-soft">Use o endereço da administração:</p><a className="mt-1 inline-flex break-all text-[.78rem] font-extrabold text-teal no-underline hover:text-coral" href={facialEmailLink}>{guide.facial.email} ↗</a><p className="mt-2 text-[.72rem] text-ink-soft"><strong className="text-ink">Assunto:</strong> {guide.facial.subject}</p></div></li>
                <li className="grid grid-cols-[2.35rem_minmax(0,1fr)] gap-3 rounded-xl border border-line bg-paper p-4"><span className="grid size-9 place-items-center rounded-full bg-teal-soft font-display text-lg text-teal">2</span><div><h3 className="text-[.86rem] font-extrabold text-ink">Informe os dados no corpo do e-mail</h3><ul className="mt-2 grid gap-1.5 text-[.75rem] text-ink-soft">{guide.facial.details.map((detail) => <li key={detail.label}><strong className="text-ink">{detail.label}:</strong> {detail.text}</li>)}</ul><div className="mt-3 rounded-lg border-l-2 border-teal bg-white px-3 py-2 font-mono text-[.68rem] leading-relaxed text-ink-soft">{guide.facial.example.map((line) => <div key={line}>{line}</div>)}</div></div></li>
              </ol>
              <div className="mt-4 rounded-xl border border-[#ead9bd] bg-[#fffaf2] p-4"><h3 className="text-[.8rem] font-extrabold text-ink">Observações importantes</h3><ul className="mt-2 grid gap-1.5 text-[.73rem] text-ink-soft">{guide.facial.notes.map((note) => <li key={note}>{note}</li>)}</ul></div>
            </section>

            <section className="rounded-[.9rem] border border-line bg-white p-[clamp(1.4rem,3vw,2rem)] shadow-card" id="wifi" aria-labelledby="wifi-title">
              <SectionHeading eyebrow="Acesso às áreas comuns" title="Senhas Wi-Fi" id="wifi-title" icon="Wi-Fi" />
              <p className="mt-5 text-[.82rem] text-ink-soft text-pretty">Use o botão ao lado de cada ambiente para copiar a senha e conectar seu dispositivo.</p>
              <div className="mt-5 grid gap-2">{guide.wifi.map((item) => <WifiRow key={item.name} item={item} copied={copied} onCopy={onCopy} />)}</div>
            </section>
          </div>
        </section>

        <section className="mt-[1.35rem] rounded-[.9rem] border border-line bg-white p-[clamp(1.4rem,3vw,2rem)] shadow-card" id="servicos" aria-labelledby="servicos-title">
          <SectionHeading eyebrow="Serviços do condomínio" title="Serviços e facilidades" id="servicos-title" icon="+" />
          <div className="mt-5 grid grid-cols-2 gap-4 max-[780px]:grid-cols-1">
            <article className="rounded-xl border border-line bg-paper p-4" id="internet"><p className="m-0 text-[.69rem] font-extrabold uppercase tracking-[.1em] text-teal">Internet disponível</p><h3 className="mt-2 font-display text-[1.35rem] leading-tight text-ink text-balance">Provedores habilitados</h3><p className="mt-2 text-[.76rem] text-ink-soft">As opções informadas para o condomínio são:</p><div className="mt-3 flex flex-wrap gap-2" aria-label="Provedores habilitados">{guide.services.providers.map((provider) => <span className="rounded-full border border-[#c9dfd9] bg-teal-soft px-3 py-1.5 text-[.7rem] font-extrabold text-teal" key={provider}>{provider}</span>)}</div></article>
            <article className="rounded-xl border border-[#ead9bd] bg-[#fffaf2] p-4" id="lavanderia"><p className="m-0 text-[.69rem] font-extrabold uppercase tracking-[.1em] text-sand-deep">Lavanderia compartilhada</p><h3 className="mt-2 font-display text-[1.35rem] leading-tight text-ink text-balance">Lavanderia OMO</h3><div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-[#ead9bd] bg-white px-3 py-2.5"><div><span className="block text-[.66rem] font-extrabold uppercase tracking-[.08em] text-muted">Código</span><code className="mt-1 block font-mono text-[.82rem] font-bold text-teal">{guide.services.laundry.code}</code></div><CopyButton value={guide.services.laundry.code} copied={copied === guide.services.laundry.code} onCopy={onCopy} /></div><dl className="mt-3 grid grid-cols-2 gap-2 text-center"><div className="rounded-lg border border-[#ead9bd] bg-white px-2 py-2"><dt className="text-[.62rem] text-muted">Para lavar</dt><dd className="m-0 mt-1 text-[.82rem] font-extrabold tabular-nums text-ink">{guide.services.laundry.washPrice}</dd></div><div className="rounded-lg border border-[#ead9bd] bg-white px-2 py-2"><dt className="text-[.62rem] text-muted">Para secar</dt><dd className="m-0 mt-1 text-[.82rem] font-extrabold tabular-nums text-ink">{guide.services.laundry.dryPrice}</dd></div></dl><p className="mt-3 text-[.72rem] text-ink-soft text-pretty"><strong className="text-ink">Importante:</strong> {guide.services.laundry.note}</p><div className="mt-3 flex flex-wrap gap-2"><a className="inline-flex min-h-[1.9rem] items-center rounded-full border border-[#dfcba9] px-3 text-[.64rem] font-extrabold text-ink no-underline hover:border-coral hover:text-coral" href={guide.services.laundry.appStore} target="_blank" rel="noopener noreferrer">App Store <span className="ml-1 text-coral" aria-hidden="true">↗</span></a><a className="inline-flex min-h-[1.9rem] items-center rounded-full border border-[#dfcba9] px-3 text-[.64rem] font-extrabold text-ink no-underline hover:border-coral hover:text-coral" href={guide.services.laundry.googlePlay} target="_blank" rel="noopener noreferrer">Google Play <span className="ml-1 text-coral" aria-hidden="true">↗</span></a></div></article>
          </div>
        </section>

        <section className="utility-grid mt-[1.1rem] grid grid-cols-2 gap-[1.1rem] max-[780px]:grid-cols-1 max-[780px]:gap-4" id="apoio" aria-labelledby="apoio-title">
          <article className="surface-card support-card rounded-[.9rem] border border-line bg-white p-[clamp(1.4rem,3vw,2rem)] shadow-card">
            <SectionHeading eyebrow="Apoio ao morador" title="Contatos e canais úteis" id="apoio-title" icon={<Icon><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7a2.5 2.5 0 0 1-2.5 2.5H13l-4.5 4v-4h-1A2.5 2.5 0 0 1 5 12.5z" /><path d="M8.5 7.5h7M8.5 10.5h4" /></Icon>} />
            <p className="support-intro mt-[1.1rem] text-[.76rem] text-ink-soft text-pretty">Para garantir um atendimento rápido e evitar ruídos de comunicação, verifique o canal correto para cada necessidade.</p>
            <div className="channel-list mt-5 grid gap-3" aria-label="Canais de atendimento">
              <div className="channel-card rounded-[.7rem] border border-[#ead9bd] bg-[#fffaf2] p-4"><div className="channel-heading flex items-center gap-3"><span className="channel-icon grid size-[2.2rem] shrink-0 place-items-center rounded-[.55rem] bg-sand text-[.57rem] font-black tracking-[.04em] text-sand-deep" aria-hidden="true">CS</span><div className="grid min-w-0 gap-[.15rem]"><strong className="text-[.8rem] text-ink">Conviver Sensia</strong><small className="text-[.66rem] leading-[1.3] text-ink-soft text-pretty">Canal oficial para reservas, comunicados e agenda</small></div></div><div className="channel-actions ml-[2.95rem] mt-3 flex flex-wrap gap-[.42rem]">{guide.support.conviver.links.map((link) => <a className="channel-link inline-flex min-h-[1.8rem] items-center gap-1.5 rounded-full border border-[#dfcba9] px-[.62rem] text-[.61rem] font-extrabold text-ink no-underline hover:border-coral hover:text-coral" href={link.url} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label} <span className="text-[.8rem] text-coral" aria-hidden="true">↗</span></a>)}</div></div>
              <div className="channel-card channel-card--teal rounded-[.7rem] border border-[#c9dfd9] bg-[#f2f9f6] p-4"><div className="channel-heading flex items-center gap-3"><span className="channel-icon grid size-[2.2rem] shrink-0 place-items-center rounded-[.55rem] bg-teal-soft text-[.57rem] font-black tracking-[.04em] text-teal" aria-hidden="true">MS</span><div className="grid min-w-0 gap-[.15rem]"><strong className="text-[.8rem] text-ink">Meu Sensia</strong><small className="text-[.66rem] leading-[1.3] text-ink-soft text-pretty">Garantia e assistência técnica da unidade</small></div></div><div className="channel-actions ml-[2.95rem] mt-3 flex flex-wrap gap-[.42rem]"><a className="channel-link inline-flex min-h-[1.8rem] items-center gap-1.5 rounded-full border border-[#b9d6ce] px-[.62rem] text-[.61rem] font-extrabold text-ink no-underline hover:border-coral hover:text-coral" href={guide.support.meuSensia} target="_blank" rel="noopener noreferrer">Acessar portal <span className="text-[.8rem] text-coral" aria-hidden="true">↗</span></a></div></div>
            </div>
            <div className="contact-list mt-5 grid border-t border-line pt-4">{guide.support.contacts.map((item) => <ContactRow key={item.label} item={item} />)}</div>
            <div className="block-representatives mt-5 border-t border-line pt-4"><div><h3 className="text-[.8rem] font-extrabold text-ink">Representantes de bloco</h3><p className="mt-1 text-[.68rem] text-muted text-pretty">Manutenção local, limpeza, segurança e convivência da sua torre.</p></div><div className="representatives-grid mt-3 grid grid-cols-2 gap-2 max-[780px]:grid-cols-1">{guide.support.representatives.map((item) => <a className="representative-row flex min-w-0 items-center gap-2 rounded-[.6rem] border border-line p-[.65rem] text-ink no-underline hover:text-coral" href={`tel:${item.phone.replace(/\D/g, "")}`} key={item.label}><span className="grid size-[1.85rem] shrink-0 place-items-center rounded-full bg-sand text-[.55rem] font-black text-sand-deep" aria-hidden="true">{item.short}</span><span className="grid min-w-0 gap-[.15rem]"><strong className="text-[.65rem] leading-tight text-balance">{item.label}</strong><small className="text-[.6rem] text-muted">{item.phone}</small></span><span className="ml-auto text-[.9rem] text-coral" aria-hidden="true">↗</span></a>)}</div></div>
          </article>

          <article className="surface-card documents-card scroll-mt-24 rounded-[.9rem] border border-line bg-white p-[clamp(1.4rem,3vw,2rem)] shadow-card" id="documentos">
            <SectionHeading eyebrow="Documentos e padrões" title="Documentos e padrões" id="documentos-title" icon="PDF" />
            <div className="document-list grid pt-2"><a className="document-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-line py-3 text-ink no-underline last:border-b-0" href={documents.convention} target="_blank" rel="noopener"><span className="document-icon grid size-8 place-items-center rounded-[.4rem] bg-sand text-[.5rem] font-black text-sand-deep" aria-hidden="true">PDF</span><span className="grid gap-[.12rem]"><strong className="text-[.78rem] leading-tight text-ink">Convenção de condomínio</strong><small className="text-[.7rem] text-muted">Documento oficial • PDF</small></span><span className="text-[1.1rem] text-coral" aria-hidden="true">↗</span></a><a className="document-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-line py-3 text-ink no-underline last:border-b-0" href={documents.regiment} target="_blank" rel="noopener"><span className="document-icon grid size-8 place-items-center rounded-[.4rem] bg-teal-soft text-[.5rem] font-black text-teal" aria-hidden="true">PDF</span><span className="grid gap-[.12rem]"><strong className="text-[.78rem] leading-tight text-ink">Regimento interno atualizado</strong><small className="text-[.7rem] text-muted">Documento oficial • PDF</small></span><span className="text-[1.1rem] text-coral" aria-hidden="true">↗</span></a><a className="document-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3 text-ink no-underline" href={documents.curtain} target="_blank" rel="noopener"><span className="document-icon grid size-8 place-items-center rounded-[.4rem] bg-blue-soft text-[.5rem] font-black text-blue" aria-hidden="true">IMG</span><span className="grid gap-[.12rem]"><strong className="text-[.78rem] leading-tight text-ink">Modelo de cortina de vidro</strong><small className="text-[.7rem] text-muted">Padrão aprovado • Referência</small></span><span className="text-[1.1rem] text-coral" aria-hidden="true">↗</span></a></div>
          </article>
        </section>

        <section className="reference-card mt-[1.1rem] grid grid-cols-[minmax(0,.78fr)_minmax(22rem,1.22fr)] overflow-hidden rounded-[.9rem] border border-[#d9e3df] bg-teal-soft shadow-card max-[780px]:grid-cols-1" id="referencias" aria-labelledby="reference-title">
          <div className="reference-copy p-[clamp(1.6rem,4vw,2.75rem)]"><p className="eyebrow m-0 mb-3.5 text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">Padrão aprovado</p><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-normal leading-none tracking-[-.04em] text-ink text-balance" id="reference-title">Cortina de vidro</h2><p className="reference-lead mt-4 max-w-[28rem] text-[.83rem] text-ink-soft text-pretty">Consulte a referência entregue junto ao condomínio antes de contratar ou instalar o fechamento da varanda.</p><dl className="reference-specs mt-7 grid border-t border-teal/20"><div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-teal/20 py-3"><dt className="text-[.61rem] font-black uppercase tracking-[.09em] text-teal">Modelo</dt><dd className="m-0 text-[.76rem] font-bold text-ink">Euroglass</dd></div><div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-teal/20 py-3"><dt className="text-[.61rem] font-black uppercase tracking-[.09em] text-teal">Estrutura</dt><dd className="m-0 text-[.76rem] font-bold text-ink">Alumínio branco</dd></div><div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-teal/20 py-3"><dt className="text-[.61rem] font-black uppercase tracking-[.09em] text-teal">Vidro</dt><dd className="m-0 text-[.76rem] font-bold text-ink">Mínimo de 8 mm</dd></div><div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-teal/20 py-3"><dt className="text-[.61rem] font-black uppercase tracking-[.09em] text-teal">Observação</dt><dd className="m-0 text-[.76rem] font-bold text-ink">Sem película solar · Necessário ART</dd></div></dl><a className="outline-link mt-6 inline-flex items-center gap-2.5 text-[.73rem] font-extrabold text-teal no-underline hover:text-coral focus-visible:outline-[3px] focus-visible:outline-coral/40 focus-visible:outline-offset-3" href={documents.curtain} target="_blank" rel="noopener">Abrir referência em tamanho original <span aria-hidden="true">↗</span></a></div>
          <figure className="reference-visual grid min-h-96 place-items-center content-center bg-stone p-6 max-[780px]:min-h-0"><img className="block w-[min(100%,19rem)] max-h-[34rem] border border-[#ddd9d0] object-contain shadow-card" src={documents.curtain} alt="Desenho técnico do modelo de cortina de vidro aprovado, com opções para apartamentos 2Q e 2Q mais escritório." /><figcaption className="mt-2.5 max-w-[19rem] text-center text-[.63rem] text-muted">Modelo entregue junto da documentação do condomínio.</figcaption></figure>
        </section>

        <section className="mt-[1.1rem] rounded-[.9rem] border border-line bg-stone p-[clamp(1.4rem,3vw,2rem)] shadow-card" id="faq" aria-labelledby="faq-title">
          <div className="flex items-end justify-between gap-6 max-[780px]:block"><div><p className="m-0 mb-[.6rem] text-[.69rem] font-extrabold uppercase leading-[1.2] tracking-[.15em] text-teal">Consulta rápida</p><h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-.035em] text-balance" id="faq-title">Dúvidas frequentes</h2></div><p className="m-0 max-w-[30rem] text-right text-[.76rem] text-ink-soft text-pretty max-[780px]:mt-3 max-[780px]:text-left">Respostas resumidas com base no Regimento Interno atualizado. Em caso de dúvida, consulte o documento completo.</p></div>
          <div className="mt-5 grid gap-2">{[
            ["Qual é o horário de silêncio?", "O período de silêncio é das 22h às 7h. Fora desse horário, aparelhos sonoros também devem ser usados com moderação para não incomodar os vizinhos."],
            ["Posso realizar festas ou eventos?", "Festas e eventos devem ficar restritos às dependências internas do salão de festas. Eventos promovidos pelo condomínio ou autorizados pela Assembleia podem ter horário estendido, conforme combinação prévia."],
            ["Como funciona a entrada de visitantes?", "O visitante deve ser identificado na recepção e só pode entrar após autorização do morador anfitrião. O anfitrião é responsável pelos atos praticados por seus visitantes."],
            ["Entregadores podem subir até o apartamento?", "Pequenas e médias entregas, como pizzas, flores e remédios, não devem passar da portaria. O morador deve retirar a encomenda na recepção."],
            ["Por quanto tempo correspondências e encomendas ficam na portaria?", "Correspondências ficam armazenadas por até 7 dias. Encomendas devem ser retiradas em até 48 horas; volumes grandes devem ser retirados no momento da entrega."],
            ["É permitido fumar nas áreas comuns?", "Não. É proibido fumar cigarros, cigarrilhas, charutos, cachimbos ou produtos similares na churrasqueira e em qualquer outra área comum do edifício."],
            ["Inquilinos podem usar as áreas comuns?", "Sim. Durante o prazo da locação, o direito de utilização das áreas comuns passa ao inquilino, que também deve respeitar as regras do condomínio."],
            ["Como devo usar a vaga de garagem?", "Use a vaga conforme o projeto e a convenção, respeitando as faixas demarcadas e as áreas de manobra. Não é permitido estacionar fora das vagas destinadas a veículos."],
            ["Preciso de autorização para fazer obra ou alterar a fachada?", "Sim. Antes de executar obras, reformas ou alterações externas, consulte a convenção, o regimento e a administração. Não altere fachada, varanda ou elementos estruturais fora dos padrões autorizados."],
            ["Como registro uma reclamação ou solicitação?", "Use o Livro de Ocorrências, disponível na portaria, para registrar reclamações, sugestões e pedidos de providência. O registro deve ser encaminhado ao síndico."],
          ].map(([question, answer]) => <details className="rounded-lg border border-line bg-white px-4 py-3" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[.8rem] font-extrabold text-ink marker:hidden">{question}<span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-soft text-teal" aria-hidden="true">+</span></summary><p className="mt-3 border-t border-line pt-3 text-[.74rem] text-ink-soft text-pretty">{answer}</p></details>)}</div>
          <p className="mt-5 text-[.68rem] text-muted text-pretty">Esta seção é um resumo de consulta. Em caso de conflito ou dúvida, prevalecem os documentos oficiais: <a className="font-extrabold text-teal no-underline hover:text-coral" href={documents.convention} target="_blank" rel="noopener">Convenção</a> e <a className="font-extrabold text-teal no-underline hover:text-coral" href={documents.regiment} target="_blank" rel="noopener">Regimento Interno</a>.</p>
        </section>

        <div className="portal-note mt-[1.1rem] flex items-center gap-3.5 rounded-xl border border-dashed border-[#d8cbb6] bg-[#fffaf2] px-5 py-4 text-ink-soft max-[780px]:flex-wrap max-[780px]:items-start"><span className="portal-note-icon text-base text-sand-deep" aria-hidden="true">✦</span><p className="m-0 text-[.73rem] text-pretty"><strong className="text-ink">Guia de referência.</strong> Use o Conviver Sensia para comunicados, agenda e demais informações oficiais do condomínio.</p><span className="portal-note-date ml-auto whitespace-nowrap text-[.65rem] text-muted max-[780px]:ml-[1.85rem] max-[780px]:w-full">Atualizado em <time dateTime="2026-08-11">11 ago 2026</time></span></div>
      </main>

      <footer className="footer border-t border-line bg-white"><div className="footer-inner mx-auto flex min-h-[4.5rem] w-[min(100%-3rem,78rem)] items-center justify-between gap-4 text-[.67rem] text-muted max-[780px]:w-[min(100%-2rem,78rem)] max-[780px]:flex-col max-[780px]:items-start max-[780px]:justify-center max-[780px]:py-4"><span>© 2026 Sensia Horizontes do Atlântico</span><span>Guia prático do morador</span></div></footer>
    </div>
  );
}

export default function HomePage() {
  const [guide, setGuide] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState("");
  const sessionCheckStarted = useRef(false);

  useEffect(() => {
    if (sessionCheckStarted.current) {
      return;
    }

    sessionCheckStarted.current = true;

    fetch("/api/guide", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((data) => setGuide(data))
      .catch(() => setGuide(null))
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(event, password) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const loginResponse = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      const loginData = await loginResponse.json().catch(() => ({}));

      if (!loginResponse.ok) {
        throw new Error(loginData.error || "Não foi possível entrar no guia.");
      }

      const guideResponse = await fetch("/api/guide", { cache: "no-store" });
      const guideData = await guideResponse.json().catch(() => ({}));

      if (!guideResponse.ok) {
        throw new Error(guideData.error || "Os dados do guia ainda não foram configurados.");
      }

      setGuide(guideData);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    setGuide(null);
    setCopied("");
  }

  async function handleCopy(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied((current) => (current === value ? "" : current)), 1600);
    } catch {
      setError("Não foi possível copiar automaticamente. Selecione o texto manualmente.");
    }
  }

  if (checking) {
    return <LoadingView />;
  }

  return guide ? <PortalView guide={guide} onLogout={handleLogout} onCopy={handleCopy} copied={copied} /> : <AuthView onSubmit={handleLogin} error={error} submitting={submitting} />;
}
