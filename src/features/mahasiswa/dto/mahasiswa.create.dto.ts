export type MahasiswaCreateDto = {
  nrp : string,
  jurusan : string,
  departement : string
  qr :string,
  userId : number
}

export type MahasiswaCsvCreateDto = {
  name : string;
  email : string;
  password : string;
  nrp : string;
  jurusan : string;
  departement : string
}