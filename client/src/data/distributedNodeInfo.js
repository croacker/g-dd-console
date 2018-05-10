/**
 * Информация о узле распределенной системы.
 * @param {*} data 
 */
class DistributedNodeInfo {

    constructor(data) {
        /**
         * Период обновления узла - 1 минута.
         */
        const UPDATE_PERIOD = 60000;

        /**
         * Атрибуты
         */
        this.node = data.distributedNode;
        this.name = data.distributedNode.name;
        this.url = data.subsystemUrl;
        this.taskActive = data.taskActive;
        this.taskActiveLocalized = data.taskActive ? '\u0410\u043A\u0442\u0438\u0432\u043D\u0430' : '\u041D\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u0430';
        this.subSystem = data.subSystem;
        this.mode = data.mode;
        this.thread = data.thread;
        this.waitObject = data.waitObject;
        this.countObject = data.countObject;
        this.sentObject = data.sentObject;
        this.lastStartMillis = data.lastStartMillis;
        this.receivedObject = data.receivedObject;
        this.lastSendMillis = data.lastSendMillis;
        this.lastReceiveMillis = data.lastReceiveMillis;
        this.countObjectTotal = data.countObjectTotal;
        this.receivedObjectTotal = data.receivedObjectTotal;

        /**
         * Запустить задачу на периодическое обновление состояния.
         */
        this.startUpdateStateTask = function (updateState) {
            var me = this;
            var updateStateTask = function () {
                if(updateState){
                    me.sendGetInfoRequest(updateState); 
                }else{
                    clearTimeout(timerId);
                }
            }
            var timerId = setInterval(updateStateTask, UPDATE_PERIOD);
        }

        /**
         * Запрос на имземение состояния.
         */
        this.sendChangeModeRequest = (mode) => {
            this.mode = mode;
            var requestUrl = this.url + '/mode/' + mode;
            this.sendRequest(requestUrl);
        };

        /**
         * Запрос на получение/обновление информации.
         */
        this.sendGetInfoRequest = (setState) => {
            var update = (text) => {
                this.update(text);
                setState();
            };
            var requestUrl = this.url + '/status';
            this.sendRequest(requestUrl, update);
        };

        /**
         * Общий метод отправки запроса.
         */
        this.sendRequest = (requestUrl, callback) => {
            var XHR = window.XDomainRequest || window.XMLHttpRequest
            var xhr = new XHR();
            xhr.open('GET', requestUrl, true);
            xhr.onload = function () {
                console.log('Response text: ' + xhr.responseText);
                if (callback) {
                    callback(xhr.responseText);
                }
            }

            xhr.onerror = function () {
                console.error('Request ' + requestUrl + ' Error')
            }

            xhr.send();
        }

        /**
         * Обновить данные узла распределенной системы.
         */
        this.update = (text) => {
            var data = JSON.parse(text);
            this.taskActive = data.taskActive;
            this.mode = data.mode;
            this.thread = data.thread;
            this.waitObject = data.waitObject;
            this.countObject = data.countObject;
            this.sentObject = data.sentObject;
            this.lastStartMillis = data.lastStartMillis;
            this.receivedObject = data.receivedObject;
            this.lastSendMillis = data.lastSendMillis;
            this.lastReceiveMillis = data.lastReceiveMillis;
            this.countObjectTotal = data.countObjectTotal;
            this.receivedObjectTotal = data.receivedObjectTotal;
        }
    }
}

export default DistributedNodeInfo;