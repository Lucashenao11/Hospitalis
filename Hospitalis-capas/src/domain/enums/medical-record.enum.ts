export enum RecordType {
  DIAGNOSIS     = 'diagnosis',
  CLINICAL_NOTE = 'clinical_note',
  LAB_RESULT    = 'lab_result',
  PRESCRIPTION  = 'prescription',
  PROCEDURE     = 'procedure',
  VITAL_SIGNS   = 'vital_signs',
}

export enum RecordStatus {
  ACTIVE   = 'active',
  RESOLVED = 'resolved',
  ARCHIVED = 'archived',
}
