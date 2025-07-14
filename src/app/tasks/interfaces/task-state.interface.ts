export enum TaskState {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended',
  PAUSED = 'paused',
  CANCELED = 'canceled',
}

export const availableTaskStates = [
  'created',
  'started',
  'ended',
  'paused',
  'canceled',
];
