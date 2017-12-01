function handleBarsCarregarTratores(opcoesT){
  var source = $("#lista-opcoes-template").html();
  var template = Handlebars.compile(source);
  var html = template(opcoesT);
  $("#more-information").html(html);
}
function handleBarsMostrarTratores(listaTratores){
	var source = $('#lista-tratores-template').html();
	var template = Handlebars.compile(source);
	$("#box-tratores").append(template(listaTratores));
}
function handleBarsCarregarTratoresEditaveis(opcoesT){
  var source = $("#lista-tratores-editar-template").html();
  var template = Handlebars.compile(source);
  var html = template(opcoesT);
  $("#more-information").html(html);
}
