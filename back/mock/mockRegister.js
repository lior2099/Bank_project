export const mockRegister = (body) => {
  if (body.email.startsWith('Lior')){
    throw new Error("Email all rdy sign in , use a new one ");
  }
};
