import { expect, it, describe, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
// import { db } from '@/firebase/firestore';

describe('firestore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.skip('should create a document reference for students collection ', () => {
    const docRef = db.collection('students');
    expect(docRef).toBeDefined();
  });
});