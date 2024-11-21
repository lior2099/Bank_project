export const  activateMock = (body) => {
  if (body.email == ""){
    throw new Error("Email all rdy sign in , use a new one ");
  }
};
