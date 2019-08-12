<template>
<div id="topgun" class="float-left">
   <div class="row" style="margin-bottom:30px">
      <div class="col-6 col-md-3">
        <button type="button" class="btn btn-primary btn-primay custom text-left ">
    Verbes tentés <span class="text-large badge badge-light" style="font-size:13px">{{tentes}}</span>
  </button>
        </div>
      <div class="col-6 col-md-3">
     <button type="button" class="btn btn-primary btn-danger custom text-left">
  Verbes trouvés <span class="text-large badge badge-light" style="font-size:13px">{{trouves}}</span>
  </button>
        </div>
         <div class="col-6 col-md-3">
     <button type="button" class="btn btn-primary btn-warning custom text-left">
  Points gagnés <span class="text-large badge badge-light" style="font-size:13px">{{points}}</span>
  </button>
        </div>
        <div class="col-6 col-md-3">
     <button type="button" class="btn btn-primary btn-success custom text-left">
  Bonus <span class="text-large badge badge-light" style="font-size:13px">{{bonus}}</span>
  </button>
        </div>
    </div>
   
      <div class="col-12 col-md-12 alert alert-success" style="font-size:12px">
        <strong>Message : <span style="color:red">{{gagneperdu}}</span></strong>
  
    
    </div>
<div class="form-large ">
  <div class="row text-left">
    <div class="col-12 col-md-12">
      <h5>Déplacez ces lettres...</h5>
      <draggable id="givenletters" :disabled="drag" class="list-group list-group-horizontal" :list="list1" group="people" >
        <div v-bind:style="{fontSize: lafont+'px', padding: lepadding+'px'}"
         class="list-group-item"
          v-for="(element) in list1"
          :key="element.id"
        >
          {{ element.name }} 
        </div>
      </draggable>
    </div>
  </div>
  <div class="row">
    <div class="col-12 text-left">
      <h5>Ci-dessous !</h5>
    </div>
    </div>
    <div class="row">
    <div class="col-12 col-md-12" >
   <!--   <h3>Déplacer ci-dessous</h3>-->
<div class="form-large-inner " v-bind:style="{height: lahauteur+'px'}">
      <draggable 
      :disabled="drag" class="list-group list-group-horizontal" :list="list2" group="people" @change="log">
        <div
         v-bind:style="{color:lacouleur,fontSize: lafont+'px', padding: lepadding+'px'}"
          class="list-group-item"
          v-for="(element) in list2"
          :key="element.id"
        >
          {{ element.name }}
        </div>
      </draggable>
 </div>
   
  </div>
  <!--fin div form-sec-->
</div>  
</div>
<div class="row" style="margin-bottom:30px"></div>
<div class="row" style="margin-bottom:30px">
<div class="col-6 col-md-6">
  <!--ci dessous class="form-sec "-->
<div>
 <form class="text-left">
    <div class="form-group ">
      <label ><strong>Rejouer !</strong></label>
      <button type="button" @click="autreverbe" class="btn btn-primary form-control">Autre verbe</button>
    </div>
  </form>
  </div>


<!--<div class="row" style="margin-bottom:30px"></div>
<div class="row" style="margin-bottom:30px"></div>-->

<!--ci dessous class="form-sec "-->
<div >
 <form class="text-left">
    <div class="form-group ">
      <label ><strong>Les Aides</strong></label>
        <button type="button" :disabled="boutongroupe" @click="aide1" class="btn btn-primary form-control custom1">Groupe du verbe : (Perte points)</button>
        <label class="grossefont">{{groupe}}</label>
    </div>
    <div class="form-group">
       <button type="button" :disabled="boutonsens" @click="aide2" class="btn btn-primary form-control custom1">Sens du verbe (Perte bonus)</button>
        <label class="grossefont">{{sens}}</label>
    </div>
    <div class="form-group">   
       <button type="button" :disabled="boutonphrase" @click="aide3" class="btn btn-primary form-control custom1">Phrase utilisant ce verbe (Perte points) </button>
      <label class="grossefont">{{phrase}}</label>
    </div>
	<div class="form-group">
        <button type="button" :disabled="boutonlettresdonnees" @click="bonus1" class="btn btn-primary form-control custom1">Donner une lettre du verbe (Perte bonus</button>
        <label class="grossefont">{{lettresdonnees}}</label>
    </div>
	 
	<div class="form-group">
       <label ><strong>Pas Trouvé ?</strong></label>
      <button type="button" @click="langocha" :disabled="boutonlangocha" class="btn btn-primary form-control custom1">{{solution}}</button>
    </div>
  </form>
  </div>

<!--fin de colonnage-->
</div>
<div class="col-6 col-md-6">
<!--<div class="row" style="margin-bottom:30px"></div>
<div class="row" style="margin-bottom:30px"></div>-->
<!--ci desssous, class=font-small-->
<div>
 <form class="text-left">
    <div class="form-group ">
    <label for="niveau">Niveau de difficulté</label>
    <select id="niveau" class="form-control" v-model="selected">
      <option v-for="option in niveaux" v-bind:value="option.value">
      {{ option.text }}
      </option>
    </select>
  </div>
   <div class="form-group">
    <label for="nombrelettres">Nombre Max de lettres du verbe :</label>
    <select id="nombrelettres" class="form-control" v-model="selectednombrelettres">
      <option v-for="option in nombrelettres" v-bind:value="option.value">
      {{ option.text }}
      </option>
    </select>
  </div>
   
  </form>
  
</div>
<!-- fin colonnage-->
</div>
</div>
<div class="row" style="margin-bottom:30px"></div>
<div class="row" style="margin-bottom:30px"></div>

<div class="form-sec ">
 <form class="text-left">
    <div class="form-group ">
      <label ><strong>Réinitialiser</strong></label>
      <button type="button" @click="init" class="btn btn-primary form-control">Vous repartez à zéro !</button>
    </div>
  </form>
  </div>

</div>
</template>
<script>
import { metier } from '../metier.js';
import draggable from "vuedraggable";
export default {
  name: "TwoLists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  mounted() {
    
   
    //appelgetverbe en donnant le niveau (5 plus facile, 1 le plus difficile, ou 6 tous) et le nombre max
    //de lettres du verbe
    //attention getverbe renvoie l'indexe du verbe
   // Ci-dessous, on reprend le dernier niveau de difficulté en LS
   // L'utilisateur retrouvera son niveau
   if (localStorage.selected) {
      this.selected = localStorage.selected;
    }
    if (localStorage.selectednombrelettres) {
      this.selectednombrelettres = localStorage.selectednombrelettres;
    }
     if (localStorage.tentes) {
      this.tentes = localStorage.tentes;
    }
     if (localStorage.trouves) {
      this.trouves = localStorage.trouves;
    }
     if (localStorage.points) {
      this.points = localStorage.points;
    }
     if (localStorage.bonus) {
      this.bonus = localStorage.bonus;
    }
     if (localStorage.contexte) {
      this.contexte = localStorage.contexte;
    }
     if (localStorage.contexteindexe) {
      this.contexteindexe = localStorage.contexteindexe;
    }
    // y a t il un contexte en cours ?
if (this.contexte=="false"){
  this.indexeverbe=metier.getIndexeVerbe(this.selected,this.selectednombrelettres);
  //console.log("contexte=false"+this.indexeverbe);
  this.tentes++;
  this.contexte="true";
  this.contexteindexe=this.indexeverbe;}
  else{
  //console.log("contexte=true"+this.contexteindexe);
  this.indexeverbe=this.contexteindexe;
  }
  if (this.indexeverbe==99999){
      this.contexte="false";
      this.gagneperdu="changez de niveau ou augmentez le nombre de lettres ou réinitialisez";
      }else{
  this.verbeclair=metier.getVerbefromIndex(this.indexeverbe);
  this.list1=metier.verbToJson(metier.mixLettresVerbe(this.verbeclair));
  this.pointsencours=metier.getPointsfromIndex(this.indexeverbe,this.selected);
  this.bonusencours=metier.getBonusfromIndex(this.indexeverbe,this.selected);
  
  this.gagneperdu="";
  this.verbetrouve=false;
  if (this.bonus<=0){
    this.boutonsens=true;
  }
  }
  var longueurverbeclair = this.verbeclair.length;
  var padding = this.computePadding(longueurverbeclair);
  
  this.lepadding=padding;
  
 //document.getElementById('setletters').clientHeight=document.getElementById('givenletters').clientHeight;
  },
  updated(){
   /*   if (this.first==0){
      this.lahauteur=document.getElementById('givenletters').clientHeight;
      //this.lahauteur=this.lahauteur+100;
      this.first=1;
      }*/
      if (this.list1.length>0){
        this.lahauteur=document.getElementById('givenletters').clientHeight;}

   //confirm("hauteur"+document.getElementById('givenletters').clientHeight);
   // this.lahauteur=this.hauteursauvee;

  },
   computed: {
  	boutonlettresdonnees: function(){
      if (this.bonus<="0")
        {return true;}
        else
    	  {return false;}
    }
   },
  data() {
    return {
      list1: [
        //{ name: "a" ,id:1},{ name: "i",id=2 }
      ],
      list2: [
       // { name: "a",id:3 },{ name: "i",id:4 }
    ],
    //les sélecteurs css ici début
    first:0,
    laposition:'relative',
    ledisplay:'block',
    lamarge:-1,
    labordure:1,
    lepadding:15,
    lahauteur:100,
    //seul utilisé ci-dessous
    lafont:36,
    lacouleur:'#000000',
    //fin sélecteurs css
      verbeclair:'', 
      indexeverbe:'',
      gagneperdu: "",
      sens:"",
      groupe:"",
      phrase:"",
      lettresdonnees:"",
      indexlettredonnee:0,
      tentes:0,
      trouves:0,
      points:0,
      bonus:0,
      bonusencours:0,
      pointsencours:0,
      boutongroupe:false,
      boutonsens:false,
      boutonphrase:false,
      boutonlangocha:false,
      drag:false,
      solution:"Donner sa langue au chat",
      contexte:"false",
      contexteindexe:0,
      niveaux: [
      { text: 'Facile', value: '5' },
      { text: 'Moins Facile', value: '4' },
      { text: 'Encore Moins Facile', value: '3' },
      { text: 'Difficile', value: '2' },
      { text: 'Très Difficile', value: '1' },
      { text: 'Tout mélangé', value: '6' },
    ],
    selected: '5',
    nombrelettres: [
        { text: 'Jusque 4 lettres', value: '4' },
        { text: 'Maximum 5 lettres', value: '5' },
        { text: 'Maximum 6 lettres', value: '6' },
        { text: 'Maximum 7 lettres', value: '7' },
        { text: 'Maximum 8 lettres', value: '8' },
        { text: 'Maximum 9 lettres', value: '9' },
        { text: 'Maximum 10 lettres', value: '10' },
        { text: 'Maximum 11 lettres', value: '11' },
        { text: 'Maximum 12 lettres', value: '12' },
        { text: 'Pas de limite', value: '30' },
       
    ],
    selectednombrelettres: '7',
    };
  },
  //ci-dessous, on se met à l'écoute d'une nouvelle sélection
  //par l'utilisateur. Si oui, en met à jour la LS
   watch: {
    selected(nouvelleselection) {
      localStorage.selected = nouvelleselection;
    },
    selectednombrelettres(nouvelleselection) {
      localStorage.selectednombrelettres = nouvelleselection;
    },
      tentes(nouvelleselection) {
      localStorage.tentes = nouvelleselection;
    },
     trouves(nouvelleselection) {
      localStorage.trouves = nouvelleselection;
    },
     points(nouvelleselection) {
      localStorage.points = nouvelleselection;
    },
     bonus(nouvelleselection) {
      localStorage.bonus = nouvelleselection;
    },
    contexte(nouvelleselection){
      localStorage.contexte=nouvelleselection;
    },
    contexteindexe(nouvelleselection){
       localStorage.contexteindexe=nouvelleselection;
    }
  },
  methods: {
    //fonction qui sert à calculer le padding pour chaque lettre
    computePadding:function(nblettres){
      //ici 23.6 est la largeur d'une lettre
        var largeurlettres=23.6*nblettres;
        var restant = screen.width-largeurlettres;
        var padding = restant / (nblettres* 2);
        if (padding > 30){
          padding=30;
        }
        return padding;
    },
    init:function(){
     // confirm(screen.width);
    // var x= confirm( screen.width);
      if ( confirm( "Attention, vous repartez à zéro !" ) ) {
      } else {
          return;
        }
        this.list1=[];
        this.list2=[];
        this.indexlettredonnee=0;
        this.lettresdonnees="";
        this.gagneperdu="";
        this.verbeclair="";
        this.sens="";
        this.groupe="",
        this.phrase="";
        this.bonus=0;
        this.points=0;
        this.trouves=0;
        this.tentes=0;
        this.bonusencours=0;
        this.pointsencours=0;
        this.boutongroupe=true;
        this.boutonsens=true;
        this.boutonphrase=true;
        this.boutonlettresdonnees=true;
        this.boutonlangocha=true;
        this.contexte="false";
        localStorage.removeItem("already");
        localStorage.clear();

    },
    langocha:function(){
       if ( confirm( "Etes vous certain de donner votre langue au chat ?" ) ) {
      } else {
          return;
        }
        this.solution=this.verbeclair;
        this.drag=true;
    },
    aide1:function(){
        this.groupe=metier.getGroupeFromIndex(this.indexeverbe);
        if (this.verbetrouve==false){
          this.pointsencours = (this.pointsencours==0)?0:this.pointsencours-4;}
       // this.boutongroupe=true;
      //  this.bonusencours--;
    },
    aide2:function(){
        this.sens=metier.getSensFromIndex(this.indexeverbe);
        
        if (this.verbetrouve==false){
          this.pointsencours = (this.pointsencours==0)?0:this.pointsencours-4;
          this.bonusencours--;}
      //  this.boutonsens=true;
       // this.bonusencours--;
    },
    aide3:function(){
        this.phrase=metier.getPhraseFromIndex(this.indexeverbe);
        
        if (this.verbetrouve==false){
          this.pointsencours = (this.pointsencours==0)?0:this.pointsencours-4;}
       // this.boutonphrase=true;
     //  this.bonusencours--;
    },
    bonus1:function(){
        if (this.indexlettredonnee>=this.verbeclair.length)
        {
          return;
        }
        this.lettresdonnees=this.lettresdonnees+this.verbeclair.charAt(this.indexlettredonnee);
        this.indexlettredonnee++;
        if (this.verbetrouve==false){
        this.bonusencours--;}
    },
    autreverbe: function(/*evt*/){
      if (this.verbetrouve==false){
        var retour =  window.confirm( "Vous n'avez pas trouvé le verbe, êtes vous certain ?" );
        if (retour==false){return;}
    }
    this.indexeverbe=metier.getIndexeVerbe(this.selected,this.selectednombrelettres);
     if (this.indexeverbe==99999){
      this.gagneperdu="changez de niveau ou augmentez le nombre de lettres ou réinitialisez";
      }else{
    this.contexte="true";
    this.contexteindexe=this.indexeverbe;
    this.verbeclair=metier.getVerbefromIndex(this.indexeverbe);
  // console.log("tojson"+metier.verbToJson(metier.mixLettresVerbe(this.verbeclair)));
    this.list1=metier.verbToJson(metier.mixLettresVerbe(this.verbeclair));
    this.pointsencours=metier.getPointsfromIndex(this.indexeverbe,this.selected);
    this.bonusencours=metier.getBonusfromIndex(this.indexeverbe,this.selected);
    this.tentes++;
    this.gagneperdu="";
    }
    this.list2=[];
    this.sens="";
    this.groupe="";
    this.phrase="";
    this.indexlettredonnee=0;
    this.lettresdonnees="";
    this.boutongroupe=false;
    this.boutonsens=false;
    this.boutonphrase=false;
    this.boutonlangocha=false;
    this.solution="Donner sa langue au chat";
    this.drag=false;
    this.verbetrouve=false; 
     if (this.bonus<=0){
    this.boutonsens=true;
  } 
  var longueurverbeclair = this.verbeclair.length;
  var padding = this.computePadding(longueurverbeclair);
  
  this.lepadding=padding;
    },
    log: function(/*evt*/) {
   //  window.console.log("niveau"+niveau.selectedIndex);
      if (this.list2.length<this.verbeclair.length){
        this.gagneperdu="manque des lettres !";
        this.lacouleur='#000000';
        return;
      }
      var egal=true;
      var verbeclairjson = metier.verbToJson(this.verbeclair);
      for (var i =0; i<verbeclairjson.length;i++){
        if (verbeclairjson[i].name!=this.list2[i].name){
            egal=false;
        }
      }
      if (egal==true){
        //un verbe trouvé
         this.trouves++;
         this.bonus=parseInt(this.bonus)+parseInt(this.bonusencours);
         this.points=parseInt(this.points)+parseInt(this.pointsencours);
         this.gagneperdu="GAGNE";
         this.contexte="false";
         this.verbetrouve=true;
         this.lacouleur='#FF0000';
         this.boutonsens = this.bonus<=0?true:false;
         this.sens=metier.getSensFromIndex(this.indexeverbe);
         this.phrase=metier.getPhraseFromIndex(this.indexeverbe);
         }
      else{
        //il n'a pas trouvé, mais a trouvé le verbe recherché peut-être un verbe qui existe quand même
          var verbetrouveenclair="";
          //on récupère le mot trouvé en clair (à partir du tableau)
          this.list2.forEach(element => {
          verbetrouveenclair=verbetrouveenclair+element.name
         });
        // est-ce que le verbe trouvé existe en fait dans le fichier ?
          if (metier.isVerbExistInFile(verbetrouveenclair)==true){
              this.gagneperdu="GAGNE, ce verbe existe mais ce n'est pas celui demandé,continuez "
              this.lacouleur='#00FF00';
              this.trouves++;
              this.bonus=parseInt(this.bonus)+parseInt(this.bonusencours);
              this.points=parseInt(this.points)+parseInt(this.pointsencours);
              this.verbetrouve=false;
              this.sens=""
              this.phrase="";
            }
            else{
            this.lacouleur='#000000';
            this.gagneperdu="PERDU";
            this.verbetrouve=false;
          }
         }
    }
  }
};
</script>
<style scoped>

.form-sec{width:100%; background:#ccc;
    background: #f8f9fa;box-shadow: 0 0 4px #ccc;}
.form-small{width:100%; background:#ccc;width: 100%;
    background: #f8f9fa;box-shadow: 0 0 4px #ccc;}
.form-large{ background:#ccc; width: 100%;
    background: #f8f9fa;box-shadow: 0 0 4px #ccc;}
.form-large-inner{width:100%; background:#ccc; height:150px;
    background: #f8f9fa;box-shadow: 0 0 4px #ccc;}
.text-large {
  font-size: 50%;
}
.list-group-item {
  font-family: "Courier New";
  font-weight:bold;
  position: relative;
    display: block;
   padding: 10px; 
    margin-bottom: -1px;
    border: 1px solid #ddd;
/*    line-height: 1em  set to text height */
font-size: 36px;

}
.custom {
    width: 185px !important;
    height:40px !important;

}
.custom1 {
    height: 75px !important;
}
strong{ 
  font-size: 150%;
}
.grossefont{
  font-size: 120%;
}
</style>