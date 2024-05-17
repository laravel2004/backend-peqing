export type MahasiswaUpdateDto = {
  id: number;
  nrp: string;
  jurusan: string;
  departement: string;
}

export type MahasiswaUserUpdateDto = {
  id: number;
  nrp: string;
  jurusan : string;
  departement : string;
  userId: number;
  user : {
    id : number
    name : string
    email : string
  }
}