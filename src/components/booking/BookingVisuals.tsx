"use client";
import { motion } from "motion/react";
import QRCode from "react-qr-code";

interface Props {
  qrValue: string;
}

export function BookingVisuals({ qrValue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center space-y-8 bg-surface border border-accent/10 rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl"
    >
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />

      <div className="text-center">
        <h3 className="text-2xl font-black uppercase italic text-accent">
          Scan & Send
        </h3>
        <p className="text-sm text-muted mt-2">
          The QR updates live with your info.
        </p>
      </div>

      <div className="p-4 bg-white rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.2)] border-8 border-white">
        <QRCode value={qrValue} size={220} fgColor="#020617" level="H" />
      </div>

      <div className="w-full space-y-4">
        <a
          href={qrValue}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-tighter hover:brightness-110 transition-all shadow-xl shadow-green-500/20"
        >
          Open WhatsApp
        </a>
        <p className="text-[10px] text-center text-muted uppercase tracking-[0.2em]">
          One-tap confirmation
        </p>
      </div>
    </motion.div>
  );
}
