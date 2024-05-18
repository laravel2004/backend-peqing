export type NilaiShowDto = {
  id : number;
  grade : string;
  nilai : number;
  kelasId : number;
  mahasiswa : {
    id : number;
    userId : number;
    name : string
  },
  typeNilai : {
    id : number,
    name : string
  },
}