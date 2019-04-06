import { extendObservable } from 'mobx';
class storeName {
    constructor() {
        extendObservable(this, {
            data: [],
            totalPage:1,
            activePage:1,
        });
    }
    getData(page){

    }
    delRows(){

    }
    addData(){
      
    }
}
export default storeName;