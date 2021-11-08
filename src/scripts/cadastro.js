$("#form-add-curso").submit(function (event) {
	event.preventDefault();

	var titulo = $("#inputTitulo").val();
	var area = $("#inputArea").val();
	var autor = $("#inputNome").val();
	var idioma = $("#inputIdioma").val();
	var conteudo = $("#inputConteudo").val();
	var url = $("#inputUrl").val();

	$.ajax({
		url: "http://localhost:6789/cadastrar/curso",
		type: "POST",
		data: {
			idioma: idioma,
			titulo: titulo,
			area: area,
			autor: autor,
			conteudo: conteudo,
			url: url,
		},
	}).done(function (data) {
		$("#cadastro").html("");
		$("#cadastro").append(`
         <div class="d-flex justify-content-between">
            <div class="mb-3 col-8 p-0">
               <h1 class="mb-4 lh-1 font-weight-bold h2">Cadastro de Módulos</h1>
            </div>
            <div class="col-2 p-0">
               <input type="number" id="#inputMod" name="inputMod" class="form-control cad"/>
            </div>
            <div class="col-2 p-0 pl-3">
               <input type="text" id="#inputId" name="inputId" class="form-control cad" value="${data}" disabled/>
            </div>
         </div>
         
         <div id="modulos">

         </div>
      `);
	});
});

function criaModulos(num) {
	for (let i = 0; i < num; i++) {
		$("#modulos").html("");
		$("#modulos").append(`
      <div class="card cardMod mb-4" style="z-index: 1">
         <div class="card-body p-6">
            <div>
               <div class="col-6 p-0">
                  <input id="inputMod${i + 1}" type="text" name="modulo${i + 1}" class="form-control cad" placeholder="Titulo do modulo ${i + 1}" required />
               </div>
            </div>
            <div class="form-group">
               <div></div>
            </div>
         </div>
      </div>
      `);
	}
}
var res;
function showCursos() {
	$.get("http://localhost:6789/cursos", function (data) {
		console.log(data);
		res = data;
		buildCards();
	});
}

var j = 0;
var last = 4;
function buildCards() {
	data = res;
	if (last - 4 < data.cursos.length) {
		$("#cadastro").html("");
		$("#cadastro").append(`
      <div class="mb-4">
         <h1 class="mb-4 lh-1 font-weight-bold h2">Tabela de Cursos</h1>
      </div>
      `);
		for (let i = 0; i < last; i++) {
			if (i == data.cursos.length) {
				if (j > 0) {
					alertMessage();
				}
				j++;
				break;
			}
			$("#cadastro").append(`
         <div class="card cardMod mb-4" style="z-index: 1">
            <div class="card-body p-6">
               <div class="row">
                  <div class="col-12 card-curso">
                     <div className="col">
                        <p class="font-weight-bold">Título: ${data.cursos[i].titulo}</p>
                        <a onclick="removeCurso(${data.cursos[i].id})"><i class="fas fa-times"></i></a>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>ID: ${data.cursos[i].id}</p>
                        </div>
                        <div class="col-6">
                           <p>Autor: ${data.cursos[i].autor}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>Conteúdo: ${data.cursos[i].conteudo}</p>
                        </div>
                        <div class="col-6">
                           <p>Idioma: ${data.cursos[i].idioma}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>Horas: ${data.cursos[i].horas}</p>
                        </div>
                        <div class="col-6">
                           <p>Avaliação: ${data.cursos[i].avaliacao}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p class="m-0">Área: ${data.cursos[i].areaid}</p>
                        </div>
                        <div class="col-6">
                           <p class="m-0">URL: ${data.cursos[i].url}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         `);
		}
		$("#cadastro").append(`
      <div class="mb-3 col-12 p-0">
         <input type="button" onclick="buildCards()" value="Carregar mais cursos" id="btnInsert" class="btn btn-primary btn-block mt-4" />
      </div>
      `);
	}
	if (!(last >= data.cursos.length)) {
		last += 4;
	}
}

function alertMessage() {
	alert("Não existem mais cursos a carregar!");
}

function removeCurso(id) {
	if (confirm("Deseja realmente remover o curso?")) {
		$.get(`http://localhost:6789/cursos/delete/${id}`, function (data) {
			console.log(data);
		});
	}
}
