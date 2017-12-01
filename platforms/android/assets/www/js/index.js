var myStore;
var listaTratores = [];
var pagsNavigation = document.querySelectorAll('a[href^="#fixed"]');
var opcoesT = [new opcaoT('Presença de cabine',7.85,1),new opcaoT('Estrutura de proteção no capotamento',6.80,2),new opcaoT('Acelerador com acionamento para frente',6.61,3),new opcaoT('Cinto de segurança',6.37,4),new opcaoT('Dispositivo contra partida acidental',5.81,5),new opcaoT('Dispositivo que une os pedais dos freios',5.02,6),new opcaoT('Escapamento com direção acima do operador',4.75,7),new opcaoT('Superfície antiderrapante nos pedais',4.55,8),new opcaoT('Proteção da TDP',4.19,9),new opcaoT('Arranjo adequado nos comandos',3.48,10),new opcaoT('Proteção das partes móveis',3.28,11),new opcaoT('Proteção da ventoinha',3.24,12),new opcaoT('Acesso facilitado para o abastecimentos',3.05,13),new opcaoT('Degraus de acesso e saída',3.01,14),new opcaoT('Superfície antiderrapante no posto de operação',2.69,15),new opcaoT('Batente vertical de ambos os lados dos degraus',2.33,16),new opcaoT('Proteção da caixa de câmbio',2.29,17),new opcaoT('Degraus com superfície antiderrapante',2.18,18),new opcaoT('Espelho retrovisor lateral',2.14,19),new opcaoT('Espelho retrovisor intermediário',1.82,20),new opcaoT('Corrimão e/ou manípulos',1.74,21),new opcaoT('Luz de ré',1.66,22),new opcaoT('Orientação sobre capotagem lateral',1.42,23),new opcaoT('Vidros de anteparo ou para-lamas dianteiros',1.31,24),new opcaoT('Advertência de risco da TDP',1.31,25),new opcaoT('Tampa de proteção da bateria',1.07,26),new opcaoT('Aviso sonoro de marcha ré',1.03,27),new opcaoT('Extintor de incêndio',0.95,28),new opcaoT('Silenciador no cano de exaustão',0.87,29),new opcaoT('Orientação sobre tombamento longitudinal',0.75,30),new opcaoT('Luzes de advertência',0.75,31),new opcaoT('Orientações sobre a partida do motor',0.67,32),new opcaoT('Indicadores de direção',0.63,33),new opcaoT('Buzina',0.63,34),new opcaoT('Proteção em dutos de fluido sobre pressão',0.59,35),new opcaoT('Proteção da tubulação de exaustão',0.55,36),new opcaoT('Defletor de poeira',0.51,37),new opcaoT('Orientações sobre o acoplamento dos implementos',0.51,38),new opcaoT('Orientação na abertura do radiador',0.47,39),new opcaoT('Orientação sobre os elementos móveis',0.36,40),new opcaoT('Orientação sobre os locais aquecidos',0.28,41),new opcaoT('Orientação sobre a colocação dos EPI’s',0.24,42),new opcaoT('Orientação sobre cuidados na manutenção',0.12,45),new opcaoT('Triângulo de segurança de baixa velocidade',0.08,44),new opcaoT('Orientação sobre a colocação do cinto de segurança',0.04,43)];
var paginaTratores = 0,idTratorParaEditar = -1;
var app = {
    init: function() {
        myStore = new Store('listaDeTratores',this.controls);
        myStore.init();
        this.atualizarLista();
        listaTratores = myStore.retornarLista();
        this.bindEvents();
        this.carregarListaDeOpcoes();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    modificarFieldInformation: function(){
      var tratorAtual;
      for ( var i = 0; i < listaTratores.length; i++ ){
        tratorAtual = listaTratores[i];
        break;
      }
      opcoesT = tratorAtual.opcoesT;
      this.controls.fieldMoreInformation.innerHTML = "";
      handleBarsCarregarTratoresEditaveis(opcoesT);
      componentHandler.upgradeDom();
    },
    resetarFieldInformation: function(){
      this.controls.fieldMoreInformation.innerHTML = "";
      handleBarsCarregarTratores(opcoesT);
    },
    onDeviceReady: function() {
      this.controls.botaoMaiorIndice.addEventListener("touchend",this.maiorIndice.bind(this));
      this.controls.botaoMenorIndice.addEventListener("touchend",this.menorIndice.bind(this));
      this.controls.botaoMaiorPotencia.addEventListener("touchend",this.maiorPotencia.bind(this));
      this.controls.botaoMenorPotencia.addEventListener("touchend",this.menorPotencia.bind(this));
      this.controls.botaoID.addEventListener("touchend",this.porID.bind(this));
      this.controls.botaoConfirmar.addEventListener("touchend",this.confirmar.bind(this));
      this.controls.botaoLimparDados.addEventListener("touchend",this.limparDadosForm.bind(this));
      this.controls.botaoLimparLocal.addEventListener("touchend",this.limparTudo.bind(this));
      this.controls.botaoSobre.addEventListener("touchend",function(){
        pagsNavigation[3].click();
      });
      for ( var i = 0; i < listaTratores.length; i++ ) this.addFuncoesBotoes(listaTratores[i].id);
    },
    maiorIndice: function(){
      var arrayOrganizado = [], backupTratores = listaTratores.slice(),
      paraReferencia = -Infinity,tratorParaAdicionar;
      while(backupTratores.length>0){
        for ( x = 0; x < backupTratores.length; x++ ){
          if (parseFloat(backupTratores[x].indice) > parseFloat(paraReferencia)){
            paraReferencia = backupTratores[x].indice;
            tratorParaAdicionar = backupTratores[x];
          }
        }
        paraReferencia = -Infinity;
        arrayOrganizado.push(tratorParaAdicionar);
        backupTratores.splice(backupTratores.indexOf(tratorParaAdicionar),1);
      }
      myStore.organizarLista(arrayOrganizado);
      myStore.mudarFormaOrganizacao('maiorIndice');
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(arrayOrganizado);
    },
    menorIndice: function(){
      var arrayOrganizado = [], backupTratores = listaTratores.slice(),
      paraReferencia = Infinity;
      while(backupTratores.length>0){
        for ( x = 0; x < backupTratores.length; x++ ){
          if (parseFloat(backupTratores[x].indice) < parseFloat(paraReferencia)){
            paraReferencia = backupTratores[x].indice;
            tratorParaAdicionar = backupTratores[x];
          }
        }
        paraReferencia = Infinity;
        arrayOrganizado.push(tratorParaAdicionar);
        backupTratores.splice(backupTratores.indexOf(tratorParaAdicionar),1);
      }
      myStore.organizarLista(arrayOrganizado);
      myStore.mudarFormaOrganizacao('menorIndice');
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(arrayOrganizado);
    },
    maiorPotencia: function(){
      var arrayOrganizado = [], backupTratores = listaTratores.slice(),
      paraReferencia = -Infinity;
      while(backupTratores.length>0){
        for ( x = 0; x < backupTratores.length; x++ ){
          if (parseFloat(backupTratores[x].potencia) > parseFloat(paraReferencia)){
            paraReferencia = backupTratores[x].potencia;
            tratorParaAdicionar = backupTratores[x];
          }
        }
        paraReferencia = -Infinity;
        arrayOrganizado.push(tratorParaAdicionar);
        backupTratores.splice(backupTratores.indexOf(tratorParaAdicionar),1);
      }
      myStore.organizarLista(arrayOrganizado);
      myStore.mudarFormaOrganizacao('maiorPotencia');
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(arrayOrganizado);
    },
    menorPotencia: function(){
      var arrayOrganizado = [], backupTratores = listaTratores.slice(),
      paraReferencia = Infinity;
      while(backupTratores.length>0){
        for ( x = 0; x < backupTratores.length; x++ ){
          if (parseFloat(backupTratores[x].potencia) < parseFloat(paraReferencia)){
            paraReferencia = backupTratores[x].potencia;
            tratorParaAdicionar = backupTratores[x];
          }
        }
        paraReferencia = Infinity;
        arrayOrganizado.push(tratorParaAdicionar);
        backupTratores.splice(backupTratores.indexOf(tratorParaAdicionar),1);
      }
      myStore.organizarLista(arrayOrganizado);
      myStore.mudarFormaOrganizacao('menorPotencia');
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(arrayOrganizado);
    },
    porID: function(){
      var arrayOrganizado = [], backupTratores = listaTratores.slice(),
      paraReferencia = Infinity;
       while(backupTratores.length>0){
         for ( x = 0; x < backupTratores.length; x++ ){
           if (parseFloat(backupTratores[x].id) < parseFloat(paraReferencia)){
             paraReferencia = backupTratores[x].id;
             tratorParaAdicionar = backupTratores[x];
           }
         }
         paraReferencia = Infinity;
         arrayOrganizado.push(tratorParaAdicionar);
         backupTratores.splice(backupTratores.indexOf(tratorParaAdicionar),1);
       }
       myStore.organizarLista(arrayOrganizado);
       myStore.mudarFormaOrganizacao('organizarId');
       this.controls.divBoxTratores.innerHTML = "";
       handleBarsMostrarTratores(arrayOrganizado);
    },
    confirmar: function(){
      if( this.controls.inputMarca.value.length == 0 || this.controls.inputModelo.value.length == 0 ) {
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Por favor preencha todos os campos!'});
      }
      else if ( this.controls.inputModelo.value.length >= 20 ){
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para modelo é de 20 caracteres!'});
      }
      else if ( this.controls.inputMarca.value.length > 15 ){
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para marca é de 15 caracteres!'})
      }
      else if( !this.verificarPreenchimento() ){
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Nenhuma opcao pode estar sem valor!'});
      }else {
        var editandoTrator = idTratorParaEditar != -1;
        if ( editandoTrator ) myStore.deletarTrator("deletar-trator-"+idTratorParaEditar);
        var cadastroComSucesso = myStore.cadastrarTrator(opcoesT,editandoTrator);
        if ( cadastroComSucesso ){
          this.atualizarLista();
          this.listaTratores = myStore.retornarLista();
        }
        this.restaurarLista();
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator cadastrado com sucesso!'});
        pagsNavigation[2].click();
        this.controls.formPageRefference.reset();
        app.resetarFieldInformation();
        this.addFuncoesBotoes(listaTratores.length);
        this.carregarListaDeOpcoes();
      }
    },
    verificarPreenchimento: function(){
      var variante = 0;
      var opcoesPreenchida = true;
      for ( var i = 0; i < opcoesT.length; i++){
        variante = i + 1;
        var divBoxMaisEspec = document.getElementsByName('options-'+variante);
        if ( !divBoxMaisEspec[0].checked && !divBoxMaisEspec[1].checked ) {
          opcoesPreenchida = false;
          window.location.href = "#span-componente-"+variante;
          break;
        }
      }
      return opcoesPreenchida;
    },
    addFuncoesBotoes: function(valorX){
      /* Adicionando evento botao EDITAR */
      var tratorId = valorX;
      var meuElemento = document.getElementById("deletar-trator-"+tratorId);
      meuElemento.addEventListener("touchend",this.deletarTrator);
      meuElemento = document.getElementById("botao-edit-"+tratorId);
      meuElemento.addEventListener("touchend",function(){
        var mytext = parseInt(this.id.substring(this.id.lastIndexOf("-")+1));
        app.controls.inputMarca.value = listaTratores[mytext-1].marca;
        app.controls.inputModelo.value = listaTratores[mytext-1].modelo;
        app.controls.inputPotencia.value = listaTratores[mytext-1].potencia;
        app.controls.botaoConfirmar.innerHTML = "EDITAR";
        app.modificarFieldInformation();
        idTratorParaEditar = tratorId;
        pagsNavigation[2].click();
      });
      /* Adicionando evento botao VER MAIS ESPECIFICAÇÕES */
      var variante = tratorId;
      var divBoxMaisEspec = document.getElementById('mais-espec-'+variante);
      var divMoreInfo = document.getElementById('more-info-'+variante);
      var textoParaAdd = "<table>";
      for ( var a = 0; a < listaTratores[variante-1].opcoesT.length; a++ ){
        var trueOrFalse = ( listaTratores[variante-1].opcoesT[a].possui ) ? "check" : "clear";
        textoParaAdd += "<tr><td>"+opcoesT[a].componenteTitulo+"</td><td><i class='material-icons'>"+trueOrFalse+"</i></tr>";
      }
      divMoreInfo.innerHTML = textoParaAdd;
      divBoxMaisEspec.addEventListener("touchend",function(){
        var meuId = this.id + "";
        var minhaVariante = parseInt(meuId.substring(meuId.length-1));
        var divMaisInformacoes = document.getElementById('more-info-'+minhaVariante);
        var divBoxMaisEspecs = document.getElementById('mais-espec-'+minhaVariante);
        if(divMaisInformacoes.style.display == 'none'){
          divMaisInformacoes.style.display = 'block';
          divBoxMaisEspecs.innerHTML = "<i class='material-icons'>remove</i> ver menos especificações</span></span>";
        } else {
          divMaisInformacoes.style.display = 'none';
          divBoxMaisEspecs.innerHTML = "<i class='material-icons'>add</i> ver mais especificacoes";
        }
      });
    },
    restaurarLista: function(){
      if ( listaTratores.length > 0 ){
        this.controls.divBoxTratores.innerHTML = "";
        handleBarsMostrarTratores(listaTratores);
      }else this.controls.divBoxTratores.innerHTML = "<p>Nenhum trator cadastrado ate o momento!</p>"
    },
    limparDadosForm : function(){
      this.controls.formPageRefference.reset();
      document.querySelector('#demo-toast-example').MaterialSnackbar.showSnackbar({message: 'Formulário limpo com sucesso!'});
    },
    atualizarLista : function(){
      myStore.atualizarLista();
    },
    deletarTrator : function(){
      myStore.deletarTrator(this.id);
      app.restaurarLista();
      app.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator deletado com sucesso!'});
    },
    limparTudo : function(){
      myStore.limparLista();
      app.restaurarLista();
      app.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Lista limpa com sucesso!'});
      this.controls.divBoxTratores.innerHTML = "<p>Nenhum trator foi cadastrado ate momento</p>";
    },
    carregarListaDeOpcoes: function(){
      document.querySelector("#more-information").innerHTML = "";
      for ( var i = 0; i < opcoesT.length; i++ ) opcoesT[i].possui = true;
      handleBarsCarregarTratores(opcoesT);
      componentHandler.upgradeDom();
    }
};
