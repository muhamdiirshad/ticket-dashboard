import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { enableSuper, disableSuper } from '../../features/superuser/superuserSlice';
import Modal from './Modal';

export default function SuperUserToggle() {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(s => s.superuser.enabled);
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div>
      <button className={`btn ${enabled ? 'btn-ghost' : ''}`} onClick={() => setOpen(true)}>{enabled ? 'Super ON' : 'Super OFF'}</button>

      <Modal open={open} onClose={() => { setOpen(false); setPwd(''); setShow(false); }}>
        {!enabled ? (
          <div>
            <h3>Enable Super-user</h3>
            <p className="muted">Enter the super-user password to reveal creators/updates</p>

            <div style={{ position: 'relative', marginTop: 8 }}>
              <input className="input" type={show ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Password" />
              <button type="button" onClick={() => setShow(s => !s)} className="eye-btn">{show ? '🙈' : '👁️'}</button>
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn" onClick={() => { dispatch(enableSuper(pwd)); setOpen(false); setPwd(''); }}>Enable</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>Super-user enabled</h3>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-danger" onClick={() => { dispatch(disableSuper()); setOpen(false); }}>Disable</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
