/**
 * Обертка для запроса.
 * @param {*} data 
 */
class RequestWrapper {
    constructor(url, callback){
        this.url = url;
        this.callback = callback;
    }

    /**
     * Отправить.
     */
    send(){
        var XHR = window.XDomainRequest || window.XMLHttpRequest
        var xhr = new XHR();
        xhr.open('GET',this.url, true);
        xhr.onload = function () {
            console.log('RequestWrapper Response text: ' + xhr.responseText);
            this.callback(xhr);
        }

        xhr.onerror = function () {
            console.error('RequestWrapper Requeest ' + url + ' Error')
        }

        xhr.send()
    }
}

export default RequestWrapper;