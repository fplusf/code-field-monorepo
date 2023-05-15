import { useState, useEffect } from 'react';

type StoreValue = string | number | boolean | Record<string, unknown>;

const useStore = () => {
  const [store, setStore] = useState<Map<string, StoreValue>>(new Map());

  useEffect(() => {
    // Load store from localStorage on mount
    const storeString = localStorage.getItem('store');
    if (storeString) {
      const parsedStore = new Map(JSON.parse(storeString)) as Map<
        string,
        StoreValue
      >;
      setStore(parsedStore);
    }
  }, []);

  useEffect(() => {
    // Save store to localStorage on update
    localStorage.setItem('store', JSON.stringify(Array.from(store.entries())));
  }, [store]);

  const get = <T extends StoreValue>(key: string): T | undefined => {
    return store.get(key) as T;
  };

  const set = <T extends StoreValue>(key: string, value: T): void => {
    const newStore = new Map(store);
    newStore.set(key, value);
    setStore(newStore);
  };

  return { get, set };
};

export default useStore;
