(function () {
    var script = document.currentScript;
    var file = script && script.getAttribute('data-include');

    if (!file) {
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', file, false);

    try {
        request.send();

        if (request.status >= 200 && request.status < 300) {
            document.write(request.responseText);
        } else {
            console.error('No se pudo cargar el fragmento: ' + file);
        }
    } catch (error) {
        console.error('No se pudo cargar el fragmento: ' + file, error);
    }
})();