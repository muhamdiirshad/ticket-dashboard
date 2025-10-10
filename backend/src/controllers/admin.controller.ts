////////////STEP 2 ////////////

import { Request, Response } from 'express';

export function enableSuperUser(req: Request, res: Response) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Password required' });
  if (password !== process.env.SUPERUSER_PASSWORD) return res.status(403).json({ message: 'Invalid password' });
  return res.json({ success: true, superUser: true, message: 'Super user mode enabled' });
}

export function disableSuperUser(req: Request, res: Response) {
  return res.json({ success: true, superUser: false, message: 'Super user mode disabled' });
}
