function InserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas";
    var numPalavras = $("#contador-palavras").text();
   
    var linha = NovaLinha(usuario,numPalavras);

   linha.find(".botao-remover").click(removeLinha);

   corpoTabela.append(linha);
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
    $(this).parent().parent().remove();
}

