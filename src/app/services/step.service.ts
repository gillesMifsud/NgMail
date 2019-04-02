import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    private stepSource = new BehaviorSubject(0);
    step = this.stepSource.asObservable();

    changeStep(step: number) {
        this.stepSource.next(step);
        console.log(step);
    }
}
