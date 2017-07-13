import {
    Component, Input, Output, AfterViewInit, EventEmitter, ElementRef,
    HostListener, ViewEncapsulation, OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';

@Component({
    providers: [DatePipe],
    selector: 'custom-datepicker',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalenderComponent implements AfterViewInit, OnChanges {
    datePickerDate: Date = new Date();
    formattedDate = '';
    showDatepicker = false;
    @Input() id: string;
    @Input() themeClass: string;
    @Input() value: Date;
    @Output() onValueChange: EventEmitter<Date> = new EventEmitter();


    @HostListener('document:mousedown', ['$event'])
    enter(event: Event) {
        this.onClickedOutside(event);
    }
    constructor(private datePipe: DatePipe, private _eref: ElementRef) { }

    close() {
        this.showDatepicker = false;
    }

    ngAfterViewInit() {


    }
    ngOnChanges(changes: SimpleChanges) {
        const data: SimpleChange = changes.value;
        if (!isNullOrUndefined(data) && data.currentValue) {
            this.datePickerDate = new Date(this.value);
            this.formattedDate = this.transformDate(this.datePickerDate);
        }else{
            this.formattedDate ='';
        }
    }

    onSelectionDone(event) {
        this.datePickerDate = event;
        this.formattedDate = this.transformDate(this.datePickerDate);
        this.onValueChange.emit(this.datePickerDate);
        this.close();
    }

    onClickedOutside(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.showDatepicker = false;
        }
    }
    open() {
        this.showDatepicker = true;
    }

    toggle() {
        this.showDatepicker = !this.showDatepicker;
    }

    private transformDate(date: Date): string {
        const formattedDate = new DatePipe('pt-PT').transform(date, 'MM.dd.yyyy');
        return formattedDate;
    }

}
