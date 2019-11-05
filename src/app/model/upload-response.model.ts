import { User } from './user.model';

export class UploadResponse {
  correctEntries: number;
  entriesWithErrors: number;
  addedEntries: User[];
  invalidEntries: User[];
}
