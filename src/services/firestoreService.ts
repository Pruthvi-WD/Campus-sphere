/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  writeBatch 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  Student, 
  Staff, 
  TimetableSlot, 
  Notice, 
  Grievance, 
  Resource, 
  StudyGroup, 
  CertificateRequest, 
  Invoice 
} from '../types';
import { 
  MOCK_STUDENTS, 
  MOCK_STAFF, 
  INITIAL_TIMETABLE, 
  INITIAL_NOTICES, 
  INITIAL_GRIEVANCES, 
  INITIAL_RESOURCES, 
  INITIAL_STUDY_GROUPS, 
  INITIAL_CERTIFICATES, 
  INITIAL_INVOICES 
} from '../data';

// Helper to seed Firestore if empty
export async function seedInitialFirestoreData() {
  try {
    const studentsSnap = await getDocs(collection(db, 'students'));
    if (studentsSnap.empty) {
      console.log('Seeding initial GMU Engineering data to Cloud Firestore...');
      const batch = writeBatch(db);

      MOCK_STUDENTS.forEach((st) => {
        batch.set(doc(db, 'students', st.id), st);
      });
      MOCK_STAFF.forEach((st) => {
        batch.set(doc(db, 'staff', st.id), st);
      });
      INITIAL_TIMETABLE.forEach((slot) => {
        batch.set(doc(db, 'timetable', slot.id), slot);
      });
      INITIAL_NOTICES.forEach((not) => {
        batch.set(doc(db, 'notices', not.id), not);
      });
      INITIAL_RESOURCES.forEach((res) => {
        batch.set(doc(db, 'resources', res.id), res);
      });
      INITIAL_GRIEVANCES.forEach((gr) => {
        batch.set(doc(db, 'grievances', gr.id), gr);
      });
      INITIAL_STUDY_GROUPS.forEach((sg) => {
        batch.set(doc(db, 'studyGroups', sg.id), sg);
      });
      INITIAL_CERTIFICATES.forEach((c) => {
        batch.set(doc(db, 'certificates', c.id), c);
      });
      INITIAL_INVOICES.forEach((inv) => {
        batch.set(doc(db, 'invoices', inv.id), inv);
      });

      await batch.commit();
      console.log('Firestore seeding complete!');
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'students_seed');
  }
}

// Subscriptions
export function subscribeToStudents(callback: (students: Student[]) => void) {
  const path = 'students';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as Student);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToStaff(callback: (staffList: Staff[]) => void) {
  const path = 'staff';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as Staff);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToTimetable(callback: (slots: TimetableSlot[]) => void) {
  const path = 'timetable';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as TimetableSlot);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToNotices(callback: (notices: Notice[]) => void) {
  const path = 'notices';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as Notice);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToGrievances(callback: (grievances: Grievance[]) => void) {
  const path = 'grievances';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as Grievance);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToResources(callback: (resources: Resource[]) => void) {
  const path = 'resources';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as Resource);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToStudyGroups(callback: (groups: StudyGroup[]) => void) {
  const path = 'studyGroups';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as StudyGroup);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

export function subscribeToCertificates(callback: (certs: CertificateRequest[]) => void) {
  const path = 'certificates';
  return onSnapshot(collection(db, path), (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs.map(d => d.data() as CertificateRequest);
      callback(data);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, path);
  });
}

// Write Operations
export async function saveStudentToFirestore(student: Student) {
  const path = `students/${student.id}`;
  try {
    await setDoc(doc(db, 'students', student.id), student, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveStudentsBulkToFirestore(students: Student[]) {
  try {
    const batch = writeBatch(db);
    students.forEach((s) => {
      batch.set(doc(db, 'students', s.id), s, { merge: true });
    });
    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'students/bulk');
  }
}

export async function saveTimetableSlotToFirestore(slot: TimetableSlot) {
  const path = `timetable/${slot.id}`;
  try {
    await setDoc(doc(db, 'timetable', slot.id), slot, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveNoticeToFirestore(notice: Notice) {
  const path = `notices/${notice.id}`;
  try {
    await setDoc(doc(db, 'notices', notice.id), notice, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveGrievanceToFirestore(grievance: Grievance) {
  const path = `grievances/${grievance.id}`;
  try {
    await setDoc(doc(db, 'grievances', grievance.id), grievance, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveResourceToFirestore(resource: Resource) {
  const path = `resources/${resource.id}`;
  try {
    await setDoc(doc(db, 'resources', resource.id), resource, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveStudyGroupToFirestore(group: StudyGroup) {
  const path = `studyGroups/${group.id}`;
  try {
    await setDoc(doc(db, 'studyGroups', group.id), group, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function saveCertificateToFirestore(cert: CertificateRequest) {
  const path = `certificates/${cert.id}`;
  try {
    await setDoc(doc(db, 'certificates', cert.id), cert, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}
