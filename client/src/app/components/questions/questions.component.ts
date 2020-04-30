import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { Question } from 'src/models/Question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  // question: string = '';
  questions: Question[];

  // form property binding
  questionString: string;
  questionlabel: string = '';

  constructor(private qService: QuestionsService) {
    this.qService.getQuestions().subscribe(questions => {
      // console.log(questions);
      this.questions = questions;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.questionString);

    var newQuestion: Question = {
      input: this.questionString,
      label: this.questionlabel
    }

    this.qService.addQuestion(newQuestion).subscribe(
      (question) => {
        this.questions.push(question);
        this.questionString = '';
        this.questionlabel = '';
      }
    );
  }

}
