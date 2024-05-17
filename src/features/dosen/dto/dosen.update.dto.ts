export type DosenUpdateDto = {
  id : number;
  userId : number;
  nip : string
}

export type DosenUserUpdateDto = {
  id : number;
  userId : number;
  nip : string;
  user : {
    name : string
    email : string
    id : number
  }
}