export class EmailTemplate {
  id: number;
  templateType = '';
  subject = '';
  message = '';
  programId: number;
  locationId: number;
  active: boolean;
  templateLevel = ''; // Used for UI display only
}

export class EmailTemplateMetadata {
  subjectMaxLength = 150;
  messageMaxLength = 2000;
}
