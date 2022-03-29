$(function(){
    //Seleccionamos todos los botones que generan un presupuesto.
    $(".generate-sales-budget").click(function(){
        //form: Consta de los inputs junto a sus botones de añadir input: Nombre del mes, Unidades vendidas, Precio por unidad, Ventas totales.
        const sales_budget_form = "<div class=\"container col-md-6 my-5\"> <div class=\"mb-3\"> <div id=\"inputNameOfTheMonth\"><label class=\"form-label\">Nombre/Numero del periodo de tiempo (Opcional)</label></div> <input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"><div id=\"inputUnitsSold\"><label class=\"form-label\">Unidades vendidas</label></div> <input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"> <div id=\"inputPriceByUnit\"><label class=\"form-label\">Precio por unidad</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"><label class=\"form-label\">Presupuesto de venta</label><input type=\"number\" readonly class=\"form-control\" id=\"inputTotalSales\"></div> <hr> </div>";

        //Variable para almacenar la cantidad de meses a efectuar en el flujo de efectivo.
        let numberOfMonths;
        //Variable necesaria para el nombramiento de los navs.
        let nameOfTheMonth;
        //Variable cuyo valor sera dinamico al nav del mes/año/trimestre escogido. (Empieza desde el 0 ya que sera utilizado para agregar valor a los arrays utilizandolo como indice).
        let selectMonth;//El nombre de la variable es subjetivo.
        //Periodo de tiempo escogido.
        let selectTimePeriod = "Mes";
        //Periodo de tiempo anterior
        let beforeTimePeriod;

        //Variable necesario para el nombramiento de productos.
        let productName = "";

        //Variables necesarias para realizar operaciones
        let unitsSold,priceByUnit;

        //Array con objetos de evento de escucha a cambios de valores
        let inputTotalSales;

        //REINICIAR VALORES DE VARIABLES A ORIGINALES
        function ResetVariables(){

            //NO se reinicia la variable "numberOfMonths" debido a que esta se cambia al dar clic al boton de generar formulario, y por logistica es mejor no reiniciarlo.
            //NO se reinicia la variable "selectTimePeriods" debido a que esta se cambia al dar enter en el input en cuestion del formulario, y por logistica es mejor no reiniciarlo.
            //NO se reinicia la variable "selectMonth" debido a que esta se cambia al dar clic a los botones del nav de meses y por logistica es mejor no reiniciarlo.
            //NO se reinicia la variable "productName" debido a que esta se cambia al dar enter en el input en cuestion del formulario y por logistica es mejor no reiniciarlo.
            nameOfTheMonth=[];

            unitsSold=[];
            priceByUnit=[];
            
            inputTotalSales=[];

            //Todos los arrays tendran la longitud correspondiente al "numberOfMonths" con un valor diferente a undefined.
            for (let index = 0; index < numberOfMonths; index++) {
                nameOfTheMonth.push("");

                unitsSold.push(0);    
                priceByUnit.push(0);

                //Objetos con evento de escucha a cambios de valores, para los array "Total"
                let objectTotalSales = {
                    totalSalesInternal: 0,
                    totalSalesListener: function(val) {},
                    set totalSales(val) {
                    this.totalSalesInternal = val;
                    this.totalSalesListener(val);
                    },
                    get totalSales() {
                    return this.totalSalesInternal;
                    },
                    registerListener: function(listener) {
                    this.totalSalesListener = listener;
                    }
                }

                inputTotalSales.push(objectTotalSales);
            }

        }

        //AÑADIR ENTRADAS DE TEXTO.
        function AddInput(){
            //Cambiar id por el agrupamiento de Inputs correspondiente al boton de agregar inputs.
            const idParent = $(this).parent().children().first().attr("id");

            let fieldWrapper = $("<div class=\"input-group mb-3\" />");
            
            //Cambiar el nombre de la clase por el conjunto de inputs correspondiente...
            if(idParent==="inputNameOfTheMonth"+selectMonth){
                var fName = $("<input type=\"text\" class=\"form-control "+idParent+"\" />");
            } else{
                var fName = $("<input type=\"number\" class=\"form-control "+idParent+"\" />");
            }
            
            //Al agregar un solo input dentro de este DIV con dicha ID...
            //Eliminar el boton para que no añada mas inputs en ese DIV.
            $("#"+idParent).parent().children().last().remove();
            
            const removeButton = $("<button class=\"input-group-text bg-danger\"><i class=\"bi bi-trash\"></i></button>");
            removeButton.click(function() {
                $(this).parent().remove();
                UpdateValuesAfterOfDeleted();
            });
            fieldWrapper.append(fName);
            fieldWrapper.append(removeButton);
            $("#"+idParent).append(fieldWrapper);

            AddValues();
        }

        //AGREGAR VALORES A VARIABLES Y REALIZAR OPERACIONES EN LAS ENTRADAS DE TEXTO.
        function AddValues(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputUnitsSold,inputPriceByUnit
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalSales

            //REESCRIBIR VALOR - NOMBRE DEL MES
            $(".inputNameOfTheMonth"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    nameOfTheMonth[selectMonth] = $(this).val();
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                }
            });

            //ACTUALIZA RESULTADOS - OPERACIONES
            //Unidades vendidas - INPUT EDITABLE
            $(".inputUnitsSold"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    unitsSold[selectMonth] = parseInt($(this).val());
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                    //Calcular la totalidad de ventas totales
                    inputTotalSales[selectMonth].totalSales = unitsSold[selectMonth]*priceByUnit[selectMonth];
                }
            });

            //Precio por unidad - INPUT EDITABLE
            $(".inputPriceByUnit"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    priceByUnit[selectMonth] = parseInt($(this).val());
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                    //Calcular la totalidad de ventas totales
                    inputTotalSales[selectMonth].totalSales = unitsSold[selectMonth]*priceByUnit[selectMonth];
                }
            });

            //Ventas totales - INPUT READONLY
            inputTotalSales[selectMonth].registerListener(
                function(val){
                    $("#inputTotalSales"+selectMonth).val(inputTotalSales[selectMonth].totalSales);
                }
            );
        }

        function UpdateValues(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputUnitsSold,inputPriceByUnit
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalSales

            if($(".inputNameOfTheMonth"+selectMonth).length){
                $(".inputNameOfTheMonth"+selectMonth).val(nameOfTheMonth[selectMonth]);
            }
            
            if($(".inputUnitsSold"+selectMonth).length){
                $(".inputUnitsSold"+selectMonth).val(unitsSold[selectMonth]);
            }

            if($(".inputPriceByUnit"+selectMonth).length){
                $(".inputPriceByUnit"+selectMonth).val(priceByUnit[selectMonth]);
            }

            $("#inputTotalSales"+selectMonth).val(inputTotalSales[selectMonth].totalSales);
        }

        //AL ELIMINAR UNA ENTRADA DE TEXTO, ACTUALIZAR RESULTADOS.
        function UpdateValuesAfterOfDeleted(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputUnitsSold,inputPriceByUnit
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalSales
            //NOMBRE DEL MES
            if($("#inputNameOfTheMonth"+selectMonth).children().length === 1 && $("#inputNameOfTheMonth"+selectMonth).parent().children().last().prop("type") !== "button"){
                nameOfTheMonth[selectMonth] = "";
                //Agregar boton de agregar inputs.
                const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
                $("#inputNameOfTheMonth"+selectMonth).parent().append(agregarBoton);
                //Agregar comportamiento al boton de agregar inputs.
                $("#inputNameOfTheMonth"+selectMonth).parent().on("click",".addInput",AddInput);
            }

            //ACTUALIZA RESULTADOS - OPERACIONES
            //Unidades vendidas - INPUT EDITABLE
            if($("#inputUnitsSold"+selectMonth).children().length === 1 && $("#inputUnitsSold"+selectMonth).parent().children().last().prop("type") !== "button"){
                //Redefinir variables al default
                unitsSold[selectMonth]=0;
                //Recalcular el total de las ventas
                inputTotalSales[selectMonth].totalSales=unitsSold[selectMonth]*priceByUnit[selectMonth];
                //Agregar boton de agregar inputs.
                const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
                $("#inputUnitsSold"+selectMonth).parent().append(agregarBoton);
                //Agregar comportamiento al boton de agregar inputs.
                $("#inputUnitsSold"+selectMonth).parent().on("click",".addInput",AddInput);
            }
            
            //Precio por unidad - INPUT EDITABLE
            if($("#inputPriceByUnit"+selectMonth).children().length === 1 && $("#inputPriceByUnit"+selectMonth).parent().children().last().prop("type") !== "button"){
                //Redefinir variables al default
                priceByUnit[selectMonth]=0;
                //Recalcular el total de las ventas
                inputTotalSales[selectMonth].totalSales=unitsSold[selectMonth]*priceByUnit[selectMonth];
                //Agregar boton de agregar inputs.
                const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
                $("#inputPriceByUnit"+selectMonth).parent().append(agregarBoton);
                //Agregar comportamiento al boton de agregar inputs.
                $("#inputPriceByUnit"+selectMonth).parent().on("click",".addInput",AddInput);
            }

        }
        
        //Eliminar formulario y variables
        ResetVariables();
        $("#tool").empty();

        //Formulario para ingresar cantidad de meses y asi luego generar un formulario a partir de esa cantidad.
        const inputProductName =$("<input></input>")
                                .addClass("form-control inputProductName")
                                .attr({"placeholder":"Escriba el nombre del producto (Opcional)","aria-describedby":"basic-addon2","type":"text"})
                                .focusout("keypress",function(){
                                    //REESCRIBIR VALOR - NOMBRE DEL PRODUCTO
                                    productName = $(this).val();
                                });
        const inputTimePeriod = $("<input></input>")
                                .addClass("form-control")
                                .attr({"placeholder":"Escriba el nombre del periodo de tiempo en el que se desea evaluar (Opcional)","aria-label":"Escriba el periodo de tiempo en el que se desea evaluar","aria-describedby":"basic-addon2","type":"text"})
                                .focusout(function(){
                                    //Seleccionamos el periodo de tiempo
                                    beforeTimePeriod = selectTimePeriod;
                                    selectTimePeriod = $(this).val()!==""?$(this).val():"Mes";
                                    let pascalCaseBeforeTimePeriod = beforeTimePeriod[0].toUpperCase()+beforeTimePeriod.slice(1);
                                    let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                                    //Cambiamos los valores correspondientes por el periodo de tiempo actual.
                                    $(".nav-cash-flow-form").each(function(){
                                        newText = $(this).text();
                                        newText = newText.replace(pascalCaseBeforeTimePeriod,pascalCaseSelectTimePeriod);
                                        $(this).text(newText);
                                    });
                                });
        const inputMonth = "<input type=\"number\" class=\"form-control\" id=\"numberOfMonths\" placeholder=\"Agrega el intervalo de tiempo a evaluar\" aria-label=\"Agrega el intervalo de tiempo a evaluar\" aria-describedby=\"basic-addon2\">";
        let formsByMonth = [];
        let navByMonth = $("<ul></ul>")
                        .addClass("nav nav-tabs");
        let cashFlowServiceForm = $("<div></div>")
                        .attr({id:"cash-flow-form"});
        let containerFlowServiceForm = $("<div></div>")
                                        .addClass("col-md-6 text-center mx-auto");
        //Boton encargado de generar los formularios segun la cantidad de meses indicados
        const btnMonth = $("<input></input>")
                            .attr({type:"button",value:"Generar formulario"})
                            .addClass("btn btn-primary")
                            .click(function(){
                                //0. Se limpia el nav
                                navByMonth.html("");
                                let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                                //1. Se toma el numero de meses ingresados.
                                numberOfMonths = parseInt($("#numberOfMonths").val());
                                //1.1. Se limpia la variable de formularios.
                                formsByMonth = [];
                                for (let index_form = 1; index_form <= numberOfMonths; index_form++) {
                                    //2. Se genera un formulario por mes hasta llegar al numero de mes indicado
                                    let newForm = sales_budget_form;
                                    let strMatch = newForm.match(/(id=\"[A-z]*\"){1}/gm);
                                    for (let index = 0; index < strMatch.length; index++) {
                                        let oldId = strMatch[index].replace(/['"]+/g, '');
                                        oldId = oldId.replace(/(id=){1}/g, '');
                                        var idNew = oldId + (index_form - 1);
                                        newForm = newForm.replace(oldId,idNew);
                                    }
                                    formsByMonth.push(newForm);
                                    //3. Se actualiza el nav, mediante el se podra navegar entre los formularios segun mes. Al dar click a un nav podras acceder al formulario del mes en cuestion.
                                    if (index_form == 1){
                                        navByMonth.append(
                                            $("<li></li>")
                                            .addClass("nav-item")
                                            .append(
                                                $("<Button></Button>")
                                                .addClass("nav-link active nav-cash-flow-form")
                                                .text(pascalCaseSelectTimePeriod+" "+index_form)
                                                .click(function(){
                                                    //3.1. Se actualizan los estilos del nav en cuestion.
                                                    $(".nav-cash-flow-form").removeClass("active");
                                                    $(this).addClass("active");
                                                    //3.2. Se actualiza los valores del anterior formulario en el array.
                                                    formsByMonth[selectMonth] = $("#cash-flow-form").html();
                                                    //3.3. Se limpia el anterior formulario del mes en cuestion, se actualiza el formulario del mes indicado.
                                                    selectMonth = 0;
                                                    $("#cash-flow-form")
                                                    .html(formsByMonth[selectMonth]);
                                                    UpdateValues();
                                                    //3.4. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs pero para el formulario del mes actual.
                                                    $(".addInput").click(AddInput);
                                                })
                                            )
                                        );
                                    } else {
                                        navByMonth.append(
                                            $("<li></li>")
                                            .addClass("nav-item")
                                            .append(
                                                $("<Button></Button>")
                                                .addClass("nav-link nav-cash-flow-form")
                                                .text(pascalCaseSelectTimePeriod+" "+index_form)
                                                .click(function(){
                                                    //3.1. Se actualizan los estilos del nav en cuestion.
                                                    $(".nav-cash-flow-form").removeClass("active");
                                                    $(this).addClass("active");
                                                    //3.2. Se actualiza los valores del anterior formulario en el array.
                                                    formsByMonth[selectMonth] = $("#cash-flow-form").html();
                                                    //3.3. Se limpia el anterior formulario del mes en cuestion, se actualiza el formulario del mes indicado.
                                                    selectMonth = index_form-1;
                                                    $("#cash-flow-form")
                                                    .html(formsByMonth[selectMonth]);
                                                    UpdateValues();
                                                    //3.4. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs pero para el formulario del mes actual.
                                                    $(".addInput").click(AddInput);
                                                })
                                            )
                                        );
                                    }
                                }
                                //4. Agregar la barra de navegacion para navegar entre los formularios segun mes
                                containerFlowServiceForm
                                .append(navByMonth)
                                .append(cashFlowServiceForm);
                                //5. Reinciar variables a sus valores originales, la longitud de los arrays correspondera al numberOfMonths
                                ResetVariables();
                                //6. Agregar el formulario del primer mes para mostrar por defecto
                                if(numberOfMonths>0){
                                    $("#cash-flow-form").html(formsByMonth[0]);
                                    selectMonth = 0;
                                    //7. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs.
                                    $(".addInput").click(AddInput);
                                }
                            });
        
        const containerProductName = $("<div></div>")
                                    .addClass("input-group mb-3 w-75 mx-auto")
                                    .append(inputProductName);
        const containerPeriodTimeForm = $("<div></div>")
                                    .addClass("input-group mb-3 w-75 mx-auto")
                                    .append(inputTimePeriod);
        const containerMonthForm = $("<div></div>")
                                    .addClass("input-group mb-3 w-75 mx-auto")
                                    .append(inputMonth)
                                    .append(btnMonth);
        containerFlowServiceForm
        .append(containerProductName)
        .append(containerPeriodTimeForm)
        .append(containerMonthForm);

        //Crear formulario limpio
        $("#tool").html(containerFlowServiceForm);

        //Agregar boton que muestra un resumen en una tabla, y alterne entre el modo tabla y el modo edicion
        btn_table = $("<Button></Button>")
                    .addClass("btn btn-primary btn-block w-75")
                    .click(function(e){
                        text_btn = e.target.innerHTML 
                        if(text_btn === "Ver en tabla"){
                            e.target.innerHTML ="Cambiar al modo editar";
                        } else{
                            e.target.innerHTML = "Ver en tabla"
                        }
                    })
                    .html("Ver en tabla");

        btn_table.click(function(e){
            idResummaryTable = e.target.parentElement.id
            //Boton cambiar entre modo edicion y modo tabla
            let container_btn_table = $("<div></div>")
                .addClass("col-md-6 text-center mx-auto")
                .append(
                    this
                );
            if(!idResummaryTable){
                let tables = "<div class=\"my-5\"><Table class=\"table table-info table-striped\"><thead><tr><th colspan=2 className=\"text-center fw-bold\">Presupuesto de venta</th></tr><tr><th colspan=2 className=\"text-center fw-bold\">"+(productName?"Nombre del producto: "+productName:"")+"</th></tr></thead><tbody>";
                for (let mes = 0; mes < numberOfMonths; mes++) {
                    let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                    let element = "<tr><th colspan=2 className=\"text-center fw-bold\">"+pascalCaseSelectTimePeriod+" "+(mes+1)+"</th></tr><tr><td colspan=\"2\" className=\"text-center fw-bold\">"+nameOfTheMonth[mes]+"</td><tr> <td>Unidades vendidas</td> <td>"+unitsSold[mes]+"</td> </tr> <tr> <td>Precio por unidad</td> <td>"+priceByUnit[mes]+"</td> </tr> <tr> <td>(=) Presupuesto de venta</td> <td>"+inputTotalSales[mes].totalSales+"</td> </tr>";
                    tables += element;
                }
                //Tabla totalidad
                let totalUnitsSold = 0;
                let totalPriceByUnit = 0;
                let totalSales = 0;
                unitsSold.forEach(element => {totalUnitsSold+=parseInt(element)});
                priceByUnit.forEach(element => {totalPriceByUnit+=parseInt(element)});
                inputTotalSales.forEach(element => {totalSales+=parseInt(element.totalSales)});
                let element = "<tr><th colspan=2 className=\"text-center fw-bold\">Totalidad</th></tr><tr> <td>Unidades vendidas</td> <td>"+totalUnitsSold+"</td> </tr> <tr> <td>Precio por unidad</td> <td>"+totalPriceByUnit+"</td> </tr> <tr> <td>(=) Presupuesto de venta</td> <td>"+totalSales+"</td> </tr>";
                tables+=element+"</tbody></Table></div>";
                //Container
                container_table = $("<div></div>")
                            .addClass("container col-md-6 my-5")
                            .append(
                                tables
                            )
                //Cambiar ID del container_btn_table
                container_btn_table.attr({ id : "SummaryTable" });
                //Reemplazar el anterior contenido con el modo tabla.
                $(containerFlowServiceForm).css("display","none");
                $("#tool").append(container_table);
                $("#tool").remove(container_btn_table);
                $("#tool").append(container_btn_table);
            }
            else{
                //Cambiar ID del container_btn_table
                container_btn_table.attr({ id : "" });
                //Reemplazar el anterior contenido con el modo edicion.
                $(container_table).remove();
                $(containerFlowServiceForm).css("display","block");
                $("#tool").remove(container_btn_table);
                $("#tool").append(container_btn_table);
            }
        });

        let container_btn_table = $("<div></div>")
                            .addClass("col-md-6 text-center mx-auto")
                            .append(
                                btn_table
                            );

        $("#tool").append(container_btn_table);
    });
});