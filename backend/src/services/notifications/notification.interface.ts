////////////STEP 2 ////////////

export interface INotificationStrategy {
  notify(payload: any): Promise<void>;
}
