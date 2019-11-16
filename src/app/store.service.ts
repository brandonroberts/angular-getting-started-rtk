import { Injectable } from '@angular/core';
import { store } from './shared/state';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Action } from 'redux';
import { Selector } from 'reselect';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state$ = new BehaviorSubject<any>(store.getState());
  state$ = this._state$.asObservable();
  
  private _actions$ = new Subject<Action>();
  actions$ = this._actions$.asObservable();

  constructor() {
    store.subscribe(() => this._state$.next(store.getState()));
  }

  select<In, Out>(selector: Selector<In, Out>) {
    return this.state$.pipe(
      map(() => selector(store.getState() as any)),
      distinctUntilChanged()
    );
  }

  next(action: Action) {
    this.dispatch(action);
  }

  dispatch(action: Action) {
    store.dispatch(action);
    this._actions$.next(action);
  }
}
