/**
 * url-элементы API сервера.
 */
const DdApi = {
    /**
     * Корень API.
     */
    API_ROOT: 'rest/dd',
    /**
     * Список узлов системы.
     */
    LIST_NODES: '/rest/dd//list',
    /**
     *  Метод возвращающий состояния подсистем узла.
     */ 
    SUBSYSTEM_STATUSES: 'rest/dd/send/status',
    
    /**
     * Корень методов подсистемы.
     */
    NODE_API_ROOT: '/send',    
    /**
     * Метод запроса статуса
     */
    STATUS_METHOD: 'status'
};

export default DdApi;