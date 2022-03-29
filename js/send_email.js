$("#contactUs").submit(function(e){
    e.preventDefault();
    emailjs.sendForm('gmail_portafolio', 'Email_Template', e.target, 'User_ID')
        .then((result) => {
            //   console.log(result.text);
            swal({
                title: "¡Tu correo ah sido enviado exitosamente!",
                text: "¡Gracias por contactarme!, en unas horas recibiras una respuesta.",
                icon: "success",
                button: "Vale"
            });
        }, (error) => {
            //   console.log(error.text);
            swal({
                title: "¡Tu correo no ah podido ser enviado!",
                text: "¡Oops!, parece que ocurrio un fallo mientras se intentaba enviar tu correo, por favor intentalo de nuevo mas tarde.",
                icon: "error",
                button: "Vale"
            });
        });
});
