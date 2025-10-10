////////////STEP 2 ////////////
import { INotificationStrategy } from './notification.interface';
import { sendEmail } from '../email.service';

export class EmailNotificationStrategy implements INotificationStrategy {
  async notify(payload: { to: string; subject: string; message: string }) {
    try {
      await sendEmail(payload.to, payload.subject, payload.message);
    } catch (err) {
      console.error('Email strategy failed for', payload.to, err);
    }
  }
}
