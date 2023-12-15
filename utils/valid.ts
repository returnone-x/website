export function IsValidUsername(username: string) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9]+)*$/.test(
    username
  );
}
