export type MahasiswaDto = {
  id: number
  nrp: string
  jurusan: string
  departement: string
  qr: string
  userId: number
  user : {
    id : number
    name : string
    email : string
  }
}