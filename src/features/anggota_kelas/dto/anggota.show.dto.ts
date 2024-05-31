export type AnggotaShowDto = {
  id : number,
  kelas : {
    id : number;
    name : string;
  },
  mahasiswa : {
    id : number;
    jurusan : string;
    nrp : string;
    departement : string;
    user : {
      id : number;
      name : string
    }
  }
}