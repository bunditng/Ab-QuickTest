import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import * as jQuery from 'jquery';

// declare var jQuery;
declare var $;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    time = new Date();
    limit = {
        start: moment().format("YYYY-MM-DD")
    }
    constructor(public navCtrl: NavController) {

    }
    ionViewDidEnter() {
        this.getKeyHiracy();
    }
    public getKeyHiracy() {
        const nodeData = { "MD118161881": [{ "UPDATE": { "OB_NODE_MASTER": { "NODE_DISPLAY": "Ava", "NODE_NAME": "Ava", "ONBOARD_NO": "1940", "NODE_TYPE_NAME": null, "ORGANIZE_ID": "1562", "NODE_NO": "2140", "PARENT_NODE_NO": "", "NODELEVEL": "0", "KEY": { "ONBOARD_NO": "1940", "NODE_NO": "2140" } } } }, { "UPDATE": { "OB_NODE_MASTER": { "NODE_DISPLAY": "++MD", "NODE_NAME": "MD", "ONBOARD_NO": "1940", "NODE_TYPE_NAME": null, "ORGANIZE_ID": "1562", "NODE_NO": "NOD0000002160", "PARENT_NODE_NO": "2140", "NODELEVEL": "1", "KEY": { "ONBOARD_NO": "1940", "NODE_NO": "NOD0000002160" } } } }, { "UPDATE": { "OB_NODE_MASTER": { "NODE_DISPLAY": "++++Testing Senior Manager", "NODE_NAME": "Testing Senior Manager", "ONBOARD_NO": "1940", "NODE_TYPE_NAME": null, "ORGANIZE_ID": "1562", "NODE_NO": "NOD0000002161", "PARENT_NODE_NO": "NOD0000002160", "NODELEVEL": "2", "KEY": { "ONBOARD_NO": "1940", "NODE_NO": "NOD0000002161" } } } }, { "UPDATE": { "OB_NODE_MASTER": { "NODE_DISPLAY": "++++++Bla Bla", "NODE_NAME": "Bla Bla", "ONBOARD_NO": "1940", "NODE_TYPE_NAME": null, "ORGANIZE_ID": "1562", "NODE_NO": "NOD0000002220", "PARENT_NODE_NO": "NOD0000002161", "NODELEVEL": "3", "KEY": { "ONBOARD_NO": "1940", "NODE_NO": "NOD0000002220" } } } }] };

        let resultNodeData: NodeModel = new NodeModel;
        let nodeDatas = nodeData.MD118161881;


        const encapNode = (inList: any[]): NodeModel => {
            let getInCurMenu: NodeModel = new NodeModel;
            for (let i = 0; i < inList.length; i++) {
                let obj: EAFNodeMasterM = inList[i].UPDATE.OB_NODE_MASTER;
                if (!obj.PARENT_NODE_NO) {//First Node
                    getInCurMenu = NodeModel.mapNode(obj);
                } else if (obj.PARENT_NODE_NO && obj.PARENT_NODE_NO == getInCurMenu.nodeNo) {
                    getInCurMenu.nodes.push(NodeModel.mapNode(obj));
                } else {
                    if (i == inList.length - 1) {
                        getInCurMenu.nodes = encapNode2(getInCurMenu.nodes, obj, { NODELEVEL: 0 });
                    } else {
                        getInCurMenu.nodes = encapNode2(getInCurMenu.nodes, obj, inList[i + 1].UPDATE.OB_NODE_MASTER);
                    }
                }
            }
            return getInCurMenu;
            // let getInCurMenu: NodeModel = new NodeModel;
            // for (let i = 0; i < inList.length; i++) {
            //     let obj: EAFNodeMasterM = inList[i].UPDATE.OB_NODE_MASTER;
            //     if (obj.PARENT_NODE_NO == '') {
            //         getInCurMenu.nodeLevel = obj.NODELEVEL;
            //         getInCurMenu.nodeNo = obj.NODE_NO;
            //         getInCurMenu.onBoard = obj.ONBOARD_NO;
            //         getInCurMenu.text = obj.NODE_NAME;
            //     } else if (obj.PARENT_NODE_NO == getInCurMenu.nodeNo) {
            //         getInCurMenu.nodes.push(NodeModel.mapNode(obj));
            //         if (i == inList.length - 1) {
            //             getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME });
            //         } else if (parseInt(obj.NODELEVEL) < parseInt(inList[i + 1].UPDATE.OB_NODE_MASTER.NODELEVEL)) {
            //             getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME, nodes: [] });
            //         } else {
            //             getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME });
            //         }
            //     } else {
            //         if (i == inList.length - 1) {
            //             encapNode2(getInCurMenu.nodes, obj, { NODELEVEL: 0 });
            //         } else {
            //             encapNode2(getInCurMenu.nodes, obj, inList[i + 1].UPDATE.OB_NODE_MASTER);
            //         }
            //     }
            // }
            // return getInCurMenu;
        };

        const encapNode2 = (inNodes: NodeModel[], inObj: EAFNodeMasterM, nextInObj: EAFNodeMasterM | any): NodeModel[] => {
            let nodeList = (inNodes || []);
            nodeList.forEach(obj => {
                if (obj.nodeNo == inObj.PARENT_NODE_NO) {
                    obj.nodes.push(NodeModel.mapNode(inObj));
                } else {
                    obj.nodes = encapNode2(obj.nodes, inObj, nextInObj);
                }
            });
            return nodeList;
            // if (inNodes) {
            //     for (let i = 0; i < inNodes.length; i++) {
            //         let obj: NodeModel = inNodes[i];
            //         if (obj.nodeNo == inObj.PARENT_NODE_NO) {
            //             obj.nodes.push(NodeModel.mapNode(inObj));
            //             if (parseInt(inObj.NODELEVEL) < parseInt(nextInObj.NODELEVEL)) {
            //                 obj.nodes.push({ nodeNo: inObj.NODE_NO, nodeLevel: inObj.NODELEVEL, parentNo: inObj.PARENT_NODE_NO, onBoard: inObj.ONBOARD_NO, text: inObj.NODE_NAME, nodes: [] });
            //             } else {
            //                 obj.nodes.push({ nodeNo: inObj.NODE_NO, nodeLevel: inObj.NODELEVEL, parentNo: inObj.PARENT_NODE_NO, onBoard: inObj.ONBOARD_NO, text: inObj.NODE_NAME });
            //             }
            //         } else {
            //             encapNode2(obj.nodes, inObj, nextInObj);
            //         }
            //     }
            // }
        };



        /* function encapNode(inList) {
             let getInCurMenu = new NodeModel;
             for (let i = 0; i < inList.length; i++) {
                 var obj = inList[i].UPDATE.OB_NODE_MASTER;
                 if (obj.PARENT_NODE_NO == '') {
                     getInCurMenu.nodeNo = obj.NODE_NO;
                     getInCurMenu.text = obj.NODE_NAME;
                     getInCurMenu.nodeLevel = obj.NODELEVEL;
                     getInCurMenu.onBoard = obj.ONBOARD_NO;
                 } else if (obj.PARENT_NODE_NO == getInCurMenu.nodeNo) {
                     if (i == inList.length - 1) {
                         getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME });
                     } else if (parseInt(obj.NODELEVEL) < parseInt(inList[i + 1].UPDATE.OB_NODE_MASTER.NODELEVEL)) {
                         getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME, nodes: [] });
                     } else {
                         getInCurMenu.nodes.push({ nodeNo: obj.NODE_NO, nodeLevel: obj.NODELEVEL, parentNo: obj.PARENT_NODE_NO, onBoard: obj.ONBOARD_NO, text: obj.NODE_NAME });
                     }
                 } else {
                     if (i == inList.length - 1) {
                         encapNode2(getInCurMenu.nodes, obj, { NODELEVEL: 0 });
                     } else {
                         encapNode2(getInCurMenu.nodes, obj, inList[i + 1].UPDATE.OB_NODE_MASTER);
                     }
                 }
             }
             return getInCurMenu;
         }
 
         function encapNode2(inCurMenu, inObj, nextInObj) {
             let inNodes = inCurMenu;
             if (inNodes) {
                 for (let i = 0; i < inNodes.length; i++) {
                     var obj = inNodes[i];
                     if (obj.nodeNo == inObj.PARENT_NODE_NO) {
                         console.log(parseInt(inObj.NODELEVEL), parseInt(nextInObj.NODELEVEL))
                         if (parseInt(inObj.NODELEVEL) < parseInt(nextInObj.NODELEVEL)) {
                             obj.nodes.push({ nodeNo: inObj.NODE_NO, nodeLevel: inObj.NODELEVEL, parentNo: inObj.PARENT_NODE_NO, onBoard: inObj.ONBOARD_NO, text: inObj.NODE_NAME, nodes: [] });
                         } else {
                             obj.nodes.push({ nodeNo: inObj.NODE_NO, nodeLevel: inObj.NODELEVEL, parentNo: inObj.PARENT_NODE_NO, onBoard: inObj.ONBOARD_NO, text: inObj.NODE_NAME });
                         }
                     } else {
                         encapNode2(obj.nodes, inObj, nextInObj);
                     }
                 }
             }
         }
  */
        const outPut = encapNode(nodeDatas);
        console.log("encapNode :", outPut);

        $(document).ready(() => {
            let selfThis: any = this;
            let nodeElm: any = $("#nodeTreeView");
            console.log("nodeElm:", nodeElm);
            if (nodeElm) {
                nodeElm.treeview({
                    levels: 5,
                    data: [outPut]
                });
                nodeElm.on('nodeSelected', function (event, data, node) {
                    // Your logic goes here
                    selfThis.nodeSelected = data;
                });
            }
            jQuery.contextMenu({
                selector: '.context',
                callback: function (key, options) {
                    var m = "clicked: " + key;
                    console.log('callback key--->', key);
                    console.log('callback options--->', options);
                    // $('#tree').treeview('getNode', nodeId);
                    // let selectedNode = $('#treeview').select();
                    if (key == 'add') {
                        $.isUpdateNodeData = false;
                        try {
                            let checkNode = nodeElm.treeview('getNode', selfThis.nodeSelected.nodeId);
                            let checkParentNode = nodeElm.treeview('getParent', selfThis.nodeSelected);
                            console.log('ket add --->', checkNode);
                            console.log('ket add checkParentNode--->', checkParentNode);
                            $('#modal-title-popup').text('Add Detail');
                            $('#newbookmark-modal').modal('show');
                        } catch (error) {

                        }
                    } else if (key == 'edit') {
                        $.isUpdateNodeData = true;
                        try {
                            let checkNode = nodeElm.treeview('getNode', selfThis.nodeSelected.nodeId);
                            let checkParentNode = nodeElm.treeview('getParent', selfThis.nodeSelected);
                            console.log('ket add --->', checkNode);
                            console.log('ket add checkParentNode--->', checkParentNode);
                            $('#modal-title-popup').text('Edit Detail');
                            $('#newbookmark-modal').modal('show');
                        } catch (error) {

                        }
                    } else if (key == 'delete') {
                        try {
                            let checkNode = nodeElm.treeview('getNode', selfThis.nodeSelected.nodeId);
                            let checkParentNode = nodeElm.treeview('getParent', selfThis.nodeSelected);
                            console.log('ket add --->', checkNode);
                            console.log('ket add checkParentNode--->', checkParentNode);

                            $('#delete-org-modal').modal('show');
                        } catch (error) {
                        }
                    }
                },
                items: {
                    "add": { name: "Add", icon: "add" },
                    "edit": { name: "Edit", icon: "edit" },
                    "delete": { name: "Delete", icon: "delete" },
                    "sep1": "---------",
                    "quit": {
                        name: "Cancel", icon: function () {
                            return 'context-menu-icon context-menu-icon-quit';
                        }
                    }
                }
            });
        });
    }

    private click(): void {

    }
}

export class NodeModel {
    public nodeLevel?: string;
    public nodeNo: string;
    public nodes?: NodeModel[] = [];
    public onBoard: string;
    public parentNo: string;
    public text: string;
    public static mapNode(_obj: any): NodeModel {
        let returnValue: NodeModel = new NodeModel;
        returnValue.nodeLevel = _obj.NODELEVEL;
        returnValue.nodeNo = _obj.NODE_NO;
        returnValue.onBoard = _obj.ONBOARD_NO;
        returnValue.parentNo = _obj.PARENT_NODE_NO;
        returnValue.text = _obj.NODE_NAME;
        return returnValue;
    }
}

export class EAFNodeMasterM {
    public NODE_DISPLAY?: string;
    public NODE_NAME?: string;
    public NODE_NO?: string;
    public NODE_TYPE_NAME?: string;
    public NODELEVEL?: string;
    public ONBOARD_NO?: string;
    public ORGANIZE_ID?: string;
    public PARENT_NODE_NO?: string;
}