$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(sincronizaPlacar);

function InserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario =$("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
   
    var linha = NovaLinha(usuario,numPalavras);

   linha.find(".botao-remover").click(removeLinha);

   corpoTabela.append(linha);
   $(".placar").slideDown(500);
   scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop:posicaoPlacar
    },1000);
}

function NovaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover= $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("bi").addClass("bi-trash3-fill");

    link.append(icone);

    colunaRemover.append(link);
    
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
  
    return linha;
}
 

function removeLinha(event){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000);
   
}

function mostrarPlacar(){
    $(".placar").stop().slideToggle(500);

}

function sincronizaPlacar(){
   var placar = [];
   var linhas = $("tbody>tr");
   linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    
    var score = {
        usuario: usuario,
        pontos: palavras
    };

    placar.push(score)

   });

    var dados = {
        placar: placar
    };

  //placar.js

    $.post("http://localhost:3000/placar", dados , function() {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open"); 
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ //novo
        setTimeout(function() {
        $(".tooltip").tooltipster("close"); 
    }, 1200);
    });
}

function atualizaPlacar(){

    $.get("http://localhost:3000/placar",function(data){
        
        $(data).each(function(){
            var linha= NovaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}