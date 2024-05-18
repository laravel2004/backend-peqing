export type KelasShowDto = {
  id: number;
  name : string;
  matakuliah : {
    id : number;
    name : string;
  }
  dosen : {
    nip : string;
    id : number;
    user : {
      name : string;
      email : string;
      id : number;
    }
  }
}