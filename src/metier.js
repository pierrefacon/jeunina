
import { verbes } from './verbes.js';
const limitedifficile=7;
//import { verbes } from './verb.js';
export const metier = {
  state: {
    verbes 
  },
  getBonusfromIndex(index,niveau){
    let bonus=0;
    switch (niveau){
      case "1":
          if ((verbes[index].c).length>limitedifficile){
            bonus=6;
            }else{
              bonus=3;
            }
            break;   
        case "2":
            if ((verbes[index].c).length>limitedifficile){
              bonus=5;
              }else{
                bonus=2;
              }
              break; 
          case "3":
              if ((verbes[index].c).length>limitedifficile){
                bonus=4;
                }else{
                  bonus=2;
                }
                break; 
            case "4":
                if ((verbes[index].c).length>limitedifficile){
                  bonus=3;
                  }else{
                    bonus=1;
                  }
                  break; 
              case "5":
                  if ((verbes[index].c).length>limitedifficile){
                    bonus=2;
                    }else{
                      bonus=1;
                    }
                    break; 
                default:     
                if ((verbes[index].c).length>limitedifficile){
                  bonus=1;
                  }else{
                    bonus=0;
                  }
          }
          return bonus;

  },
  isVerbExistInFile(enclair){
    for (var ind=0;ind<12307;ind++){
      if (enclair==verbes[ind].c){
        return true;
      }
    }
    return false;
  } ,
 getPointsfromIndex(index,niveau){
    var localpoints=0;
    switch (niveau){
      case "1":
          if ((verbes[index].c).length>limitedifficile){
            localpoints=30;
            }else{
              localpoints=15;
            }
            break;   
        case "2":
            if ((verbes[index].c).length>limitedifficile){
              localpoints=20;
              }else{
                localpoints=10;
              }
              break;   
          case "3":
              if ((verbes[index].c).length>limitedifficile){
                localpoints=14;
                }else{
                  localpoints=7;
                }
                break;   
            case "4":
                if ((verbes[index].c).length>limitedifficile){
                  localpoints=12;
                  }else{
                    localpoints=6;
                  }
                  break;   
              case "5":
                  if ((verbes[index].c).length>limitedifficile){
                    localpoints=10;
                    }else{
                      localpoints=5;
                    }
                    break;  
                default: 
                if ((verbes[index].c).length>limitedifficile){
                  localpoints=26;
                  }else{
                    localpoints=13;
                  }
                  break;       
          }
          return localpoints;
  },
  getVerbefromIndex(index){
    return (verbes[index].c);
  },
  getGroupeFromIndex(index){
    return ("Groupe : "+verbes[index].g);
  },
  getSensFromIndex(index){
    //si le sens est exactement le verbe, on retourne pas d'équivalent
    if (this.getPhraseFromIndex(index)==verbes[index].s){
      return (" sens : pas d'autre sens trouvé");
    }else{
    return (" sens : "+verbes[index].s);}
  },
  getPhraseFromIndex(index){
    var res = verbes[index].p.replace(" P ", " Nina ");
    var res = res.replace(" P, ", " Nina ");
    var res = res.replace(" P.", " Nina ");
    var res = res.replace(this.getVerbefromIndex(index)," ");
    return (res);
  },
  getIndexeVerbe (niveau,maxlettres) {
   /*console.log("verbes dans getindexeverve"+verbes);
   console.log("ci dessous typeof");
   console.log(typeof verbes);
   console.log("essai d acces"+verbes[10].c);*/

    //va lire un verbe au hazard, si il correspond au niveau demandé
    //le renvoie, sinon on continue. 
    //niveau 0.03 ==> niveau 1 leplus difficile
    //entre 0.03 et 1 ==>niveau 2
    //entre 1 et 5 == niveau 3
    //entre 5 et 10 == niveau 4
    //entre 10 et pas de limite niveau 5
    //niveau 6 : tous 
    var count=0;
    while (true){
      count++;
      if (count>20000){
    //    window.console.log("FIN count vaut" + count);
        return 99999}
      //  window.console.log("count vaut" + count);
               //12307 
      var rand =Math.floor(Math.random() * (+12308  - +0)) + +0;  
     // window.console.log("attention:"+rand); 
      //on ne retient que les verbes ayant un max de letrres
      // window.console.log(verbes[rand].c);
       //window.console.log((verbes[rand].c).length);

       if ((verbes[rand].c).length > maxlettres){continue;}
       //ici on élimine les verbes qui terminent par u, é, i
       var leverbe=verbes[rand].c;
       if (leverbe.charAt(leverbe.length - 1)=='u'){continue;}
       if (leverbe.charAt(leverbe.length - 1)=='é'){continue;}
       if (leverbe.charAt(leverbe.length - 1)=='i'){continue;}
       if ((niveau == 1) && (verbes[rand].r==0.03 )){
      
        //on contrôle si le verbe n'a pas déjà été trouvé
        if (this.isExistinLS(verbes[rand].c)){
          continue;
        }
        //return (verbes[rand].c);
        return rand;
      }
      if ((niveau == 2) && ((verbes[rand].r>=0.04)&&(verbes[rand].r<1)) ){
      
         //on contrôle si le verbe n'a pas déjà été trouvé
         if (this.isExistinLS(verbes[rand].c)){
          continue;
        }
        return rand;
      }
      if ((niveau == 3) && ((verbes[rand].r>=1)&&(verbes[rand].r<5)) ){
    
         //on contrôle si le verbe n'a pas déjà été trouvé
         if (this.isExistinLS(verbes[rand].c)){
          continue;
        }
        return rand;
      }
      if ((niveau == 4) && ((verbes[rand].r>=0.05)&&(verbes[rand].r<10)) ){
      
         //on contrôle si le verbe n'a pas déjà été trouvé
         if (this.isExistinLS(verbes[rand].c)){
          continue;
        }
        return rand;
      }
      window.console.log("rareté"+verbes[rand].r);
      if ((niveau == 5) && ((verbes[rand].r>=10)) ){

         //on contrôle si le verbe n'a pas déjà été trouvé
         if (this.isExistinLS(verbes[rand].c)){
          continue;
        }
        return rand;
      }
      if (niveau == 6) {
        
        //on contrôle si le verbe n'a pas déjà été trouvé
        if (this.isExistinLS(verbes[rand].c)){
         continue;
       }
       return rand;
     }

    }
  },
  mixLettresVerbe (verbe){
    var a = verbe.split("");
    var n = a.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
  },
  //permet de prendre un string et de renvoyer un tableau JSON composé 
  //de chacun des caractères. exemple : ai donne
  //[{name:a,id:1},{name:i,id:2}]
  verbToJson(verbe){
    var index=1;
    if (verbe=='') return [];
    var tableau = [];
    var tableauresultat = verbe.split("");
    tableauresultat.forEach(element => {
      tableau.push({name:element ,id:index});
      index++;
    }); 
    return tableau;    
  },
  isExistinLS(id){
    var already=false;
    if (localStorage.getItem("already") === null) {
      let entree = []; 
      localStorage.setItem("already",JSON.stringify(entree));
    }
      let entrees=JSON.parse(localStorage.getItem("already"));
    //  window.console.log(entrees);
    //  window.console.log(id);
      if (entrees.includes(id)){
          already=true;
          return already;
      }    
      entrees.push(id);
      localStorage.setItem("already",JSON.stringify(entrees));
      return already;
  }
}
