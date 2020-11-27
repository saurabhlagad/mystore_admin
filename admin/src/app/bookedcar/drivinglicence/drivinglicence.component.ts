import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drivinglicence',
  templateUrl: './drivinglicence.component.html',
  styleUrls: ['./drivinglicence.component.css']
})
export class DrivinglicenceComponent implements OnInit {
  image=undefined
  constructor(private modal:NgbModal) { }


  ngOnInit(): void {
  }

  onOk(){
    this.modal.dismissAll('Ok')
  }
}
