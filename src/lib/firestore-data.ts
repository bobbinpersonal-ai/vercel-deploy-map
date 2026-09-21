import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

export type FirestoreRecord = DocumentData & { id: string };
const DEFAULT_QUERY_CONSTRAINTS: QueryConstraint[] = [orderBy("createdAt", "desc")];

export function useFirestoreCollection<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = DEFAULT_QUERY_CONSTRAINTS,
) {
  const [records, setRecords] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const reference = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      query(reference, ...constraints),
      (snapshot) => {
        setRecords(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T & { id: string }));
        setLoading(false);
      },
      (value) => {
        setError(value instanceof Error ? value : new Error("Could not load data."));
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [collectionName, constraints]);

  return { records, loading, error };
}

export function createFirestoreRecord(collectionName: string, data: DocumentData) {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function updateFirestoreRecord(collectionName: string, id: string, data: DocumentData) {
  return updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() });
}
