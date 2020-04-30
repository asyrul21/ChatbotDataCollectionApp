import { Injectable } from '@angular/core';
// import { Headers } from '@angular/http';

import { HttpClient } from '@angular/common/http';

// import map
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from 'src/models/Question';


@Injectable()
export class QuestionsService {
    constructor(private http: HttpClient) {
        console.log('Questions service initialised...');
    }

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>('http://localhost:3000/api/questions');
    }

    addQuestion(question: Question): Observable<Question> {
        var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.post<Question>('http://localhost:3000/api/questions', question);
    }

}