import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function shouldShowIntro() {
  return !window.location.hash && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function RocketIntro() {
  const [phase, setPhase] = useState(shouldShowIntro() ? 'prep' : 'done');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (phase !== 'prep') return undefined;
    const second = window.setTimeout(() => setCountdown(2), 750);
    const third = window.setTimeout(() => setCountdown(1), 1500);
    const lift = window.setTimeout(() => setPhase('launch'), 2250);
    return () => [second, third, lift].forEach((timer) => window.clearTimeout(timer));
  }, [phase]);

  useEffect(() => {
    if (phase !== 'launch') return undefined;
    const exitTimer = window.setTimeout(() => setPhase('exit'), 2000);
    return () => window.clearTimeout(exitTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exit') return undefined;
    const doneTimer = window.setTimeout(() => setPhase('done'), 650);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`launch-screen launch-screen--${phase}`} role="dialog" aria-label="Welcome animation">
      <div className="launch-mark">M<span>.</span></div>
      <div className="launch-headline"><span className="launch-overline">A new mission begins</span><h2>Ideas in motion<span>.</span></h2></div>
      <div className="launch-center" aria-hidden="true">
        <div className="launch-orbit launch-orbit--outer" /><div className="launch-orbit launch-orbit--inner" />
        <div className="rocket-trail" />
        <svg className="launch-rocket" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 4C23 21 19 43 19 71V90H61V71C61 43 57 21 40 4Z" fill="#F4F3F0" />
          <path d="M40 4C23 21 19 43 19 71H61C61 43 57 21 40 4Z" stroke="#F47B4B" strokeWidth="3" />
          <circle cx="40" cy="49" r="10" fill="#101112" stroke="#F47B4B" strokeWidth="3" />
          <path d="M19 69 7 91V103L19 97M61 69 73 91V103L61 97" fill="#F47B4B" />
          <path d="M30 90V103H50V90" fill="#CF6036" />
          <path className="rocket-flame" d="M33 104C33 116 40 127 40 127S47 116 47 104" fill="#F47B4B" />
        </svg>
      </div>
      <div className="launch-status" aria-live="off"><strong>{phase === 'prep' ? `0${countdown}` : 'LIFTOFF'}</strong><span>{phase === 'prep' ? 'Preparing for launch' : 'On to the next challenge'}</span></div>
      <div className="launch-bottom"><span>Mustapha Strachan <span className="launch-divider">/</span> Software Engineer</span><button type="button" onClick={() => setPhase('done')}>Skip intro <span aria-hidden="true">↗</span></button></div>
    </div>
  );
}

function PageControls() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? Math.min(100, Math.max(0, (window.scrollY / available) * 100)) : 0);
        setShowTop(window.scrollY > 650);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <div className="page-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      {showTop && <a className="back-to-top" href="#top" aria-label="Back to top">↑ <span>Top</span></a>}
    </>
  );
}

function SiteUI() {
  return <><RocketIntro /><PageControls /></>;
}

createRoot(document.getElementById('site-ui')).render(<SiteUI />);
