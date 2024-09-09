export const checkErrors = (message: string) => {
  switch (true) {
    case message === "Can't find user by email" ||
      message.includes('No found user by email'):
      return 'Користувача з таким email не існує.';
    case message === 'CredentialsSignin':
      return 'Помилка входу. Перевірте правильність наданих вами даних.';
    case message === 'Bad credentials':
      return 'Неправильний логін або пароль.';
    case message.includes("Can't register user. The same user with email"):
      return 'Користувач з таким email вже існує.';
    default:
      return 'Невідома помилка.';
  }
};
