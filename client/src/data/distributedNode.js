/**
 * Узел распределенной системы.
 * @param {*} data 
 */
class DistributedNode {
    constructor(data) {
        this.name = data.name;
        this.url = data.uri;
    }
}

export default DistributedNode;