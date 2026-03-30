import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const SvgIcon = ({ name, size = 16, className = '' }) => {
  const icons = {
    code: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    terminal: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    folder: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    play: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    sparkles: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>,
    bot: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    layers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    gitbranch: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    arrowright: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    command: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
    maximize: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>,
    minimize: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>,
    rotate: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    pen: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    wand: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="M3 21l9-9"/><path d="M12.2 6.2L11 5"/></svg>,
    layout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    database: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    cloud: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
    smartphone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    monitor: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    bug: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="8" y="6" width="8" height="12" rx="4"/><path d="M8 6V4a4 4 0 0 1 8 0v2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4" y1="8" x2="2" y2="8"/><line x1="22" y1="8" x2="20" y2="8"/></svg>,
    rocket: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    gitrepo: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>,
    infinity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 12c-2-2.67-4-4-6-4s-4 1.33-4 4 4 4 6 4 4-1.33 4-4-2-2.67-4-4z"/><path d="M12 12c2-2.67 4-4 6-4s4 1.33 4 4-4 4-6 4-4-1.33-4-4z"/></svg>,
    box: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    external: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    workflow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    plug: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>,
    puzzle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.968-.85-.196-.466-.304-.971-.304-1.469 0-.509.114-.977.336-1.378l1.122-1.121a3.37 3.37 0 0 0-1.588-4.223z"/><path d="M11.912 7.589a3.39 3.39 0 0 0-2.055-1.284l-1.558-.259-.259-1.558a3.374 3.374 0 0 0-3.352-3.352l-1.558.259-.259 1.558a3.373 3.373 0 0 0-1.284 3.352l.259 1.558 1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.968-.85-.196-.466-.304-.971-.304-1.469 0-.509.114-.977.336-1.378l1.122-1.121a3.37 3.37 0 0 0 1.588-4.223z"/></svg>,
    server: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
    harddrive: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    appwindow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>,
    code2: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    terminal2: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    filejson: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    folderopen: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M2 10h20"/></svg>,
    searchcode: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="m8 11 3 3"/><path d="m8 16-3-3"/></svg>,
    mic: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    image: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    lifebuoy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 9.17l4.24-4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M4.93 19.07l4.24-4.24"/></svg>,
    messagecircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    video: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    webhook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 16.98h-5.99c-1.1 0-1.95.68-2.95 1.76"/><path d="M18 21h-6c-1.1 0-2-.9-2-2v-9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v9"/><path d="M6 11.98H1c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h5"/><path d="M3 7.02h5.99c1.1 0 1.95-.68 2.95-1.76"/><path d="M3 3h6c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"/></svg>,
    chevronright: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="9 18 15 12 9 6"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    wifi: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  }
  return icons[name] || icons.code
}

const SAMPLE_FILES = {
  'src': {
    type: 'folder',
    children: {
      'App.jsx': { type: 'file', language: 'javascript', content: 'import React from "react";\nimport { useState } from "react";\nimport "./App.css";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className="app">\n      <h1>Hello GSBuilder</h1>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n    </div>\n  );\n}\n\nexport default App;' },
      'index.js': { type: 'file', language: 'javascript', content: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);' },
      'utils.js': { type: 'file', language: 'javascript', content: 'export const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;' }
    }
  },
  'components': {
    type: 'folder',
    children: {
      'Button.jsx': { type: 'file', language: 'javascript', content: 'export const Button = ({ children, onClick }) => (\n  <button className="btn" onClick={onClick}>{children}</button>\n);' },
      'Card.jsx': { type: 'file', language: 'javascript', content: 'export const Card = ({ title, children }) => (\n  <div className="card"><h3>{title}</h3>{children}</div>\n);' }
    }
  },
  'styles': {
    type: 'folder',
    children: {
      'main.css': { type: 'file', language: 'css', content: ':root { --primary: #00D9FF; }\nbody { margin: 0; font-family: Inter, sans-serif; }' }
    }
  },
  'package.json': { type: 'file', language: 'json', content: '{"name": "gsbuilder-project", "version": "1.0.0"}' }
}

function LandingPage({ onEnterIDE }) {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="landing">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <SvgIcon name="code" size={22} />
          <span>GSBuilder</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost">Log In</button>
          <button className="btn-primary" onClick={onEnterIDE}>Sign Up Free</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Build full-stack apps
              <span className="gradient-text"> in your browser</span>
            </h1>
            <p className="hero-subtitle">
              A powerful cloud IDE that runs in your browser. No setup required. 
              Code, run, and deploy directly from your browser.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-large" onClick={onEnterIDE}>
                <SvgIcon name="play" size={18} />
                Start Coding
              </button>
              <button className="btn-ghost btn-large">
                <SvgIcon name="external" size={18} />
                View Templates
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="ide-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="preview-title">src/App.jsx — GSBuilder</span>
            </div>
            <pre className="preview-code">
              <code>{`function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Hello World!</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Clicks: {count}
      </button>
    </div>
  );
}

// Run ✓`}</code>
            </pre>
            <div className="preview-status">
              <SvgIcon name="play" size={14} />
              <span>Running - http://localhost:3000</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <strong>50+</strong>
          <span>Languages</span>
        </div>
        <div className="stat-item">
          <strong>10M+</strong>
          <span>Developers</span>
        </div>
        <div className="stat-item">
          <strong>100M+</strong>
          <span>Projects</span>
        </div>
        <div className="stat-item">
          <strong>99.9%</strong>
          <span>Uptime</span>
        </div>
      </section>

      <section id="features" className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Everything you need to build faster
        </motion.h2>
        <div className="features-grid">
          {[
            { icon: 'code', title: 'Smart Editor', desc: 'Syntax highlighting, autocomplete, and intelligent suggestions' },
            { icon: 'terminal', title: 'Built-in Terminal', desc: 'Full shell access with package managers' },
            { icon: 'database', title: 'Databases', desc: 'PostgreSQL, MySQL, MongoDB ready to use' },
            { icon: 'cloud', title: 'One-Click Deploy', desc: 'Deploy to Vercel, Netlify, or custom domains' },
            { icon: 'users', title: 'Real-time Collab', desc: 'Code together with your team in real-time' },
            { icon: 'gitbranch', title: 'Git Integration', desc: 'Built-in version control and GitHub sync' },
            { icon: 'package', title: 'Package Manager', desc: 'npm, yarn, pnpm - all supported' },
            { icon: 'bug', title: 'Debugger', desc: 'Breakpoints, watches, and console debugging' },
            { icon: 'layers', title: 'Multi-file', desc: 'Work on entire projects with tabs' },
            { icon: 'monitor', title: 'Live Preview', desc: 'See your changes instantly in the browser' },
            { icon: 'lock', title: 'Secure', desc: 'Enterprise-grade security with encryption' },
            { icon: 'workflow', title: 'Custom Domains', desc: 'Connect your own domain for free' },
          ].map((f, i) => (
            <motion.div 
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon"><SvgIcon name={f.icon} size={24} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="templates-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Start from a template
        </motion.h2>
        <div className="templates-grid">
          {[
            { name: 'React App', icon: 'appwindow', desc: 'Full React application' },
            { name: 'Node.js API', icon: 'server', desc: 'REST API with Express' },
            { name: 'Python ML', icon: 'cpu', desc: 'Machine learning starter' },
            { name: 'Next.js', icon: 'globe', desc: 'Full-stack React framework' },
            { name: 'Vue.js', icon: 'layers', desc: 'Progressive JavaScript framework' },
            { name: 'Static Site', icon: 'file', desc: 'HTML, CSS, vanilla JS' },
          ].map((t, i) => (
            <motion.div 
              key={i}
              className="template-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <SvgIcon name={t.icon} size={32} />
              <h4>{t.name}</h4>
              <p>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <h2 className="section-title">Simple pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0<span>/month</span></div>
            <ul>
              <li><SvgIcon name="check" size={14} /> Unlimited public projects</li>
              <li><SvgIcon name="check" size={14} /> 500MB storage</li>
              <li><SvgIcon name="check" size={14} /> Community support</li>
              <li><SvgIcon name="check" size={14} /> Standard hardware</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <span className="badge-featured">Most Popular</span>
            <h3>Pro</h3>
            <div className="price">$15<span>/month</span></div>
            <ul>
              <li><SvgIcon name="check" size={14} /> Unlimited private projects</li>
              <li><SvgIcon name="check" size={14} /> 10GB storage</li>
              <li><SvgIcon name="check" size={14} /> Priority support</li>
              <li><SvgIcon name="check" size={14} /> Faster hardware</li>
              <li><SvgIcon name="check" size={14} /> Custom domains</li>
            </ul>
            <button className="btn-primary btn-large">Start Free Trial</button>
          </div>
          <div className="pricing-card">
            <h3>Team</h3>
            <div className="price">$45<span>/month</span></div>
            <ul>
              <li><SvgIcon name="check" size={14} /> Everything in Pro</li>
              <li><SvgIcon name="check" size={14} /> Team collaboration</li>
              <li><SvgIcon name="check" size={14} /> Admin dashboard</li>
              <li><SvgIcon name="check" size={14} /> SSO & SAML</li>
              <li><SvgIcon name="check" size={14} /> Dedicated support</li>
            </ul>
            <button className="btn-primary">Contact Sales</button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to start building?</h2>
        <p>Join millions of developers building on GSBuilder</p>
        <button className="btn-primary btn-large" onClick={onEnterIDE}>
          Start Coding Now <SvgIcon name="arrowright" size={18} />
        </button>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <SvgIcon name="code" size={24} />
            <span>GSBuilder</span>
            <p>The cloud IDE that runs in your browser</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#templates">Templates</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="#docs">Documentation</a>
              <a href="#">API</a>
              <a href="#">Blog</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 GSBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function IDE({ onExit }) {
  const [files, setFiles] = useState(SAMPLE_FILES)
  const [activeFile, setActiveFile] = useState('src/App.jsx')
  const [fileContent, setFileContent] = useState(SAMPLE_FILES['src'].children['App.jsx'].content)
  const [openTabs, setOpenTabs] = useState(['src/App.jsx'])
  const [terminalOutput, setTerminalOutput] = useState([
    'GSBuilder Terminal v1.0',
    '> npm install',
    'added 245 packages in 3s',
    '> npm run dev',
    'Ready on http://localhost:3000'
  ])
  const [showTerminal, setShowTerminal] = useState(true)
  const [expandedFolders, setExpandedFolders] = useState({ 'src': true, 'components': true, 'styles': true })
  const [consoleMessages, setConsoleMessages] = useState([
    { type: 'log', content: 'App loaded successfully' }
  ])

  const terminalRef = useRef(null)

  const getLanguage = (filename) => {
    const ext = filename.split('.').pop()
    const langMap = { js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript', py: 'python', css: 'css', json: 'json', html: 'html', md: 'markdown' }
    return langMap[ext] || 'plaintext'
  }

  const flattenFiles = (obj, path = '') => {
    let result = {}
    Object.entries(obj).forEach(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name
      if (item.type === 'file') {
        result[fullPath] = item
      } else if (item.children) {
        result = { ...result, ...flattenFiles(item.children, fullPath) }
      }
    })
    return result
  }

  const flatFiles = flattenFiles(files)

  const handleFileSelect = (path) => {
    setActiveFile(path)
    setFileContent(flatFiles[path]?.content || '')
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path])
    }
  }

  const closeTab = (e, path) => {
    e.stopPropagation()
    const newTabs = openTabs.filter(t => t !== path)
    setOpenTabs(newTabs)
    if (activeFile === path && newTabs.length > 0) {
      handleFileSelect(newTabs[newTabs.length - 1])
    }
  }

  const toggleFolder = (name) => {
    setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const renderFileTree = (obj, path = '', depth = 0) => {
    return Object.entries(obj).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name
      const isFolder = item.type === 'folder'
      const isExpanded = expandedFolders[name]
      const paddingLeft = depth * 16 + 8

      return (
        <div key={fullPath}>
          <div 
            className={`file-item ${activeFile === fullPath ? 'active' : ''}`}
            style={{ paddingLeft }}
            onClick={() => isFolder ? toggleFolder(name) : handleFileSelect(fullPath)}
          >
            {isFolder ? (
              <SvgIcon name="chevronright" size={14} className={`folder-icon ${isExpanded ? 'expanded' : ''}`} />
            ) : (
              <SvgIcon name="file" size={14} className="file-icon" />
            )}
            <span>{name}</span>
          </div>
          {isFolder && isExpanded && item.children && (
            <div className="folder-content">
              {renderFileTree(item.children, fullPath, depth + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  const runCode = () => {
    setTerminalOutput(prev => [
      ...prev,
      '',
      `> Running ${activeFile}...`,
      '✓ Build successful',
      '✓ App running at http://localhost:3000'
    ])
    setConsoleMessages(prev => [...prev, { type: 'log', content: 'Server started on port 3000' }])
  }

  return (
    <div className="ide-container">
      <div className="ide-header">
        <div className="ide-header-left">
          <button className="ide-btn" onClick={onExit}>
            <SvgIcon name="x" size={16} />
          </button>
          <div className="ide-logo">
            <SvgIcon name="code" size={18} />
            <span>GSBuilder</span>
          </div>
        </div>
        <div className="ide-header-center">
          <span className="active-file">{activeFile}</span>
        </div>
        <div className="ide-header-right">
          <button className="ide-btn"><SvgIcon name="gitbranch" size={16} /></button>
          <button className="ide-btn"><SvgIcon name="share" size={16} /></button>
          <button className="ide-btn"><SvgIcon name="minimize" size={16} /></button>
          <button className="ide-btn"><SvgIcon name="maximize" size={16} /></button>
        </div>
      </div>

      <div className="ide-main">
        <div className="ide-sidebar">
          <div className="sidebar-tabs">
            <button className="sidebar-tab active"><SvgIcon name="file" size={16} /></button>
            <button className="sidebar-tab"><SvgIcon name="searchcode" size={16} /></button>
            <button className="sidebar-tab"><SvgIcon name="gitbranch" size={16} /></button>
            <button className="sidebar-tab"><SvgIcon name="plug" size={16} /></button>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <span>EXPLORER</span>
              <button className="ide-btn"><SvgIcon name="plus" size={14} /></button>
            </div>
            <div className="file-tree">
              {renderFileTree(files)}
            </div>
          </div>
        </div>

        <div className="ide-editor-area">
          <div className="tab-bar">
            {openTabs.map(tab => (
              <div 
                key={tab}
                className={`tab ${activeFile === tab ? 'active' : ''}`}
                onClick={() => handleFileSelect(tab)}
              >
                <SvgIcon name="file" size={14} />
                <span>{tab.split('/').pop()}</span>
                <button className="tab-close" onClick={(e) => closeTab(e, tab)}>
                  <SvgIcon name="x" size={12} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="editor-wrapper">
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="code-editor"
              spellCheck={false}
            />
          </div>

          <div className="bottom-panel">
            <div className="panel-tabs">
              <button className="panel-tab active"><SvgIcon name="terminal" size={14} /> Console</button>
              <button className="panel-tab"><SvgIcon name="bug" size={14} /> Problems</button>
              <button className="panel-tab"><SvgIcon name="search" size={14} /> Output</button>
            </div>
            {showTerminal && (
              <div className="terminal-panel" ref={terminalRef}>
                <div className="terminal-output">
                  {terminalOutput.map((line, i) => (
                    <div key={i} className="terminal-line">{line}</div>
                  ))}
                </div>
                <div className="terminal-input">
                  <span>$</span>
                  <input type="text" placeholder="Enter command..." />
                </div>
              </div>
            )}
          </div>
          
          <button className="run-btn" onClick={runCode}>
            <SvgIcon name="play" size={14} /> Run
          </button>
        </div>

        <div className="preview-panel">
          <div className="preview-header">
            <span>Preview</span>
            <div className="preview-url">localhost:3000</div>
          </div>
          <div className="preview-frame">
            <div className="preview-content">
              <h2>Hello GSBuilder!</h2>
              <p>Your app is running successfully.</p>
              <div className="preview-counter">
                <span>Clicks: 0</span>
                <button>Increment</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ide-statusbar">
        <div className="status-left">
          <span><SvgIcon name="gitbranch" size={12} /> main*</span>
          <span>0 errors</span>
        </div>
        <div className="status-right">
          <span>UTF-8</span>
          <span>{getLanguage(activeFile)}</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showIDE, setShowIDE] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {showIDE ? (
        <motion.div
          key="ide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <IDE onExit={() => setShowIDE(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage onEnterIDE={() => setShowIDE(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
