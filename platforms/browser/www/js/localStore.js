var Store = function(nomeReferente,controls){
  this.nomeReferente = nomeReferente;
  this.controls = controls;
  this.listaTratores;
  this.formaOrganizacao;
  this.init = function(){
    if (localStorage['formaOrganizacao'] == undefined ) localStorage['formaOrganizacao'] = JSON.stringify(['maiorIndice']);
    if (localStorage['listaDeTratores'] == undefined) localStorage['listaDeTratores'] = JSON.stringify([]);
    this.listaTratores = JSON.parse(localStorage['listaDeTratores']);
    this.formaOrganizacao = JSON.parse(localStorage['formaOrganizacao']);
  };
  this.retornarLista = function(){
    return this.listaTratores;
  };
  this.cadastrarTrator = function(opcoesT,editandoTrator){
    var tratorRepetido = false;
    var trator = { marca : this.controls.inputMarca.value, modelo : this.controls.inputModelo.value, potencia : this.controls.inputPotencia.value, id : this.listaTratores.length+1, indice : 0};
    var outrasOpcoes = opcoesT;
    var variante = 1, divBoxMaisEspec;
    for ( var i = 0; i < outrasOpcoes.length; i++){
      variante = i + 1;
      divBoxMaisEspec = document.getElementsByName('options-'+variante);
      if ( !divBoxMaisEspec[0].checked ) {
        outrasOpcoes[i].possui = false;
      } else {
        outrasOpcoes[i].possui = true;
      }
    }
    trator.opcoesT = outrasOpcoes;
    for ( var i = 0; i < this.listaTratores.length; i++ ){
      if ( trator.marca == this.listaTratores[i].marca && trator.modelo == this.listaTratores[i].modelo && !editandoTrator){
        tratorRepetido = true;
        break;
      }
    }
    var meuIndice = 0;
    for ( var i = 0; i < trator.opcoesT.length; i++ ){
      if ( trator.opcoesT[i].possui ){
        meuIndice += trator.opcoesT[i].grauImportancia;
      }
    }
    var indicePorcentagem = meuIndice.toFixed(2);
    trator.indice = indicePorcentagem;
    if ( !tratorRepetido ){
      this.listaTratores.push(trator);
      localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
      return true;
    }
    else {
      this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator já existente no sistema!'});
      return false;
    }
  };
  this.atualizarLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
    if ( this.listaTratores.length > 0 ){
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(this.listaTratores);
    }
  };
  this.organizarLista = function(vetorOrganizado){
    localStorage['listaDeTratores'] = JSON.stringify(vetorOrganizado);
    if ( this.listaTratores.length > 0 ){
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(this.listaTratores);
    }
  };
  this.deletarTrator = function(idTrator){
    var indexOf = idTrator.lastIndexOf("-");
    var newIdTrator = parseInt(idTrator.substring(indexOf+1));
    this.listaTratores.splice(newIdTrator-1,1);
    for ( var i = 0; i < this.listaTratores.length; i++ ){
      this.listaTratores[i].id = i+1;
    }
    this.atualizarLista();
  };
  this.limparLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify([]);
  };
  this.retornarFormaOrganizacao = function(){
    return this.formaOrganizacao;
  };
  this.mudarFormaOrganizacao = function(novaForma){
    localStorage['formaOrganizacao'] = JSON.stringify([novaForma]);
  }
}
