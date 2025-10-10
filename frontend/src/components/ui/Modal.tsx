import React from 'react';

interface Props { open: boolean; children: React.ReactNode; onClose: () => void; title?: string; }

export default function Modal({ open, children, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
