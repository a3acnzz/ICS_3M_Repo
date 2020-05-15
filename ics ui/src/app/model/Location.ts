import {ProgramOwner} from './ProgramOwner';

export class Location {
  id: number;
  name = '';
  code = '';
  timeZone = '';
  active: boolean;
  showInSignUpList: boolean;
  programOwnerList: ProgramOwner[];
}
