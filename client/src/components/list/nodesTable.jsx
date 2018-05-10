/**
 * Представление узлов распределенной сети в виде таблицы
 */
import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import NodeMenuButton from './../buttons/nodeMenuButton.jsx';
import NodesDrawer from './../nodesDrawer.jsx';

import DistributedNode from './../../data/distributedNode';
import DistributedNodeInfo from './../../data/distributedNodeInfo';
import RequestWrapper from './../../data/requestWrapper';
import DdApi from './../../data/ddApi';
import {makeSelectable} from 'material-ui/List/makeSelectable';

/**
 * Адрес локального приложения.Используется при разработке.
 */
const LOCALHOST_URL = 'http://127.0.0.1:8082/dev/';

/**
 * Стили.
 */
const nameColumnStyle = {width: 40};
const subSystemColumnStyle = {width: 80};
const modeColumnStyle = {width: 80};
const threadColumnStyle = {width: 50};
const waitObjectColumnStyle = {width: 70};
const sentObjectColumnStyle = {width: 100};
const nodeMenuColumnStyle = {width: 40};

/**
 * Компонент, таблица узлов. Заполняется асинхронно по мере поступления ответов.
 */
class NodesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {},
            open: true
        };
        var location = window.location;
        var listUrl = location.origin + '/' + location.pathname.split('/')[1] + DdApi.LIST_NODES;
        // this.requestListOfServers(listUrl);
        this.requestKsedConfig();
    }

    /**
     * Добавить узел в коллекцию.
     * @param {*} node
     */
    addNode(node) {
        var id = 'node-' + Object.keys(this.state.nodes).length;
        this.state.nodes[id] = node;
        node.id = id;
        this.setState({nodes: this.state.nodes});
        var updateState = () => {
            this.setState({[node.id]: node});
        };
        node.startUpdateStateTask(updateState);
    }

    render() {
        return (<div>
            <Table selectable={true} multiSelectable={true} onRowSelection={this.handleRowSelect.bind(this)}>
                <TableHeader>
                    <TableRow className="nodesRow">
                        <TableHeaderColumn style={nameColumnStyle}>Узел</TableHeaderColumn>
                        <TableHeaderColumn style={subSystemColumnStyle}>Подсистема</TableHeaderColumn>
                        <TableHeaderColumn style={modeColumnStyle}>Состояние</TableHeaderColumn>
                        <TableHeaderColumn style={threadColumnStyle}>Поток</TableHeaderColumn>
                        <TableHeaderColumn style={waitObjectColumnStyle}>Передача активна</TableHeaderColumn>
                        <TableHeaderColumn style={sentObjectColumnStyle}>Предыдущий старт</TableHeaderColumn>
                        <TableHeaderColumn style={nodeMenuColumnStyle}></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows={true} deselectOnClickaway={false}>
                    {
                        Object.keys(this.state.nodes).map(function (key, index) {
                            var node = this.state.nodes[key];
                            return (
                                <TableRow key={index} selectable={true} className="nodesRow">
                                    <TableRowColumn style={nameColumnStyle}>{node.name}</TableRowColumn>
                                    <TableRowColumn style={subSystemColumnStyle}>{node.subSystem}</TableRowColumn>
                                    <TableRowColumn style={modeColumnStyle}>{node.mode}</TableRowColumn>
                                    <TableRowColumn style={threadColumnStyle}>{node.thread}</TableRowColumn>
                                    <TableRowColumn
                                        style={waitObjectColumnStyle}>{node.taskActiveLocalized}</TableRowColumn>
                                    <TableRowColumn
                                        style={sentObjectColumnStyle}>{node.lastStartMillis}</TableRowColumn>
                                    <TableRowColumn style={nodeMenuColumnStyle}>
                                        <NodeMenuButton changeMode={this.changeMode.bind(this)}
                                                        refreshNode={this.refreshNode.bind(this)}
                                                        ddNode={node}/>
                                    </TableRowColumn>
                                </TableRow>)
                        }.bind(this))
                    }
                </TableBody>
            </Table>
            <NodesDrawer ref='nodesDrawer' changeModeSelected={this.changeModeSelected.bind(this)}/>
        </div>);
    }

    /**
     * Обработка выбора строк таблицы.
     * @param {*} rows 'none', 'all' либо массив выбранных
     */
    handleRowSelect(rows) {
        if (rows != 'none' && rows.length > 1) {
            this.showNodesDrawerMenu();
        } else {
            this.hideNodesDrawerMenu();
        }
        this.markNodesSelection(rows);
    }

    /**
     * Установить значения выбран/невыбран для всех узлов.
     * @param {*} rows
     */
    markNodesSelection(rows) {
        if (rows == 'none' || rows.length == 0) {
            this.setSelectedToAll(false);
        } else if (rows == 'all') {
            this.setSelectedToAll(true);
        } else {
            var nodes = this.state.nodes;
            Object.keys(nodes).forEach(function (node, idx) {
                nodes[node].markAsSelected = rows.indexOf(idx) !== -1;
            });
        }
    }

    /**
     * Установить значение "выбран" для всех узлов
     * @param {*} selected
     */
    setSelectedToAll(selected) {
        var nodes = this.state.nodes;
        Object.keys(nodes).forEach(function (node) {
            nodes[node].markAsSelected = selected;
        });
    }

    /**
     * Отобразить главное меню управления узлами.
     */
    showNodesDrawerMenu() {
        this.refs.nodesDrawer.openDrawer();
    }

    /**
     * Скрыть главное меню управления узлами.
     */
    hideNodesDrawerMenu() {
        this.refs.nodesDrawer.hideDrawer();
    }

    /**
     * Запрос списка узлов.
     * @param {} listUrl - url для запроса
     */
    requestKsedConfig() {
        try {
            this.doRequestKsedConfig();
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Запрос списка узлов.
     * @param {} listUrl - url для запроса
     */
    requestListOfServers(listUrl) {
        try {
            this.doRequestListOfServers(listUrl);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Запрос статуса узла.
     * @param {} distributedNode - узел для запроса
     */
    requestStatus(distributedNode) {
        try {
            this.doRequestStatus(distributedNode);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Выполнить запрос списка узлов.
     * @param {} listUrl - url для запроса
     */
    doRequestKsedConfig() {
        var me = this;
        var XHR = window.XDomainRequest || window.XMLHttpRequest
        var xhr = new XHR();
        xhr.open('GET', '/api/ksed-config', true);
        xhr.onload = function () {
            console.log('Response text: ' + xhr.responseText);
            var ksedConfig = JSON.parse(xhr.responseText).ksedconfig;
            console.log(ksedConfig);
            var listUrl = ksedConfig.Addr + DdApi.LIST_NODES; 
            console.log("listUrl:" + listUrl);
            me.requestListOfServers(listUrl);
        }

        xhr.onerror = function () {
            console.error('Requeest ' + listUrl + ' Error')
        }

        xhr.send();
    }

    /**
     * Выполнить запрос списка узлов.
     * @param {} listUrl - url для запроса
     */
    doRequestListOfServers(listUrl) {
        var me = this;
        var XHR = window.XDomainRequest || window.XMLHttpRequest
        var xhr = new XHR();
        xhr.open('GET', listUrl, true);
        xhr.onload = function () {
            console.log('Response text: ' + xhr.responseText);
            var nodes = JSON.parse(xhr.responseText);

            //Добавление локального приложения. Если приложение открыто разработчиком.
            //Если нет - то в списке не отобразится.
            nodes.push({name: 'LOCAL', uri: LOCALHOST_URL});

            nodes.forEach(function (node) {
                node.uri = node.uri + DdApi.SUBSYSTEM_STATUSES;
                me.requestStatus(new DistributedNode(node));
            });
        }

        xhr.onerror = function () {
            console.error('Requeest ' + listUrl + ' Error')
        }

        xhr.send();
    }

    /**
     * Выполнить запрос статуса узла.
     * @param {} distributedNode - узел для запроса
     */
    doRequestStatus(distributedNode) {
        var me = this;
        var XHR = window.XDomainRequest || window.XMLHttpRequest
        var xhr = new XHR();
        xhr.open('GET', distributedNode.url, true);
        xhr.onload = function () {
            console.log('Response text: ' + xhr.responseText);
            var subSystems = JSON.parse(xhr.responseText);
            subSystems.forEach(function (element) {
                var data = element;
                data.distributedNode = distributedNode;
                data.subsystemUrl = distributedNode.url.replace('status', data.subSystem);
                me.addNode(new DistributedNodeInfo(data));
            });
        }

        xhr.onerror = function () {
            console.error('Requeest ' + distributedNode.url + ' Error')
        }

        xhr.send();
    }

    /**
     * Отправить запрос на изменение режима работы узла.
     * @param {*} mode
     */
    changeMode(mode, node) {
        node.sendChangeModeRequest(mode);
        this.setState({[node.id]: node});
    }

    /**
     * Отправить запрос на обновление данных.
     * @param {*} mode
     */
    refreshNode(node) {
        var setState = () => {
            this.setState({[node.id]: node});
        };
        node.sendGetInfoRequest(setState);

    }

    /**
     * Отправить запрос на изменение состояния для выбранных узлов.
     */
    changeModeSelected(mode) {
        var nodesTable = this;
        var nodes = this.state.nodes;
        Object.keys(nodes).forEach(function (id) {
            var node = nodes[id];
            if (node.markAsSelected) {
                node.sendChangeModeRequest(mode);
                nodesTable.setState({[nodes.id]: node});
            }
        });
    }
};

export default NodesTable;