import * as SecureStore from 'expo-secure-store';

export interface Credentials {
  cip: string;
  password: string;
}

export async function save(credentials: Credentials): Promise<boolean> {
  let ret = false;

  await Promise.all([
    SecureStore.setItemAsync('cip', credentials.cip),
    SecureStore.setItemAsync('password', credentials.password)
  ]).then(() => {
    ret = true;
  });

  return ret;
}

export async function get(): Promise<Credentials | null> {
  let ret = null;

  await Promise.all([
    SecureStore.getItemAsync('cip'),
    SecureStore.getItemAsync('password')
  ]).then(values => {
    ret = {
      cip: values[0],
      password: values[1]
    };
  });

  return ret;
}