import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowHeaderService {
  
   private headerFlagSubject = new BehaviorSubject(false); 
   public headerFlag : Observable<boolean>
   private psHeaderFlagSubject = new BehaviorSubject(true); 
   public psHeaderFlag : Observable<boolean>
   private corpHeaderFlagSubject = new BehaviorSubject(true); 
   public corpHeaderFlag : Observable<boolean>



    public get headerFlagValue(){
            return this.headerFlagSubject.value;
        } 
  
    public set headerFlagValue(val){
              this.headerFlagSubject.next(val) ;
          } 
       public get psHeaderFlagValue(){
                return this.psHeaderFlagSubject.value;
            } 
      
        public set psHeaderFlagValue(val){
                  this.psHeaderFlagSubject.next(val) ;
              } 
          public get corpHeaderFlagValue(){
                    return this.corpHeaderFlagSubject.value;
                } 
          
            public set corpHeaderFlagValue(val){
                      this.corpHeaderFlagSubject.next(val) ;
                  } 
      
  constructor() { 
    this.headerFlag =   this.headerFlagSubject.asObservable();
    this.psHeaderFlag =   this.psHeaderFlagSubject.asObservable();
    this.corpHeaderFlag =   this.corpHeaderFlagSubject.asObservable();
    
  }
  show()
  {
    return this.corpHeaderFlag ;
  }

}

