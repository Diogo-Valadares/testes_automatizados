class section{
    constructor(
        public authToken:string,
        public userID:number
    ){}  
}

export interface ISectionManager {
    activeSections: Array<section>;
    createSection(authToken: string, userID: number): boolean;
    getUser(authToken: string): number;
    destroySection(authToken: string): boolean;
  }

export class SectionManager implements ISectionManager{
    activeSections: Array<section> = [];

    createSection(authToken:string,userID:number):boolean{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken || s.userID == userID);
        if(index != -1){
            return false;
        }
        const newSection = new section(authToken,userID);
        this.activeSections.push(newSection);
        return true;
    }
    getUser(authToken:string):number{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken);
        if(index == -1){
            return -1;
        }
        return this.activeSections[index].userID;
    }
    destroySection(authToken:string):boolean{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken);
        if(index == -1){
            return false;
        }
        this.activeSections.splice(index);
        return true;
    }
};