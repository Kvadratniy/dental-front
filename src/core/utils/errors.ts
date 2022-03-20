export function getGenericError(errorCode: number): string {
  switch (errorCode) {
    case 401:
      return 'Введен неверный логин или пароль';
    default:
      return `
        Что-то пошло не так. Пожалуйста, повторите попытку позже. ${
          errorCode ? `Код ошибки: ${errorCode}` : ''
        }
      `.trim();
  }
}

export function getHTTPError(error: any, asPromise = false): any {
  let errorWithMessage = '';
  console.log(error.response);
  if (error.response) {
    errorWithMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      getGenericError(error.response.status);
  } else {
    errorWithMessage = `${error.message}`;
    console.error(error.message);
  }

  return asPromise ? Promise.reject(errorWithMessage) : errorWithMessage;
}
