export const isEmail = (email: string): boolean => {
  const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRE.test(email.toLowerCase());
};

export const isPassword = (password: string): boolean => {
  const passwordRE = /[A-z0-9]{6,}/;
  return passwordRE.test(password);
};
