export class Section{
    constructor(
        public authToken:string,
        public userID:number
    ){}  
}

export interface ISectionManager {
    createSection(authToken: string, userID: number): Promise<void>;
    getUserID(authToken: string): Promise<number>;
    destroySection(authToken: string): Promise<string>;
  }

export class SectionManager implements ISectionManager{
    activeSections: (Array<Section>) = [];

    createSection(authToken:string,userID:number):Promise<void>{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken || s.userID == userID);
        if(index != -1){
            return Promise.reject('User already Logged in!');
        }
        const newSection = new Section(authToken,userID);
        this.activeSections.push(newSection);
        return Promise.resolve();
    }
    getUserID(authToken:string):Promise<number>{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken);
        if(index == -1){
            return Promise.reject("Log in in order to get data!");
        }
        return Promise.resolve(this.activeSections[index].userID);
    }
    destroySection(authToken:string):Promise<string>{
        let index = this.activeSections.findIndex(s=> s.authToken == authToken);
        if(index == -1){
            return Promise.reject("Already logged off, refresh the page.");
        }
        this.activeSections.splice(index);
        return Promise.resolve("Successfully signed off!");
    }
};