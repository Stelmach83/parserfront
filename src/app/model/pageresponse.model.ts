import { User } from './user.model';

export class PageResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  pageable: any;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
  numberOfElements: number;
}
