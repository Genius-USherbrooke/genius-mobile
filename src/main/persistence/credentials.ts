import * as SecureStore from 'expo-secure-store';

export interface Credentials {
  cip: string;
  password: string;
}

export async function save(credentials: Credentials): Promise<boolean> {
  await Promise.all([
    SecureStore.setItemAsync('cip', credentials.cip),
    SecureStore.setItemAsync('password', credentials.password)
  ]).then(() => {
    return true;
  });

  return false
}

export async function get(): Promise<Credentials | null> {
  await Promise.all([
    SecureStore.getItemAsync('cip'),
    SecureStore.getItemAsync('password')
  ]).then(values => {
    return {
      cip: values[0],
      password: values[1]
    };
  });

  return null;
}